const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const z = require('zod');
const { User, Course } = require('../db/index');
const jwt = require('jsonwebtoken');

const userSchema = z.object({
    username: z.string({
        required_error: 'Username must be provied',
        invalid_type_error: 'Username must be a string'
    }).email({
        message: 'Username must be a valid email'
    }).trim().toLowerCase(),
    password: z.string({
        required_error: 'Password must be provided',
        invalid_type_error: 'Password must be a string'
    }).min(6, {
        message: 'Password must be atleast 6+ chars long'
    })
});

// User Routes
router.post('/signup', async (req, res, next) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const parsedUserData = userSchema.parse({ username, password });
        const existingUser = await User.findOne({ username: parsedUserData.username });
        if(existingUser) {
            throw new Error(`User with username: ${username} already exists`);
        }
        await new User(parsedUserData).save();
        res.status(200).json({ message: 'User created successfully' });
    } catch(err) {
        err.statusCode = 401;
        err.customMessage = 'Unable to signup the user';
        next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try {
        const parsedUserData = userSchema.parse({ username, password });
        const existingUser = await User.findOne({ username: parsedUserData.username });
        if(!existingUser) {
            throw new Error(`No account for username: ${username} exists.`);
        }
        const token = await jwt.sign({ username: existingUser.username }, process.env.JWT_SECRET, {
            expiresIn: '600000'
        });
        res.status(200).json({ token });
    } catch(err) {
        err.statusCode = 401;
        err.customMessage = 'Unable to signin the user';
        next(err);
    }
});

router.get('/courses', async (req, res, next) => {
    // Implement listing all courses logic
    try {
        const allCourses = await Course.find({});
        res.status(200).json({ courses: allCourses });
    } catch(err) {
        err.statusCode = 400;
        err.customMessage = 'Unable to get all the courses (User)';
        next(err);
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { courseId } = req.params;
    try {
        
    } catch(err) {
        err.statusCode = 400;
        err.customMessage = 'Unable to purchase the course by User';
        next(err);
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router