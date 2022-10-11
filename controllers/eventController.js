const { render }= require('../app');
const multer = require('multer');

exports.homePage = (req,res,next)=> {
    res.render('index', {title:'HomePage'});
}