const fs = require('fs');
const path = 'db/data social graph.json';

const findPerson = (db,id) =>{
    return db.find(person=>person.id == id)
}

const listOfPersonFriends = (db,id) => {
    let person = findPerson(db,id);
    if(person){
        let findPersonFriends = person.friends
        return findPersonFriends.map(friendId=>findPerson(db,friendId))   
    }
    else {
        return "User doesn't exist";
    }
}

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


module.exports={
    directFriends
}