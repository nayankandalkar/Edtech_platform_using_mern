
const User= require("../models/User");
const OTP=require("../models/otp");
const otpGenerator = require("otp-generator");
const profile = require("../models/profile");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const mailSender = require("../utils/nodemailer")

require("dotenv").config();


exports.sendOTP =async(req, res)=>{


    try{
    const {email} =req.body;
    const checkUserpresent =await User.findOne({email});

    if(checkUserpresent){
        return res.status(400).json({
            sucess:false,
            message : "user alreadly register"
        })
    }


    var otp =otpGenerator.generate(6, {
        upperCaseAlphabets :false,
        lowerCaseAlphabets : false,
        specialChars : false
    })

    console.log("otp generated ");
    console.log(otp);

    const result = await  OTP.findOne({otp :otp});


    while(result){
        otp =otpGenerator(6, {
            upperCaseAlphabets :false,
            lowerCaseAlphabets : false,
            specialChars : false
        })
         result = await  OTP.findOne({otp :otp});
    }

    const  otpPaylod ={email,otp};

    const otpBody= await OTP.create(otpPaylod);
    console.log(otpBody);

    res.status(200).json({
        sucess :true,
        message : "otp send sucessfully"
    })

}catch(e){
    console.log(e);
}
}


exports.signUp =async (req,res)=>{

try{

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;



    console.log(firstName, lastName,email,password, confirmPassword, accountType, otp);

    // if( !firstName || !lastName || !email || !password || !confirmPassword   || !contactNumber || !otp ){
    //     res.status(400).json({
    //         status : false,
    //         message : "please add the data "
    //     })
    // }


    if(password !== confirmPassword){
        return res.status(400).json({
            status :"false",
            message :"password and onfirmed password does not match"
        })

    }

        const existinguser=await User.findOne({email});

        if(existinguser){
            res.status(400).json({
                sucess :false,
                message: "the user exist in database"
            })
        }

        const recentOtp= await OTP.find({email}).sort({createdAt : -1}).limit(1);
        console.log("recent otp is " +    recentOtp);

        if(recentOtp.length == 0){
         return   res.status(400).json({
                sucess :false,
                message : "otp is not valid "
            })
        }else if( otp != recentOtp[0].otp){
         return   res.status(400).json({
                sucess :false,
                message :"otp does not match"
              })
        }

        const profieDetail= await profile.create({
            gender :null,
            dateOfBirth :null,
            about :null,
            contactNumber :null
        })

        const hashPassWord =await bcrypt.hash(password,10);

        const user= await User.create({
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            password: hashPassWord,
            accountType,
            additionalDetail : profieDetail,
            image :`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        res.status(200).json({
            sucess :true,
            message : "user is register sucessfully",
            user
        })
    }catch(e){
        console.log(e);

    }

    


}



exports.login =async(req, res)=>{
    try{

        const {email, password} =req.body;

        if( !email || !password){
            return res.status(400).json({
                sucess : false,
                message :"please enter the detail"
            })
        }

        const user= await User.findOne({email}).populate("additionalDetail");
        if( !user){
            return res.status(400).json({
                sucess : false,
                message : "user is not register , please signup first"
            })
        }

        console.log(password + "\n");
        console.log(user.password);

        const check = await bcrypt.compare(password ,user.password);

        console.log(check)
        if(await bcrypt.compare(password ,user.password)){

            const payload= {
                email :user.email,
                id :user._id,
                accountType :user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRETE,{
                expiresIn: "24h"
            });

            user.token =token;
            user.password = undefined;
            const options={
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly :true
            }


            res.cookie("token", token, options).status(200).json({
                sucess :true,
                token,
                user,
                message:"user logged in sucessfully"
            })




            // res.status(200).json({
            //     status : true,
            //     message : "login sucessfull"  
            // })

        }else{
            res.status(400).json({
                sucess : false,
                message :"password does not match "
            })
        }

       
    }catch(e){
        console.log("error has been occourred");
        console.log(e);

        res.status(500).json({
            status : false,
            message : "some thing went wrong" +e 
        })
    }
}


exports.changepassword =async (req, res)=>{
  //  const {}=res.body;

   
  


}











 
