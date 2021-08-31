// I Friends

directFriends = await User.find({id: id}).lean().friends;

// II Friends of friends

directFriends = await User.find({id}).lean().friends;

// we want person that have direct firends in his friend list
// but that person couldn't be one of direct friends, or the begin person
friendsOfFriends = await User.distinct(id, {
    friends: { $in: directFriends },
    id: { $nin: directFriends },
    id: { $ne: id }
})

// III Suggested firends

directFriends = await User.find({id}).lean().friends;

suggestFriends = await User.aggregate([
    { 
        $match: {
            friends: { $in: directFriends },
            id: { $nin: directFriends },
            id: { $ne: id }
        }
    },
    {
        $group: { 
            _id: '$id',
            numberOfJoinFriends: { $size: { $setIntersection: [ directFriends, '$friends' ]}}
        }
    },
    {
        $match: { numberOfJoinFriends: { $gte: 2 } }
    }
])