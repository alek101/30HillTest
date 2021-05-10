const fs = require('fs');
const path = 'db/data social graph.json';

//separate

//helper
const findPerson = (db,id) =>{
    return db.find(person=>person.id == id)
}

const returnListOfPeople = (db,peopleList) => {
    return peopleList.map(person=>findPerson(db,person))
}

//model
const getPersonFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        return returnListOfPeople(db,person.friends)  
    }
    else {
        return "User doesn't exist";
    }
}

const getFriendsOfFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        let listOfPersonFriends = returnListOfPeople(db,person.friends) 
        let listOfFriendsOfFriends = [];
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriends.push(...friend.friends))
        uniqueListOfFriendsOfFriends=new Set(listOfFriendsOfFriends)
        for(personFriend of person.friends)
        {
            uniqueListOfFriendsOfFriends.delete(personFriend)
        }
        return returnListOfPeople(db,[...uniqueListOfFriendsOfFriends])
    }
    else {
        return "User doesn't exist";
    }
}

const getSugestedFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        let listOfPersonFriends = returnListOfPeople(db,person.friends) 
        let listOfFriendsOfFriends = [];
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriends.push(...friend.friends))
        console.log(listOfFriendsOfFriends)
        return returnListOfPeople(db,[...listOfFriendsOfFriends])
    }
    else {
        return "User doesn't exist";
    }
}

//Keep
const directFriends = (req,res) => {

    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(getPersonFriends(db,id)); 
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
            res.send(getFriendsOfFriends(db,id)); 
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
            res.send(getSugestedFriends(db,id)); 
        }
    })
}


module.exports={
    directFriends,
    friendsOfFriends,
    suggestedFriends
}