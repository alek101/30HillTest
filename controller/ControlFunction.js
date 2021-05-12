const fs = require('fs');
const path = 'db/data social graph.json';

//function to read json file database and apply function from model
const controlFunction = (req,res,lamda) => {
    const id=req.params.id;

    fs.readFile(path,(err, data)=>{
        if(err){
            res.status(501).send(err);
        }
        else
        {
            let db = JSON.parse(data);
            let result=lamda(db,id);
            if(result == "User doesn't exist")
            {
                res.status(204).send(JSON.stringify(result));
            }
            else
            {
                res.send(JSON.stringify(result));   
            }
            
        }
    })
}

module.exports={
    controlFunction
}