var express = require('express');
var router = express.Router();
const { route }= require('../app');
var controller= require('../controllers/eventController');


/* GET home page. */
router.get('/', controller.filteredHomePage);

// Admon Section Routes
router.get('/admin', controller.adminSection);
router.get('/add_event', controller.addEventGet);
router.post('/add_event', 
controller.upload,
controller.pushToCloudinary,
controller.addEventPost 
);


module.exports = router;
