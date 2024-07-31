const BASE_URL =process.env.REACT_APP_BASE_URL

export const categories ={
    CATEGORIES_API : "http://localhost:4000/api/v1/showAllcategory",
    LOGIN_API:"http://localhost:4000/api/v1/login"
    
}

export const endpoints = {
    SENDOTP_API: "http://localhost:4000/api/v1/otp",
    SIGNUP_API: "http://localhost:4000/api/v1/sign",
    LOGIN_API:  "http://localhost:4000/api/v1/login",
    RESETPASSTOKEN_API: "http://localhost:4000/api/v1/reset",
    RESETPASSWORD_API: "http://localhost:4000/api/v1/resetyourpassword",
  }
  

  export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  


  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:"http://localhost:4000/api/v1/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API :"http://localhost:4000/api/v1/instructorDashboard"
  }



  

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",


  COURSE_DETAILS_API: "http://localhost:4000/api/v1/getCoursegetails",


  EDIT_COURSE_API:"http://localhost:4000/api/v1/editCourse",


  COURSE_CATEGORIES_API:"http://localhost:4000/api/v1/showAllcategory",


  CREATE_COURSE_API:"http://localhost:4000/api/v1/createCourse",



  CREATE_SECTION_API:"http://localhost:4000/api/v1/createSection",




  CREATE_SUBSECTION_API:"http://localhost:4000/api/v1/addnewsubsection",



  UPDATE_SECTION_API:"http://localhost:4000/api/v1/updatesection",



  UPDATE_SUBSECTION_API:"http://localhost:4000/api/v1/updateSubsection",



  GET_ALL_INSTRUCTOR_COURSES_API:"http://localhost:4000/api/v1/getinstructorCourses",


  DELETE_SECTION_API:"http://localhost:4000/api/v1/deletesection",



  DELETE_SUBSECTION_API:"http://localhost:4000/api/v1/deleteSubSection",



  DELETE_COURSE_API: "http://localhost:4000/api/v1/deleteCourse",


  
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
   "http://localhost:4000/api/v1/getFullCourseDetails",






  LECTURE_COMPLETION_API:  "http://localhost:4000/api/v1/updateCourseProgress",







  CREATE_RATING_API:"http://localhost:4000/api/v1/createRatings",
}

export const catalogData = {
  CATALOGPAGEDATA_API: "http://localhost:4000/api/v1/categorypageDetails",
}

export const studentEndpoints = {
  COURSE_PAYMENT_API: "http://localhost:4000/api/v1/capturePayment",
  COURSE_VERIFY_API: "http://localhost:4000/api/v1/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}


// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API:"http://localhost:4000/api/v1/getAllreview",
}
