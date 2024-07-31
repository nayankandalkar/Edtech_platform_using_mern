import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { MdToken } from 'react-icons/md';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const InstructorDash = () => {

    const [loading , setLoading] =useState(false);
    const {token} =useSelector((state)=>state.auth)

    const {user} = useSelector((state)=>state.profile);
    const [instructorData, setInstructorData] =useState(null);
    const [courses, setCourses]= useState([]) ;
    useEffect(()=>{
        const getCourseDataWithStats = async ()=>{
            
            setLoading(true);
          
            const instructorApiData = await getInstructorData(token);
             const result = await fetchInstructorCourses(token);
        
                    
             console.log("i am instructor data",instructorApiData);


             if(instructorApiData.length){
                setInstructorData(instructorApiData);

                if(result){
                    setCourses(result);
                }

                setLoading(false)
             }


            // console.log(totalAmount);
           
            }



            getCourseDataWithStats()
             
    },[])

    
    const totalAmount = instructorData?.reduce((acc, curr)=>acc + curr.totalAmountGenerated , 0)
             
    //const totalStudents = instructorData?.reduce((acc,curr)=>acc+ parseInt(curr.totalStudentsEnrolled))

    const totalStudents = instructorData?.reduce((acc, curr) => {
        const totalStudentsEnrolled = parseInt(curr.totalStudentsEnrolled);
        return acc + (isNaN(totalStudentsEnrolled) ? 0 : totalStudentsEnrolled);
    }, 0);
    
  return (
    <div className='text-white'> 
    
    <div>
    <div>
        <p> hi {user?.firstName}</p>
        <p>lets start explore something new </p>
        </div>

        {
            loading ?  (<div> loading..... </div>):
            courses.length > 0 ? (<div>
                <div>
                
                   <InstructorChart courses={instructorData}></InstructorChart>
                   <div>
                    <p> Statistics</p>
                    <div>
                        <p> Total Copurses</p>
                        <p>{courses.length}</p>
                    </div>
                    <div>
                        <p>total Students </p>
                        <p>{totalStudents}</p>
                        {
                            console.log(" i am to tal student " , totalStudents)
                        }
                    </div>
                    <div>
                        <p>Total Income</p>
                        <p>{totalAmount}</p>
                    </div>
                   </div>
                </div>

                <div>
                       
                       <div>
                              <p> your courses</p>
                              <Link to="/dashboard/my-courses">
                                      view All
                              </Link>
                       </div>

                       <div>
                         {
                            courses.slice(0,3).map((course)=>(
                                <div>
                                        <img  src={course.thumbNail}></img>

                                        <div>
                                            <p>{course.courseName}</p>
                                            <div>
                                                <p> {course.studentEnrolled.length}  students </p>
                                                <p> | </p>
                                                <p> Rs {course.price}</p>
                                            </div>
                                        </div>
                                </div>
                            ))
                         }
                       </div>
                </div>
            </div>) : (<div>
                <p> you have not created a course  yet</p>
                <Link  to="/dashboard/addCourse" >
                         create a course
                </Link>
            </div>)
        }

    </div></div>
  )
}

export default InstructorDash