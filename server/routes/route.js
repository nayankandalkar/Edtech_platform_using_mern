const express= require("express");
const { signUp, sendOTP, login } = require("../controller/auth");
const { updateprofile, updateDisplayPicture, getAllUserDetails, deleteAccount, getEnrolledCourses, instructorDashboard } = require("../controller/profile");
const { auth, isAdmin } = require("../middleware/auth");
const { resetPasswordToken, resetPassword } = require("../controller/resetPassword");
const { createCategory, showAllcategory, categoryPageDetails3 } = require("../controller/category");
const { createCourse, getcoursedetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails, getCourseDetails } = require("../controller/course");
const { createSection, updatedSection, deletesection } = require("../controller/section");
const { createsubsection, updateSubSection } = require("../controller/subsection");
const { any } = require("../controller/any");
const { deleteSubSection } = require("../controller/subsection");
const { capturePayment, verifyPayments, enrollStudentsAdmin } = require("../controller/payment");
const { updateCourseprogress } = require("../controller/CourseProgress");
const { createRating, getAverageRating, getAllRating } = require("../controller/ratingandreview");
 

const router=express.Router();


router.get("/",(req,res)=>{
    res.send("i am dummy i am nothin g to use       ha 5696guy ")
    console.log("i am dumy")
})


router.post("/sign", signUp)

router.post("/otp",sendOTP)
 

router.post("/login",login);

router.put("/update",auth,updateprofile)


router.put("/picture",auth,updateDisplayPicture);


router.get("/userdata",auth,getAllUserDetails);


router.post("/resetToken",resetPasswordToken);

router.post("/resetPassword",resetPassword);

router.post("/createCtegory",auth,isAdmin,createCategory)

router.post("/createCourse",auth,createCourse);


router.post("/createSection", auth,createSection)

router.get("/getCourse",getcoursedetails);


router.post("/addnewsubsection",createsubsection)

router.delete("/delete",auth,deleteAccount);


router.post("/updatesection",updatedSection);
 router.delete("/deletesection", deletesection)

 router.post("/anyCreateCourseWorakble",auth,any);

 
 router.get("/showAllcategory", showAllcategory);

 router.post("/createCategory",createCategory);
 
 router.post("/reset",resetPasswordToken)

 router.post("/resetyourpassword",resetPassword);


 router.get("/getEnrolledCourses",auth,getEnrolledCourses);

 router.get("/showAllCategories", showAllcategory);

 router.post("/deleteSubSection", deleteSubSection);

 router.post("/updateSubsection",updateSubSection)

 router.post("/editCourse", editCourse);

 router.get("/getinstructorCourses",auth,getInstructorCourses);


 router.delete("/deleteCourse", deleteCourse)


 router.post("/getFullCourseDetails",auth, getFullCourseDetails)


router.post("/categorypageDetails",categoryPageDetails3);

router.post("/capturePayment",auth, capturePayment);

router.post("/verifyPayment",auth, verifyPayments);

router.post("/capturePayment",auth, capturePayment);

router.post("/enrolledCourse",enrollStudentsAdmin);

router.post("/getCoursegetails", getCourseDetails);


router.post("/updateCourseProgress", auth ,updateCourseprogress);


router.post("/createRatings",auth,createRating);
router.get("/getAverageRating",getAverageRating);


router.get("/getAllreview", getAllRating)


router.get("/instructorDashboard" , auth , instructorDashboard);

module.exports = router;