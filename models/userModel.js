const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First Name is Required',
        max: 128,
        trim: true 
    },
    surname: {
        type: String,
        required: 'Surename is required',
        max: 128,
        trim: true  
    },
    email: {
        type: String,
        requried: 'Email Address is required',
        trim: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: 'Password is required',
        bcrypt: true 
    },
    confirm_password: {
        type: String,
        required: 'Password is required',
        bcrypt: true 
    }
});

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Users', userSchema);