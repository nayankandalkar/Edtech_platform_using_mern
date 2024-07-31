const User =require("../models/User");
const mailSender =require("../utils/nodemailer");
const bcrypt =require("bcrypt");

const crypto =require("crypto");


exports.resetPasswordToken =async (req,res)=>{
  
  try{

  
   // const url = `http://localhost:3000/update-password/${token}`;
    const email=req.body.email;

    const user= await User.findOne({email});
    if(!user){
        return res.status(400).json({
            sucess :false,
            message : "user does not exist "
        })
    }

    const token =crypto.randomUUID();
    const updatedDetail= await User.findOneAndUpdate({email:email},{
                          token: token,
                        resetPasswordToken : Date.now() +5*60*60
    },
    {new : true}
    )


    const url2 = `http:localhost:3000/update-password/${token}`;
    await mailSender(email ,"password reset link" ,url2)


    

    return res.status(200).json({
        sucess :true,
        message : "email send sucessfully",
        updatedDetail
    })

}catch(e){
  return  res.status(500).json({
        sucess : false,
        message : "something went wrong " + e
    })
}










}






exports.resetPassword =async (req,res)=>{



    try{

    

    const {password ,confirmedPassword,token} =req.body;

    if(password !== confirmedPassword){
        return res.json({
            sucess :false,
            message : "Password not matching"
        })
    }



    const userDetail=await User.findOne({token:token});
    if(! userDetail){
        return res.json({
            sucess :false,
            message : "invalid token"
        })

    }

    if(userDetail.resetPasswordToken > Date.now()){

         return res.status(400).json({
            sucess :false,
            message : "token expirevvhhfgtgtgfhgf"
        })
    }

const hashpassword =await bcrypt.hash(password,10);

   const updateduser  =  await User.findOneAndUpdate({token :token}, 
    {
        password : hashpassword
    },
   { new  : true  })


    return res.status(200).json({
        sucess : true,
        message : "password change sucessfully",
        updateduser
    })
}catch(e){
 
 console.log(e);

 
    return res.status(500).json({
        sucess :false,
        message : "something went wrong" +e
    })

}

}