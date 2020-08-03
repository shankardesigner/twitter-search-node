const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    searchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"SearcHistory"
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email} ).exec()
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return user;
    } catch (error) {
        return error;
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User