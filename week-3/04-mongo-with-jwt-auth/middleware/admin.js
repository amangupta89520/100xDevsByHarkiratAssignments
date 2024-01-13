const jwt = require('jsonwebtoken');
const { Admin } = require('../db/index');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const existingUser = await Admin.findOne({ username: payload.username });
        if(!existingUser) {
            throw new Error('User does not exists');
        }
        req.user = existingUser;
        next();
    } catch(err) {
        err.statusCode = 401;
        err.customMessage = 'Admin middleware check failed';
        next(err);
    }
}

module.exports = adminMiddleware;