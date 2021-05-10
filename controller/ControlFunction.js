const fs = require('fs');
const path = 'db/data social graph.json';

//function to read json file database and apply function from model
const controlFunction = (req,res,lamda) => {
    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(JSON.stringify(lamda(db,id))); 
        }
    })
}

module.exports={
    controlFunction
}