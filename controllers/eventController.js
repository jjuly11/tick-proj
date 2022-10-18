const { render }= require('../app');
const multer = require('multer');

exports.homePage = (req,res,next)=> {
    // res.send(process.env.DB);
    res.render('index', {title:'HomePage'});
}