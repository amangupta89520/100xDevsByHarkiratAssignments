const mongoose = require('mongoose');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        reqiured: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        reqiured: true,
        min: 0
    },
    imageLink: {
        type: String
    },
    published: {
        type: Boolean,
        required: true,
        default: true,
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [CourseSchema]
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}