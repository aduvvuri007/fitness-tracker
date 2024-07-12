require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes);
app.use('/api/workout', workoutRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })