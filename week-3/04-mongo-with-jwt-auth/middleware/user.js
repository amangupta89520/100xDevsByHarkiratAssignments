const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    try {
        if(!token) {
            throw new Error('User JWT token must be provided');
        }
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const existingUser = await User.findOne({ username: payload.username });
        if(!existingUser) {
            throw new Error('Account in the JWT does not exists');
        }
        req.user = existingUser;
        next();
    } catch(err) {
        err.statusCode = 401;
        err.customMessage = 'User middleware check failed.';
        next(err);
    }
}

module.exports = userMiddleware;