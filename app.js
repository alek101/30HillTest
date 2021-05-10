const express = require('express');
const fs = require('fs');
const path = 'db/data social graph.json';
const socialController = require('./controller/SocialController')


const app=express();

app.listen(3000);

app.get('/',(req, res) => {

    res.send('!')

});

app.get('/directFriends/:id', socialController.directFriends);
app.get('/friendsOfFriends/:id', socialController.friendsOfFriends);