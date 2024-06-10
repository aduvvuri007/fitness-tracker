const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});