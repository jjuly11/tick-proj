var express = require('express');
var router = express.Router();
const { route }= require('../app');
var controller= require('../controllers/eventController');
const userController= require('../controllers/userController');


/* GET home page. */
router.get('/', controller.filteredHomePage);

// Login 
router.get('/login', userController.login);
router.post('/login', userController.loginPost);
router.get('/sign-up', userController.signup);
router.post('/sign-up', 
    userController.signUpPost,
    userController.loginPost
);
router.get('/logout', userController.logout);

// Admin Section Routes
router.get('/admin', controller.adminSection);
router.get('/add_event', controller.addEventGet);
router.post('/add_event', 
controller.upload,
controller.pushToCloudinary,
controller.addEventPost 
);

router.get('/all', controller.allEvents);
router.get('/all/:event', controller.singleEventGet);


module.exports = router;
