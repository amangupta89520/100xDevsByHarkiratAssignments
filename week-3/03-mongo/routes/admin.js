const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const z = require('zod');
const { Admin, Course } = require('../db/index');

const UserSchema = z.object({
    username: z.string().trim().email(),
    password: z.string().trim().min(6)
});

const CourseSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    price: z.number().min(0),
    imageLink: z.string().url().trim(),
})

// Admin Routes
router.post('/signup', async (req, res, next) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try {
        const parsedData = UserSchema.parse({ username, password });
        const existingAdmin = Admin.findOne({ username: parsedData.username });
        if(existingAdmin) {
            throw new Error('Admin with this username already exists');
        }
        const adminUser = new Admin(parsedData);
        await adminUser.save();
        res.status(200).json({ message: 'Admin created successfully' });
    } catch(err) {
        err.customMessage = 'Unable to signup';
        next(err);
    }
});

router.post('/courses', adminMiddleware, async (req, res, next) => {
    // Implement course creation logic
    const courseData = req.body;
    try  {
        const parsedCourseData = CourseSchema.parse(courseData);
        const existingCourse = await Course.findOne({ title: parsedCourseData.title });
        if(existingCourse) {
            throw new Error('course with this title already exists');
        }
        const newCourse = new Course(parsedCourseData);
        const createdCourse = await newCourse.save();
        res.status(200).json({ message: 'Course created successfully', courseId: createdCourse._id });
    } catch(err) {
        err.customMessage = 'Unable to add a course';
        next(err);
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try  {
        const allCourses = await Course.find({});
        res.status(200).json({ courses: allCourses })
    } catch(err) {
        err.customMessage = 'Unable to fetch all courses';
        next(err);
    }
});

module.exports = router;