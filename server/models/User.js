
const mongoose=require("mongoose");

const userschema= mongoose.Schema({

    firstName:
    {
        type :String,
          required :true,
          trim :true
    },
    lastName: {
        type :String,
        required :true,
        trim :true
    },
    email : {
        type :String,
        required :true,
        trim :true
    },
    password : {
        type :String,
        required :true,
        
    },
    accountType : {
       type :String,
       enum : ["Admin", "Student" ,"Instructor"]
    },

    active :{
        type :Boolean,
        default : true
    },

    approved : {
        type : Boolean,
        default : true
    },

    additionalDetail :{
         type :mongoose.Schema.Types.ObjectId,
         required :true,
         ref: "Profile",
    },
    courses :[

        {

            type :mongoose.Schema.Types.ObjectId,
            ref : "Course",
        }
    ],
  token : {
    type :String,
    required : true
  },

    image : {
        type : String,
        required : true
    },

    courseProgress : [
     {
    type :mongoose.Schema.Types.ObjectId,
    ref :"courseProgress"
}
    ],




    contactNumber : {
        type :Number,

    },

    confirmPassword : {
        type :String
    },
    token:{
    type :String
    },
   resetPasswordToken : {
    type : Date,
   }

},
{ timestamps: true });


module.exports =mongoose.model("User",userschema);