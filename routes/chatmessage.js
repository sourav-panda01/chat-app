const path = require('path');

const express = require('express');

const chatmessageController = require('../controllers/chatmessage');
const authenticator=require('../middleware/authenticator') 
const router = express.Router();


router.get('/getmessage',authenticator.authenticator, chatmessageController.getchat);

router.post('/postmessage',authenticator.authenticator,chatmessageController.postchat);

router.get('/logout',chatmessageController.logout);

module.exports = router;