const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must have at least 6 characters'],
        select: false // Do not return password by default
    },
    role: {
        type: Number,
        default: 0, // 0 for regular user, 1 for admin
    },
}, { timestamps: true });

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Return if password is not modified
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1h', // JWT expiration time
    });
};

// Check if the model already exists, to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
