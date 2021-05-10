const Model = require('../model/Model');
const ControlFunction = require('./ControlFunction');

//controller
const directFriends = (req,res) => {
    ControlFunction.controlFunction(req,res,Model.getPersonFriends)
}

const friendsOfFriends = (req,res) => {
    ControlFunction.controlFunction(req,res,Model.getFriendsOfFriends)
}

const suggestedFriends = (req,res) => {
    ControlFunction.controlFunction(req,res,Model.getSugestedFriends)
}

module.exports={
    directFriends,
    friendsOfFriends,
    suggestedFriends
}