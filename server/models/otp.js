const mongoose=require("mongoose");
const mailSender = require("../utils/nodemailer");
const otpSchem=new mongoose.Schema ({
    email :{
        type : String,
    },
    otp : {
        type :String,
    },
    createdAt : {
       type :Date,
       default :Date.now(),
       expires :  60*5
    }
})

async function sendVerificationEmail(email, otp){
    try{

        const mailResponse =await mailSender(email ,"verification email from studynotion", otp);
        console.log("mail send sucessFully" +mailResponse);

    }catch(e){
        console.log("error in sending mail" +e)
    }
}


otpSchem.pre("save" ,async function(next){


    // if (this.isNew) {
	// 	await sendVerificationEmail(this.email, this.otp);
	// }

    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports =mongoose.model("OTP",otpSchem);