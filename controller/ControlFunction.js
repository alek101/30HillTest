const fs = require('fs');
const path = 'db/data social graph.json';

const controlFunction = (req,res,lamda) => {
    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.send(err);
        }
        else
        {
            let db = JSON.parse(data)
            res.send(lamda(db,id)); 
        }
    })
}

module.exports={
    controlFunction
}