const fs = require('fs');
const path = 'db/data social graph.json';

//separate
const findPerson = (db,id) =>{
    return db.find(person=>person.id == id)
}

const returnListOfPeople = (db,peopleList) => {
    return peopleList.map(person=>findPerson(db,person))
}

//
const listOfPersonFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        return returnListOfPeople(db,person.friends)  
    }
    else {
        return "User doesn't exist";
    }
}

const listOfFriendsOfFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        let listOfPersonFriends = returnListOfPeople(db,person.friends) 
        let listOfFriendsOfFriend = [];
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriend.push(...friend.friends))
        uniqueListOfFriendsOfFriend=new Set(listOfFriendsOfFriend)
        for(personFriend of person.friends)
        {
            uniqueListOfFriendsOfFriend.delete(personFriend)
        }
        return returnListOfPeople(db,[...uniqueListOfFriendsOfFriend])
    }
    else {
        return "User doesn't exist";
    }
}

//
const directFriends = (req,res) => {

    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(listOfPersonFriends(db,id)); 
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
            res.send(listOfFriendsOfFriends(db,id)); 
        }
    })
}


module.exports={
    directFriends,
    friendsOfFriends
}