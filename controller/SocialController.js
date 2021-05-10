const fs = require('fs');
const Model = require('../model/Model');
const path = 'db/data social graph.json';

const directFriends = (req,res) => {

    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(Model.getPersonFriends(db,id)); 
        }
    })
}

const friendsOfFriends = (req,res) => {

    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(Model.getFriendsOfFriends(db,id)); 
        }
    })
}

const suggestedFriends = (req,res) => {

    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(Model.getSugestedFriends(db,id)); 
        }
    })
}


module.exports={
    directFriends,
    friendsOfFriends,
    suggestedFriends
}