import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../Slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishedCourse= () => {
    const {register,handleSubmit, setValue, getValues}= useForm();
    const {course} =useSelector((state)=>state.course);
    const dispatch =useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const [loading ,setLoading]=useState(false);


    useEffect(()=>{
         if(course?.status === "Published"){
            setValue("Public", true)
         }
    },[])


    const goBack =()=>{
            dispatch(setStep(2));
    }
    const handleCoursepublished = async()=>{
        if(course?.status === "Published" && getValues("Public") === true  
        || (course.status == "Draft"  && getValues("Public") === false)){
              gotoCourses();
              return;
        }
        const formData =new FormData();
        formData.append("courseId" ,course._id);
        const courseStatus= getValues("public") ? "Published" : "Draft";
        formData.append("status" , courseStatus);
        setLoading(true);

        const result =await editCourseDetails(formData, token);

        if(result){
            gotoCourses()
        }
        setLoading(false)
    }
    const gotoCourses =()=>{
        dispatch(resetCourseState());

    }

    const onSubmit =()=>{
           handleCoursepublished()
    }
     
  return (
    <div className=' rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>   
    <p>published course </p>
    
    <form onSubmit={handleSubmit(onSubmit )}>
       <div>
        <label htmlFor='public'>
            
        
        <input type='checkbox' id='public'
        {...register("public")}
        className='rounded h-4 w-4'></input>
        <span className='ml-3'>  make this course as  published</span>
         </label>
       </div> 

       <div className='flex justify-between  gap-x-3 '>

        <button disabled={loading} onClick={goBack} className=' bg-richblack-300  p-5 rounded-lg'>
            Back
        </button>

        <IconBtn disabled={loading} text={"saved changes"}></IconBtn>
       </div>
    </form>
    </div>
  )
}

export default PublishedCourse