
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
 
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

  const {token}=useSelector((state)=>state.auth);
  const navigate =useNavigate()

  const [enrolledCourses,setEnrolledCourses]=useState([]);

  const getEnrolledCourses=async ()=>{
    try{

      const response =await getUserEnrolledCourses(token);
      console.log(response)
      setEnrolledCourses(response);
      console.log(enrolledCourses.length);
    }catch(e){
      console.log("unable to fetch enrolled course");

    }
  }
  useEffect(()=>{
    getEnrolledCourses()
  },[])

  return (
    <div className='text-white'>Enrolled
     Courses
     
     
     {
      !enrolledCourses ? (<div>  loading......</div>) :
       enrolledCourses.length == 0 ? (<p>you have not enrolled in any course </p>)
       :
       (<div>
        <div>
          <p>Course Name</p>
          <p>Duration</p>
          <p>Progress</p>
        </div>

        {
          enrolledCourses.map((courses,index)=>(
            
            <div>

            {
              console.log("i am course", courses.courseContent[0])
            }


                <div
                
                onClick={() => {
                  navigate(
                    `/view-course/${courses?._id}/section/${courses.courseContent?.[0]?._id}/sub-section/${courses.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
                >
                  <img src={courses.thumbNail}/>
                  <div>
                    <p>{courses.courseName}</p>
                    <p>{courses.courseDescription}</p>
                  </div>
                </div>



              <div>
                {courses?.totalDuration}
              </div>



                  {
                    console.log("please check me",courses)
                  }

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {courses.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={courses.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>

            </div>
          ))
        }
       </div>)
    }
     
     </div>
  )
}

export default EnrolledCourses