// Defines a User Schema that will be used to create a User model
// Contains the following fields: username, email, password
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Middleware that will run before a user is saved
// Encrypts the user's password
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// creates and exports a User model
const User = mongoose.model('User', UserSchema);
module.exports = User;