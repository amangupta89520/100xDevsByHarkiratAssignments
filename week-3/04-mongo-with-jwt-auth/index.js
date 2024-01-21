require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/week-3-assignments2').then(() => {
    console.log('successfully connected to db')
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    err.customMessage = 'Unable to connect to mongodb';
    err.statusCode = 500;
    console.log({ issues: err.message, customMessage: err.customMessage, statusCode: err.statusCode });
})
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

//global error handling middleware for all routes
app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).json({ 'ERROR': err.issues || {
        statusCode: err.statusCode,
        customMessage: err.customMessage,
        messsage: err.message
    } });
});
