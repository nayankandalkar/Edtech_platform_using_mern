import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../Slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';


const CourseTable = ({courses,setCourses}) => {
 
    const dispatch =useDispatch();
    const {token}=useSelector((state)=>state.auth)
    const [loading ,setLoading] =useState(false);

    const [confirmationModal, setConfirmationModal] =useState(null);
   const navigate=useNavigate();

   const handleCourseDelete= async (courseId)=>{
    console.log(" i deleting am ")
        setLoading(true);
        await deleteCourse({courseId:courseId}, token);
        const result =await  fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    return (
    <div className='text-white'>

    
    <Table>
        <Thead>
            <Tr  className='flex gap-x-10 border-richblue-800 p-5'>
                <Th> courses </Th>
                <Th> Duration </Th>
                <Th> price </Th>
                <Th> Actions </Th>
               
            </Tr>
        </Thead>
         <Tbody>
            {
                courses?.length === 0 ? (
                    <Tr> 
                    <Td> No courses found</Td>
                    </Tr>
                    ): 
                    (
                         
                        
                        
                        courses.map((course)=>(
                            <Tr key={course._id}   className='flex gap-x-10 border-richblue-800 p-5'>
                               
                                <Td className="flex gap-x-4">
                                <img  src={course?.thumbNail}
                                className='h-[150px] w-[220px] rounded-lg object-cover'>

                                </img>

                                <div className='flex flex-col'>
                                     
                                     <p>{course.courseName}</p>
                                     <p>{course.courseDescription}</p>
                                     <p>Created :</p>

                                     {
                                        course.status == "Published" ? 
                                        (<p className=' text-yellow-50'> Published</p>) : 
                                        (<p className=' text-pink-50'> Draft</p>)
                                     }
                                      
                                </div>
                               </Td>
                               

                               <Td>
                                 2 hr 30 min 
                               </Td>

                               <Td>
                                {course.price}
                               </Td>
                               <Td className='flex  gap-x-7 m-[50px]'>
                                <button disabled= {loading} 
                                onClick={()=>{
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                }}
                               >
                                    Edit
                                </button>

                                <button
                                disabled={loading}
                                onClick={()=>{
                                    setConfirmationModal({
                                        text1 : "Do you Want to delete this course",
                                        text2 : "All the data related to this will be deleted",
                                        btn1Text:  !loading ? "Delete" : "Loading...  ",
                                        btn2Text: "cancel",
                                        btn1Handler : !loading ? ()=>handleCourseDelete(course._id) :
                                        ()=>{console.log(" i am working ")},
                                         btn2Handler : !loading ? ()=>setConfirmationModal(null) :()=>{}
                                    })
                                }}>
                                  Delete
                                </button>
                               </Td> 
                            </Tr>
                        ))


                        
                    )
            }
        </Tbody> 
    </Table> 

    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
    }
    </div>
  )
}

export default CourseTable