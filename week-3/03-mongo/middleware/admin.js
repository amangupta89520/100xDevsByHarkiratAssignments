const z = require('zod');
const { Admin } = require('../db/index');

const UserValidationSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    try {
        const parsedData = UserValidationSchema.parse({ username, password });
        const adminUser = await Admin.findOne({ username: parsedData.username, password: parsedData.password });
        if(!adminUser) {
            throw new Error('no admin account with the provided details exists');
        }
        next();
    } catch(err) {
        err.customMessage = 'Admin middleware verification check failed';
        next(err);
    }
}

module.exports = adminMiddleware;