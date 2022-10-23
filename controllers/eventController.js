const { render }= require('../app');
const multer = require('multer');
const Event = require('../models/eventModel');
// const cloudinary = require('./cloudinary_config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRETS
});


// Images Upload with cloudinary
const storage = multer.diskStorage({});
const upload = multer({storage});
exports.upload= upload.single('image');

exports.pushToCloudinary = async (req,res,next) => {
     
    try{
        if(req.file){
            
            await cloudinary.uploader.upload(req.file.path)
            .then((result) => {
                console.log(result);    
                req.body.image= result.public_id;
                // res.send(req.body.image);
                next();
            }).catch(() => {
                req.flash('error', 'Sorry there was a problem uploading your image, please try again');
                res.redirect('/admin/add');
            });
            
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
    
}

exports.filteredHomePage = async (req,res,next)=> {
    // res.send(process.env.DB);
    try{
        const allEvents = await Event.find({ avalablity: {$eq:true} });
        res.render('index', {title:'HomePage'});
    }catch(error){
        next(error);
    }
}
// Admin Section Begins here
exports.adminSection = (req,res,next) => {
    try{
        res.render('admin_section', {title: 'Admin Section'});
    }
    catch(error){
        next(error);
    }
    
}

exports.addEventGet= async (req,res,next) => {
    try{
        res.render('add_event', {title: 'Fill Out Form to create Event'});

    }catch(error){
        next(error);
    }
}

exports.addEventPost= async (req,res,next) => {
    try{
        console.log("Enter Add Event");
        const event = new Event(req.body);
        await event.save();
        req.flash('success', `Event ${event.event_name} created successfully`);
        res.redirect('/');
    }catch(error){
        next(error);
    }
}