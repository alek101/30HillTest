//helper functions

const findPerson = (db,id) =>{
    return db.find(person=>person.id == id)
}

//from array of person ids returns full list of those peoples
const returnListOfPeople = (db,peopleList) => {
    return peopleList.map(person=>findPerson(db,person))
}

//model

const getPersonFriends = (db,id) => {
    //checking if id of person exist
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
        //out of list of person friends it creates list of friends of the friends
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriends.push(...friend.friends))
        //makes unique list so there are no duplicates
        uniqueListOfFriendsOfFriends=new Set(listOfFriendsOfFriends)
        //remove friends of the friends that are allready friends of the users
        for(personFriend of person.friends)
        {
            uniqueListOfFriendsOfFriends.delete(personFriend)
        }
        
        //remove user as friend of himself
        uniqueListOfFriendsOfFriends=[...uniqueListOfFriendsOfFriends].filter(friend=>friend!=id)
        
        return returnListOfPeople(db,uniqueListOfFriendsOfFriends)
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
        //out of list of person friends it creates list of friends of the friends
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriends.push(...friend.friends))
        //sort that array so all same value are next to each other
        listOfFriendsOfFriends.sort((a,b)=>a-b)
        let listOfSuggestedFriends = new Set();
        //idea is if two values are next to each other, there are two of them, and add it to unique set, if suggested friend isn't already friend of the user or user itself
        let arrayLength = listOfFriendsOfFriends.length;
        for (i=0; i<arrayLength-1; i++)
        {
            if(listOfFriendsOfFriends[i]==listOfFriendsOfFriends[i+1] && !person.friends.some(friend=>friend==listOfFriendsOfFriends[i]) && listOfFriendsOfFriends[i]!=id)
            {
                listOfSuggestedFriends.add(listOfFriendsOfFriends[i])
            }
        }
        return returnListOfPeople(db,[...listOfSuggestedFriends])
    }
    else {
        return "User doesn't exist";
    }
}

module.exports={
    getPersonFriends,
    getFriendsOfFriends,
    getSugestedFriends
}