// I Friends

directFriends = await User.find({id: id}).lean().friends;

// II Friends of friends

directFriends = await User.find({id}).lean().friends;

// we want person that have direct firends in his friend list
// but that person couldn't be one of direct friends, or the begin person

friendsOfFriends = await User.distinct(id, {
    $and: [
    {friends: { $in: directFriends }},
    {id: { $nin: directFriends }},
    {id: { $ne: id }}
    ],
})

// III Suggested firends

directFriends = await User.find({id}).lean().friends;

// first we find all friends of friends
// than we get distinct one by group as well as we are counting how many join friends they have with begginging person
// and we are filtering results to have 2 by another match

suggestFriends = await User.aggregate([
    { 
        $match: {
            $and: [
            {friends: { $in: directFriends }},
            {id: { $nin: directFriends }},
            {id: { $ne: id }}
            ] 
        }      
    },
    {
        $project: { 
            id: 1, friends: 1, numberOfJoinFriends: { $size: { $setIntersection: [ directFriends, '$friends' ]}}
        }
    },
    {
        $match: { numberOfJoinFriends: { $gte: 2 } }
    },
    {
        $project: {
            id: 1
        }
    }  
])