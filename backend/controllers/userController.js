const User = require('../models/userModel')

// login a user
const loginUser = async (req, res) => {
    res.json({ mssg: 'login user' })
}

// signup a user
const registerUser = async (req, res) => {
    res.json({ mssg: 'signup user' })
}

module.exports = { loginUser, registerUser }