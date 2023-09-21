const { render }= require('../app');
const multer = require('multer');
const Event = require('../models/eventModel');
// Testing Model
const Test = require('../models/eventModel_2');
// const cloudinary = require('./cloudinary_config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
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
            }).catch((err) => {
                // console.log(err);
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
        // if(req.isAuthenticated()){
        //     res.send('Already Logged in');
        // }else{
        //     res.send('User Not Logged in');
        // }
        const allEvents = await Event.find({ avalablity: {$eq:true} });
        res.render('index', {title:'HomePage', allEvents});
        // req.flash('info');
    }catch(error){
        next(error);
    }
}

exports.aboutGet = (req,res,next) => {
    try{
        res.render('about', {title: 'About Us'});
    }catch(error){
        next(error);
    }
}

exports.contactGet = (req,res,next) => {
    try{
        res.render('contact', {title: 'Contact Us'});
    }catch(err){
        next(err);
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
        // console.log(req.body);
        const tickets =[];
        let ticket;
        for(let n = 0 ; n<=(req.body.ticket_type.length-1) ; n++){
            // let type= req.body.ticket_type[n]);
            ticket= {
                ticket_type: req.body.ticket_type[n],
                ticket_cost: req.body.ticket_cost[n],
                ticket_amount: req.body.ticket_amount[n],
                available: true 
            }
            tickets.push(ticket);
        }
        const event = new Event({
            event_name: req.body.event_name,
            event_host: req.body.event_host, 
            event_description: req.body.event_description,
            age_restricted: req.body.age_restricted,
            venue_name: req.body.venue_name,
            venue_address: req.body.venue_address,
            event_start: req.body.event_start,
            event_start_time:req.body.event_start_time,
            country: req.body.country,
            public: req.body.public,
            image: req.body.image,
            tickets: tickets
        })


        console.log(event);
        // const event = new Event(req.body);
        await event.save();
        req.flash('success', `Event ${event.event_name} created successfully`);
        res.redirect('/');
    }catch(error){
        next(error);
    }
}

exports.allEvents= async (req,res,next) => {
    try{
        const events= await Event.find({ availability: {$eq: true}});
        // res.json(events);
        res.render('all_events', {title: 'All Available Events', events});
    }catch(err){
        next(err);
    }
}

exports.singleEventGet= async(req,res,next) => {
    try{
        const eventParam= req.params.event;
        const eventData= await Event.find({_id: eventParam});
        // return;
        res.render('single', {title: eventData.event_name, eventData});
    }catch(err){
        next(err);
    }
}
exports.searchResults = async (req,res,next) => {
    try{
        const searchQuery = req.body;
        // const vara= 'tes';
        // res.send(req.body);
        const searchData = await Event.aggregate([
            { $match: { $text: {$search: `\"${searchQuery.event_name}\"`} } },
            { $match: {availability: true} }

        ]);
        // res.json(searchData);
        res.render('search_results', {title: 'Results', searchQuery, searchData});
    }
    catch(err){
        next(err);
    }
}


// Testing 

exports.event_test = async (req,res,next) => {
    try{
        // const test= new Test({
        //     event_name: "my event",
        //     event_host: 'My Host',
        //     event_description: 'All it needs to be',
        //     age_restricted: false,
        //     venue_name: 'Right Here',
        //     event_start: new Date,
        //     event_end: new Date,
        //     tickets:[
        //         {
        //             ticket_type: 'main',
        //             ticket_cost: 5000,
        //             ticket_amount: 200,
        //             available: true 
        //         },
        //         {
        //             ticket_type: 'vip',
        //             ticket_cost: 0,
        //             ticket_amount: 0,
        //             available: false
        //         }
        //     ]
        // });
        // await test.save();
        const result= await Test.find();
        res.render('test_page', {title: "Test Page", result});
    }catch(err){
        next(err);
    }
}