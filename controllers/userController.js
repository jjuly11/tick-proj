const Passport= require("passport");
const User= require("../models/userModel");
const URLSearchParams= require('url-search-params');
const Event= require('../models/eventModel');

// const { check, validationResult } = require('express-validator/check');

// Login Section

exports.login= async (req, res,next ) => {
    try{
        res.render('login', {title: 'Login'});
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