const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const userModel = new mongoose.Schema({
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
    isAdmin : {
        type: Boolean,
        default: false 
    }

});

userSchema.index({
    userName: 'text',
    age: 'number'
});

module.exports = mogoose.model('Users', userModel);