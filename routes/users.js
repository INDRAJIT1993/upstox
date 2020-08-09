var express = require('express');
var router = express.Router();
var controller=require('./../controller/read')

/* GET users listing. */
router.get('/fetch',controller.Fetch);

module.exports = router;
