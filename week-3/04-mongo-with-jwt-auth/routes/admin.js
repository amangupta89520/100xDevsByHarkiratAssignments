const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const z = require('zod');
const jwt = require('jsonwebtoken');

const { Admin, Course } = require('../db/index');

const AdminUserSchema = z.object({
    username: z.string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
    }).email({
        message: 'Username should be a valid email'
    }).trim().toLowerCase(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
    }).min(6, {
        message: 'password must be atleast 6 characters long'
    }).trim()
});

const courseSchema = z.object({
    title: z.string({
        required_error: "course title is required",
        invalid_type_error: "course title must be a string",
    }).min(4, {
        message: 'Course title must be atleast 4+ chars long'
    }).trim().toLowerCase(),
    description: z.string({
        required_error: "course description is required",
        invalid_type_error: "course description must be a string",
    }).min(10, {
        message: 'Course description must be atleast 10+ chars long'
    }).trim(),
    price: z.number({
        required_error: "course price is required",
        invalid_type_error: "course price must be a number",
    }).min(0, {
        message: 'Course price must be greater than 0$'
    }),
    imageLink: z.string({
        required_error: "Image for course is required",
        invalid_type_error: "Image url must be a string",
    }).url({
        message: 'Image url must be a valid url'
    }).trim(),
})

// Admin Routes
router.post('/signup', async (req, res, next) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try {
        const parsedAdminUserData = AdminUserSchema.parse({ username, password });
        const existingAdminUser = await Admin.findOne({ username: username, password: password });
        if(existingAdminUser) {
            throw new Error(`User with username: ${username} already exists.`);
        }
        await new Admin(parsedAdminUserData).save();
        res.status(200).json({ message: 'Admin created successfully' });
    } catch(err) {
        err.customMessage = 'Unable to signup the admin user';
        err.statusCode = 403;
        next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try  {
        AdminUserSchema.parse({ username, password });

        const existingAdminUser = await Admin.findOne({ username: username, password: password });

        if(!existingAdminUser) {
            throw new Error(`User with username: ${username} does not exists.`)
        }

        const token = await jwt.sign({ username: existingAdminUser.username }, process.env.JWT_SECRET, {
            expiresIn: '600000'
        });

        return res.status(200).json({ token });

    } catch(err) {
        err.statusCode = 401;
        err.customMessage = 'Unable to sign in the admin'
        next(err);
    }
});

router.post('/courses', adminMiddleware, async (req, res, next) => {
    // Implement course creation logic
    const courseData = req.body;
    try  {
        const parsedCourseData = courseSchema.parse(courseData);
        const existingCourse = await Course.findOne({ title: parsedCourseData.title });
        if(existingCourse) {
            throw new Error(`Course with title: ${existingCourse.title} already exists.`);
        }
        const newCourse = await new Course(parsedCourseData).save();
        res.status(200).json({ message: 'Course Created Successfully', courseId: newCourse._id });
    } catch(err) {
        err.statusCode = 403;
        err.customMessage = 'Unable to add the course (Admin)';
        next(err);
    }
});

router.get('/courses', adminMiddleware, async (req, res, next) => {
    // Implement fetching all courses logic
    try {
        const allCourses = await Course.find({});
        res.status(200).json({ courses: allCourses });
    } catch(err) {
        err.statusCode(403);
        err.customMessage = 'Unable to get all the courses (Admin)';
        next(err);
    }
});

module.exports = router;