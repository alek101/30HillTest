const express = require('express');
const socialController = require('./controller/SocialController')

const app=express();

app.listen(3000);

app.get('/',(req, res) => {
    res.send('!')
});

//Routes
app.get('/directFriends/:id', socialController.directFriends);
app.get('/friendsOfFriends/:id', socialController.friendsOfFriends);
app.get('/suggestedFriends/:id', socialController.suggestedFriends);