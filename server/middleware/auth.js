 
 const jwt =require("jsonwebtoken");
const User = require("../models/User");

 require("dotenv").config;
 


//  exports.auth =async (req, res,next)=>{
// try{

//     const token =req.cookie.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

//     if(!token){
//         return res.status(400).json({
//             sucess: false,
//             message :" token nhi mela "
//         })
//     }


//     try{
// const decode =   jwt.verify(token,process.env.JWT_SECRETE);
// console.log(decode);
// req.User =decode;
//     }catch(e){


//         return res.status(400).json({
//             sucess :false,
//             message :"invalid token"
//         })
//     }

//     next()

// }catch(e){


//     console.log(e);


// return res.status(400).json({

 
//     sucess :false,
//     message : "something  werong "+e
// })

// }
//  }




exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");

                        console.log(token);
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRETE);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}



 exports.isStudent =async (req,res,next)=>{
    try {

        if(req.User.accountType !==  "Student"){
            
        return res.status(400).json({    

            sucess :false,
            message :"this is protected route for student only "
        }) 
        
        }



        next()

    }catch(e){
        return res.status(400).json({
            sucess : false,

        })
    }
 }








 exports.isAdmin =async (req,res,next)=>{
    try {

        if(req.user.accountType !=  "Admin"){
            
        return res.status(400).json({    

            sucess :false,
            message :"this is protected route for Admin only "
        }) 
        
        }



        next()

    }catch(e){
        return res.status(400).json({
            sucess : false,
            message : "ad min detection problem" +e
        })
    }
 }













