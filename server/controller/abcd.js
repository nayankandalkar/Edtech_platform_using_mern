

//const User=require("../models/User");

exports.abcd1 =async(req,res)=>{

    try{
       const {name,tags, email}=req.body;
        console.log(name,tags,email);

        res.status(200).json({
            sucess: true,
            message :  "ok true"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : e.message
        })
    }
}