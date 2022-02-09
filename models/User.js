const { Schema, model } = require('mongoose');
const { hashPassword, comparePassword } = require('../services/util');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 1 },
    hashedPassword: { type: String, required: true, minlength: 1 },
})

userSchema.methods.comparePassword = async function() {
    return await comparePassword(password, this.hashedPassword);
}

const User = model('User', userSchema);

module.exports = {
    User,
}