const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const z = require('zod');
const { User, Course } = require('../db/index');
const { default: mongoose } = require("mongoose");

const UserSchema = z.object({
	username: z.string().trim().email(),
	password: z.string().trim().min(6)
})

// User Routes
router.post('/signup', async (req, res, next) => {
    // Implement user signup logic
		const userData = req.body;
    try {
			const parsedUserData = UserSchema.parse(userData);
			const existingUser = await User.findOne({ username: parsedUserData.username });
			if(existingUser) {
				console.log('existing user', existingUser)
				throw new Error('User with this username already exists');
			}
			const newUser = new User(parsedUserData);
			await newUser.save();
			res.status(200).json({ message: 'User created successfully' });
    } catch(err) {
			err.customMessage = 'Unable to sign up the user';
			next(err);
    }
 });

router.get('/courses', async (req, res, next) => {
    // Implement listing all courses logic
		try  {
			const allCourses = await Course.find({});
			res.status(200).json({ courses: allCourses });
		} catch(err) {
			err.customMesage = 'Unable to fetch all the courses';
			next(err);
		}
});

router.post('/courses/:courseId', userMiddleware, async (req, res, next) => {
    // Implement course purchase logic
		const { courseId } = req.params;
		try  {
			if(!mongoose.isValidObjectId(courseId)) {
				throw new Error('Invalid Course ID provided')
			}
			const existingCourse = req.user.purchasedCourses.find(course => course._id.toString() === courseId);
			if(existingCourse) {
				throw new Error('Course is already purchased by the user');
			}
			const courseToPurchase = await Course.findOne({ _id: courseId });
			if(!courseToPurchase) {
				throw new Error('Course with the provided ID does not exists');
			}
			req.user.purchasedCourses.push(courseToPurchase);
			await req.user.save();
			res.status(200).json({ message: 'Course purchased successfully' });
		} catch(err) {
			err.customMessage = `Unable to purchase the course - ${courseId} by user - ${req.user._id}`;
			next(err);
		}
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
		res.status(200).json({ purchasedCourses: req.user.purchasedCourses })
});

module.exports = router