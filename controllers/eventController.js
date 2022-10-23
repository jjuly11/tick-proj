const { render }= require('../app');
const multer = require('multer');
const Event = require('../models/eventModel');
const cloudinary = require('./cloudinary_config');

// Images Upload with cloudinary
const storage = multer.diskStorage({});
const upload = multer({storage});
exports.upload= upload.single('image');

exports.pushToCloudinary= async (req,res,next) =>{
    try{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            .then((result)=>{
                req.body.image= result.public_id;
                next();
            });
        }
    }catch(error){
        next(error);
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
        const event = new Event(req.body);
        await event.save();
        req.flash('success', `Event ${event.event_name} created successfully`);
        res.redirect('/');
    }catch(error){
        next(error);
    }
}