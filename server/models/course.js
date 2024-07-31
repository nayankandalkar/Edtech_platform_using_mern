
const mongoose =require("mongoose");
const courseSchema= new mongoose.Schema({
    courseName : {
        type : String,
    },
    courseDescription : {
        type : String,
    },
    instructor : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true
    },
    whatYouWillLearn : {
        type :String,
    },
    courseContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :"section"
    }],
    ratingAndReview : [
       { type :mongoose.Schema.Types.ObjectId,
        ref :"ratingAndReview"
       }
    ],
    price : {
        type :String,
    },
    thumbNail : {
        type :String,
        
    },
    tag : {
        type :[String],
        
    },
    category : {
        type :mongoose.Schema.Types.ObjectId,
        ref :"Category"
    },
    studentEnrolled :[ {

        type :mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    instructions : {
        type : [String]
    },
    status : {
        type : String,
        enum : ["Draft","Published"]
    }
    ,
    
    createdAt :{
    type :Date,
      default :Date.now()
    }
})

module.exports =mongoose.model("Course", courseSchema);