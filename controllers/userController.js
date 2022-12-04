const Passport= require("passport");
const User= require("../models/userModel");
const URLSearchParams= require('url-search-params');
const Event= require('../models/eventModel');

const { check, validationResult } = require('express-validator/check');
const {santize, sanitize} = require('express-validator/filter');
// const { findByIdAndUpdate } = 
const compression = require('compression');

// Login Section

exports.login= async (req, res,next ) => {
    try{
        res.render('login', {title: 'Login'});
    }catch(err){
        next(err);
    }
}
exports.loginPost= async (req,res,next) => {
    try{

    }catch(err){
        next(err);
    }
}

// Signup Section
exports.signup= async (req,res,next) => {
    try{
        res.render('signup', {title: 'Sign-Up'});
    }catch(err){
        next(err);
    }
}
exports.siginUpPost = [
    check('first_name').isLength({min: 1}).withMessage('First Name Must Be Specified')
    .isAlphanumeric().withMessage('First Name must be alphanumeric'),
    
    check('surname').isLength({ min:1 }).withMessage('Last Name Must be Specified')
    .isAlphanumeric().withMessage('Last Name Must be Alphanumeric'),
    
    check('email').isEmail().withMessage('Invalid Email'),

    check('password').isLength({min:8}).withMessage('Password Must Be 8 characters long'),

    check('confirm_password').custom((value, {req}) => value === req.body.password ).withMessage('Password Does not match'),

    sanitize('*').trim().escape(),

    (req, res, next) => {
        
    }
]