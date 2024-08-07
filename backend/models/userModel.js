const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
});

// static register method
userSchema.statics.register = async function (username, email, password) {

    // validation
    if (!username || !email || !password) {
        throw Error('All fields are required');
    }

    const usernameExists = await this.findOne({ username });
    const emailExists = await this.findOne({ email });

    if (usernameExists) {
        throw Error('Username already in use');
    }

    if (emailExists) {
        throw Error('Email already in use');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;

}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect email or password');
    }

    return user;
}


const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;