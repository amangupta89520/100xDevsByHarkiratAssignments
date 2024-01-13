const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const mongoose = require('mongoose');

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/week-3-assignments';

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, (err) => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.log('Ahh an error occurred', err.message);
});

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

//Global catch all middlware
app.use((err, req, res, next) => {
    console.log('Ahh! an error occured: ', err.message);
    res.status(400).json({ ERROR: { issues: err.issues || err.message, customMessage: err.customMessage} });
})

