const express = require('express');
const socialController = require('../controller/SocialController')
const router = express.Router();

//Routes
router.get('/directFriends/:id', socialController.directFriends);
router.get('/friendsOfFriends/:id', socialController.friendsOfFriends);
router.get('/suggestedFriends/:id', socialController.suggestedFriends);

module.exports=router;