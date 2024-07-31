
 const RatingAndReview =require("../models/ratingAndreview");
const  Course =require("../models/course");
const { default: mongoose } = require("mongoose");
const course = require("../models/course");
const ratingAndreview = require("../models/ratingAndreview");
const User = require("../models/User");

exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId});

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
    
        
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }


        //create rating and review

console.log("i am review ", review )


        const ratingReview = await RatingAndReview.create({
                                        rating:rating,
                                        review:review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        // const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
        //                             {
        //                                 $push: {
        //                                     ratingAndReviews: ratingReview._id,
        //                                 }
        //                             },
        //                             {new: true});
        // console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
           // ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}





exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])


            console.log(result, courseId)

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}





exports.getAllRating = async (req, res) => {
    try{
             const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                     .populate({
                                         path:"user" ,
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                     .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}



// exports.getAverageRating =async (req, res)=>{
//     try{

//         const cousrseId=req.body.courseId;


//         const result =await ratingAndReview.aggregate([
//             {
//                 $match : {
//                     course : new mongoose.Types.ObjectId(cousrseId)
//                 }
//             }
//         ,
//         {
//             $group : {
//                 _id:null,
//             averageRating :{$avg :"$rating"}
//             }
//         }
    
//     ]);




//     if(result.length >0){
//        return res.status(200).json({
//             sucess :true,
//             message : "rating has been found sucessfully",
//            averageRating : result[0]
//         })
//     }

//     return res.status(200).json({
//         sucess :true,
//         message : " no rating give till now ",
//        averageRating :0
//     })



//     }catch(e){

//         console.log(e);

//         res.status(500).json({
//             sucess : false ,
//             message : "something went wrong "
//         })
//     }
// } 



// exports.getAllRatings =async (req,res)=>{
//     try{


//         const allReview =await ratingAndReview.find({})
//         .sort({rating :"desc"})
//         .populate({

//             path :"user",
//             select : "firstName  lastName  email  image"
//         }).populate({
//             path : "course",
//             select :"CourseName"
//         }).exec();



//         return res.status(200).json({
//             sucess: true ,
//             message :" All Reviewed Saved Sucessfully",
//             data :allReview
//         })

//     }catch(e){
//         console.log(e);
//         return res.status(500).json({
//             sucess : false,
//             message :" something went wrong  \n \n \n " + e
//         })
//     }
// }



