const profile =require("../models/profile");
 
const {uploadImageToCloudinary}=require("../utils/imageUploader")
const User =require("../models/User");
const { convertSecondsToDuration } = require("../../src/utils/secToDuration");
const courseProgrss = require("../models/courseProgrss");
const course = require("../models/course");



exports.updateprofile =async (req,res)=>{
    try {
        // const 


        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        const userid=req.user.id;

          
        if(!contactNumber || !gender || !userid){
            return res.status(400).json({
                sucess : false ,
                message : "please enter the  all detail"
            })
        }


        const userDetails =await User.findById({_id:userid});

          const profileId =userDetails.additionalDetail;
          const profileDetails = await profile.findById(profileId);

          profileDetails.dateOfBirth =dateOfBirth;

          profileDetails.about =about;
          profileDetails.gender =gender;
        
          profileDetails.contactNumber =contactNumber;
          await profileDetails.save();

         res.status(200).json({
            sucess :  true,
            message : "profile is updated sucessfully",
              userid,
              userDetails
         })


    }catch (e){

        console.log(e);
        res.status(500).json({
            sucess : false,
            message : "something went wrong" +e
        })
    }
}


exports.deleteAccount =async (req,res)=>{
    try {

        const id =req.user.id;

        const userDetails= await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                sucess :false,
                message :"user detail nwas not found "
            })
        }

        await profile.findByIdAndDelete({_id :userDetails.additionalDetail});

        await User.findByIdAndDelete({_id :id});

        res.status(200).json(
        {
            sucess : true,
            message :"user has been deleted sucessfully "
        }
        )

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess : false,
            message : "something went wrong "
        })
    }
}


exports.getAllUserDetails =async (req,res)=>{
    try{

        const id =req.user.id;

      const userDetails =await User.findById(id).populate("additionalDetail").exec();

      res.status(200).json({
        sucess : true,
        message : "all user data given below ",
        userDetails

      })

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess :false,
            message : "something went wrong "+e
        })
    }
}






exports.updateDisplayPicture = async (req, res) => {
    try {


       const displayPicture = req.files.displayPicture
       const userId = req.user.id
      const image = await uploadImageToCloudinary(
         displayPicture,
         process.env.FOLDER_NAME,
        1000,
         1000
       )
    //   console.log(image)
    //   const updatedProfile = await User.findByIdAndUpdate(
    //     { _id: userId },
    //     { image: image.secure_url },
    //     { new: true }
    //   )
      res.send({
        success: true,
        message: `Image Updated successfully`,
         
      })
    } catch (error) {
        console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};



// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };






exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()




	  userDetails = userDetails.toObject()
	   var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {



		 let totalDurationInSeconds = 0
		 SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {




		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		   ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		   userDetails.courses[i].totalDuration = convertSecondsToDuration(
		 	totalDurationInSeconds
		   )


      
        


		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await courseProgrss.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier



		}




	  }



  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }



	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }




exports.instructorDashboard =async (req, res)=>{
        try{
           const courseDetails = await course.find({
            instructor:req.user.id
           }) 
           
           const courseData= courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price
          
            const courseDataWithStats ={
              _id : course._id,
              courseName : course.courseName,
              courseDescription : course.courseDescription,
              totalStudentsEnrolled,
              totalAmountGenerated
            }

            return courseDataWithStats
          })


          res.status(200).json({
            "sucess" : true,
            course: courseData
          })

        }catch(e){
               console.log(e);
               res.status(500).json({
                "sucess" : false,
                "message" : "Internal server error"
               })
        }
  }

  