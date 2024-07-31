import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/StudentFeatureApi'
 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
 import Error from './Error'
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import CourseCard from '../components/core/Course/CourseCard';

const CourseDetails = () => {
  

const {user}= useSelector((state)=>state.profile)
const {token} =useSelector((state)=>state.auth);
const dispatch = useDispatch();
const navigate =useNavigate();
const {courseId} =useParams()

const {loading}=useSelector((state)=>state.profile);
const {paymentLoading} =useSelector((state)=>state.course);

  
const [courseData,setCourseData]=useState(null);


const [confirmationModal, setConfirmationModal]=useState(null);

console.log(courseId )




useEffect(()=>{


  const getCourseFullDetails =async ()=>{

  try{

    const result=await  fetchCourseDetails(courseId);

     setCourseData(result);

     console.log("i am printing...... ")
     console.log(result)

  }catch(e){

     console.log("could not found course Details");
  }
  
}
getCourseFullDetails()


},[courseId])



const [avgreviewCount , setAvgreviewCount]=useState(0);


//console.log(courseData);


useEffect(()=> {
  const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
  setAvgreviewCount(count);
},[courseData])


const [totalNoOfLecture ,setTotalNoOfLectures]=useState(0);



useEffect(()=> {
  let lectures = 0;
  courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
  })
  setTotalNoOfLectures(lectures);

},[courseData]);




const [isActive,setIsActive ] =useState(Array(0));
const handleActive =(id)=>{
  setIsActive(
    !isActive.includes(id) ?
    isActive.concat(id):
    isActive.filter((e)=> e !=  id )
  )
}


const handleBuyCourse = () => {
        
  if(token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
  }
  setConfirmationModal({
      text1:"you are not Logged in",
      text2:"Please login to purchase the course",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:() => navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null),
  })

}


if(loading || !courseData) {
  return (
      <div>
          Loading...
      </div>
  )
}

if(!courseData.success) {
  return (
      <div>
          <Error />
      </div>
  )
}


const {
  _id: course_id,
  courseName,
  courseDescription,
  thumbnail,
  price,
  whatYouWillLearn,
  courseContent,
  ratingAndReview,
  instructor,
  studentEnrolled,
  createdAt,
} = courseData?.data?.courseDetails;

  return (
    <div className='flex flex-col items-center text-white'>
     
     <div>

 
     
     
         <p>{courseName }</p>
     <p>{courseDescription}</p>
    
    <div className='flex gap-x-8'>

     
     <p>{avgreviewCount}</p>
     <RatingStars  Review_Count={avgreviewCount}  Star_Size={24}></RatingStars>

     <span>{`${ratingAndReview.length} reviews`}</span>
     <span >{`${studentEnrolled.length} student enrolled `}</span>
     </div>  
      
         

         <div>
          <p>created By {`${instructor.firstName}`}</p>

         </div>

         <div  className='flex  gap-x-3'>
          <p>
            created At {
              formatDate(createdAt)
            }
          </p>
          <p>
            {" "} English 
          </p>





                
     </div>



         </div>



<div>
{
 !loading ?(
  <CourseCard
  course={courseData?.data?.courseDetails}
  setConfirmationModal={setConfirmationModal}
  handleBuyCourse={handleBuyCourse}></CourseCard>
 ): (<div></div>)
}
</div>


<div>
  <p> what you will learn </p>
  <div>
    {whatYouWillLearn}
  </div>
</div>


<div>
  <div>
      <p>Course Content </p>
  </div>
  <div className='flex gap-x-3 justify-between'>

           <div>
  
             <span>{courseContent.length} sections</span>

  
              <span>{totalNoOfLecture} lectures</span> 
                      <span>
                    {
                     courseData?.data?.totalDuration
                   } total length 
                      </span>

          </div>

 

         <div>
              <button
              onClick={()=>setIsActive([])}>
                   collapse All section 
              </button>
         </div>


   </div>

 


</div>


     {
      confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
     }
       
            </div>

  
    
  )
}

export default CourseDetails