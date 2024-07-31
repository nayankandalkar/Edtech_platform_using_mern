const Course= require("../models/course");
const cloudinary123 =require("cloudinary").v2;
const category =require("../models/category");


const User =require ("../models/User");

const {uploadImageToCloudinary} =require("../utils/imageUploader");
const section = require("../models/section");
const subSection = require("../models/subSection");
const courseProgrss = require("../models/courseProgrss");
const { convertSecondsToDuration } = require("../../src/utils/secToDuration");

require("dotenv").config();



cloudinary123.config({
    timeout : 8000,
})

async function uploadFileToCloud(file,folder,quality){
    const options= {folder}
    options.resource_type ="auto"
    options.quality=quality
 return await cloudinary123.uploader.upload(file.tempFilePath  , options);
}



exports.createCourse =async (req,res)=>{

    try{
        

        const {courseName, courseDescription ,whatYouWillLearn,price ,
            tag,
            Category,
            status,
            instructions} =req.body;
        const file12 =    req.files.image;

         const thumbnailImage =await uploadFileToCloud(file12,"IMAGES");
            
         console.log(thumbnailImage)

 if(!courseName || ! courseDescription || !whatYouWillLearn || !price 
     ){
 return res.status(400).json({
    sucess : false,
    message : "all field are mandatiory",
    courseName, courseDescription,whatYouWillLearn,price,tag,thumbNail, Category,

 })
 }

 if (!status || status === undefined) {
    status = "Draft"
  }

  const userId =   req.user.id;
  
// //  //const userId= req.id;
 
  console.log("\n\n\n my use id is "+userId);
  const instructorDetail =await  User.findById({_id:userId});
// console.log(" instrucor details "+instructorDetail);

 if(!instructorDetail )
{
    res.status(400).json({
        sucess : false,
        message : "instructor details not found"
    })
}

 const categoryDetail= await category.findById(Category);

if(!categoryDetail){
  return  res.status(400).json({
        sucess : false ,
        message : "category  details not found "
    })

}

// // const thumbnailImage =await uploadFileToCloud(thumbNail,"IMAGES");

 
// const newCourse =await Course.create({
//     courseName,
//     courseDescription,
//     instructor :instructorDetail._id,
//     whatYouWillLearn,
//     price,
//     thumbNail:thumbnailImage.url,
//     tag : tag,
//     category :categoryDetail._id,
//     instructions
    
// })


 
const newCourse =await Course.create({
    courseName,
    courseDescription,
    instructor :instructorDetail._id,
    whatYouWillLearn,
    price,
    category :categoryDetail._id,
    instructions,
    thumbNail: thumbnailImage.secure_url,
   tag
    
})



await User.findByIdAndUpdate({_id:instructorDetail._id},{
    
        $push :{
            courses: newCourse._id,
        }
},{new :true})

 await category.findByIdAndUpdate({_id :Category},
    {
        $push : {
            courses :newCourse._id,
        }
    },{new :true})

return res.status(200).json({
    sucess : true,
    message : "course created sucessfully",
    data:newCourse
    
});

         
    }
    catch(e){

        console.error(e)
        console.log ("error has been occourred ",e)

         res.status(500).json({
            sucess : false,
            message : "something went wrong " ,e,
              
         })
    }
}



exports.showAllCourses =async (req,res)=>{
    try{


       const allCourses =await Course.find({},{
        courseName :true,
        price : true,
        thumbNail :true,
        instructor :true,
        ratingAndReview : true,
        studentEnrolled :true
       }).populate("instructor").exec();

       return res.status(200).json({
        sucess :true ,
        message :" you will get all courses data",
        allCourses
       })
        
    }catch (e){
   
        res.status (500).json({
            sucess : false,
            message : e

        })

        console.log(e);
    }
}



exports.getcoursedetails =async (req,res)=>{
    try{

        const {courseId}=req.body;
       //  const courseDetails =await Course.find( courseId) 

        const courseDetails = await Course.find( courseId)
            .populate(
                {
                    path:"instructions",
                    populate:{
                        path:"additionalDetail",
                    },
                }
            )
            .populate("category")
            //.populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                // populate:{
                //     path:"subSection",
                // },
            })
            .exec();


            console.log(courseDetails);

if(! courseDetails){
      res.status(400).json({
        sucess : false ,
        message : `could not find the course with courseid  ${courseId}`
    }) 
}


res.status(200).json({
    sucess : true ,
    message : "course details  iojiofiojcio ",
    data : courseDetails
})

    }catch (e){
       console.log(e)
    
        res.status(500).json({
            sucess : false ,
            message :`something went wrong ${e}`
        })
    }
}


exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};






exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbNail = thumbnailImage.secure_url
      }
  
    //   // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
       await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("category")
     //  .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  

 




exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  



  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)


      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
    //   // Delete sections and sub-sections
       const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section12 = await section.findById(sectionId)
        if (section12) {
          const subSections12 = section12.subSection
          for (const subSectionId of subSections12) {
            await subSection.findByIdAndDelete(subSectionId)
          }
        }
  
    //     // Delete the section
         await section.findByIdAndDelete(sectionId)
       }
  
      // Delete the course
  await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }






  

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
     // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await courseProgrss.findOne({
      courseId: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })
    

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}




exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
      //.populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}