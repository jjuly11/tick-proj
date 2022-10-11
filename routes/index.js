var express = require('express');
var router = express.Router();
const { route }= require('../app');
var controller= require('../controllers/eventController');


/* GET home page. */
router.get('/', controller.homePage);


module.exports = router;
