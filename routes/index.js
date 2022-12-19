var express = require('express');
var router = express.Router();
const { route }= require('../app');
var controller= require('../controllers/eventController');
const userController= require('../controllers/userController');


/* GET home page. */
router.get('/', controller.filteredHomePage);

// Login 
router.get('/login', userController.login);
router.get('/sign-up', userController.signup);
router.post('/sing-up', userController.signUpPost);

// Admin Section Routes
router.get('/admin', controller.adminSection);
router.get('/add_event', controller.addEventGet);
router.post('/add_event', 
controller.upload,
controller.pushToCloudinary,
controller.addEventPost 
);

router.get('/all', controller.allEvents);


module.exports = router;
