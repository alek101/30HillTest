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
        listOfPersonFriends.forEach(friend=>listOfFriendsOfFriends.push(...friend.friends))
        listOfFriendsOfFriends.sort((a,b)=>a-b)
        let listOfSuggestedFriends = new Set();
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