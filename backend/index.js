const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});