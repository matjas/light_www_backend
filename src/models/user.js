const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error('Password connot contain "password"');
            }
        }

    }
}, {
    timestamps: true
})

userSchema.statics.findByCredentials = async (name, password) => {
    const user = await User.findOne({name: name})

    if (!user) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User