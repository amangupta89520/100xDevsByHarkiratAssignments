const z = require('zod');
const { User } = require('../db/index');

const UserSchemaValidation = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userData = req.headers;
    try {
        const parsedUserData = UserSchemaValidation.parse(userData);
        const exisitngUser = await User.findOne({ username: parsedUserData.username, password: parsedUserData.password });
        if(!exisitngUser) {
            throw new Error('User with the provided username & password does not exists');
        }
        req.user = exisitngUser;
        next();
    } catch(err) {
        err.customMessage = 'User Middleware verification check failed';
        next(err);
    }
}

module.exports = userMiddleware;