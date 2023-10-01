const Passport= require("passport");
const User= require("../models/userModel");
const URLSearchParams= require('url-search-params');
const Event= require('../models/eventModel');
const Order = require('../models/order');

const { check, validationResult } = require('express-validator');
const {sanitize} = require('express-validator/filter');
// const { findByIdAndUpdate } = 
const compression = require('compression');
const { json } = require("body-parser");

// Login Section

exports.login= async (req, res,next ) => {
    try{
        res.render('login', {title: 'Login'});
    }catch(err){
        next(err);
    }
}
exports.loginPost= Passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'You are now logged in',
    failureRedirect: '/login',
    failureFlash: 'Login Failed, Try Again'
});
// Didn't Work
// exports.loginPost= (req,res) => {
//     Passport.authenticate('local')(req,res, function () {
//     User.find( {email: req.body.username}, 
//         function (err,docs) {
//             if(err){
//                 console.log('Username not found');
//             }else{
//                 console.log('User Found');
//                 req.flash('info','user found');
//             }
//         } );
// });
// }

// Signup Section
exports.signup= async (req,res,next) => {
    try{
        console.log('Rendering Page...');
        res.render('signup', {title: 'Sign-Up'});
    }catch(err){
        next(err);
    }
}
exports.signUpPost = [
    check('first_name').isLength({min: 1}).withMessage('First Name Must Be Specified')
    .isAlphanumeric().withMessage('First Name must be alphanumeric'),
    check('surname').isLength({ min:1 }).withMessage('Last Name Must be Specified')
    .isAlphanumeric().withMessage('Last Name Must be Alphanumeric'),
    check('email').isEmail().withMessage('Invalid Email'),
    check('password').isLength({min:8}).withMessage('Password Must Be 8 characters long'),
    check('confirm_password').custom((value, {req}) => value === req.body.password ).withMessage('Password Does not match'),
    sanitize('*').trim().escape(),

    (req, res, next) => {
        console.log('Enter SignupPost Function/method');
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log('Error Occured');
            res.render('signup', {title: 'Please Fix the following errors', errors: errors.array()});
            return;
        }else{
            // No Errors
            console.log('Registering User, No errors');
            const newUser= new User(req.body);
            User.register(newUser, req.body.password, function(error){
                if(error){
                    console.log('error while registering', error);
                    return next(error);
                }
                next();
            });

        }
    }
]
exports.logout= (req,res,next) => {
    req.logout(function(err){
        if(err){
            next(err);
        }
    });
    req.flash('info', 'You Have been Logout');
    res.redirect('/');
} 
exports.bookingConfirmation = async (req,res,next) => {
    try{
        const data = req.params.data;
        
        const parsedData = new URLSearchParams(data);
        
        const event = await Event.find({_id: parsedData.get('id') });
        // res.json(json(parsedData));
        res.render('confirmation', {title: 'Confirm your Purchase', event, parsedData}); 
    }catch(err){
        next(err);
    }
}
exports.orderPlaced= async (req,res,next) => {
    try{
        const data= req.params.data;
        const parsedData= new URLSearchParams(data);
        var myquery = { _id: parsedData.get('id') };
        var newValue = { $set: {} }
        console.log(parsedData);
        // const order = new Order({
        //     user_id: req.user._id,
        //     event_id: parsedData.get('id'),
        //     order_details: {
        //         amount: parsedData.get('amount'),
        //         cost: parsedData.get('ticket_cost'),
        //         type: parsedData.get('type_of_ticket')
        //     }
        // });
        // console.log(order);
        // await order.save();
        // req.flash('info', 'Thank you for placing a order');
        // res.redirect('/my-account');
    }catch(err){
        next(err);
    }
}

exports.myAccount= async (req,res,next) => {
    try{
        const orders = await Order.aggregate([
            { $match: {user_id: req.user.id} },
            { $lookup: {
                from: 'events',
                localField: 'event_id',
                foreignField: '_id',
                as: 'event_data'
            } }
        ]);
        res.render('my_account', {title: 'My Account', orders});
    }catch(err){
        next(err);
    }
}