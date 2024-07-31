import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { IoMdAddCircle } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationArrow } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../../Slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import NestedView3 from './NestedView3';
import {MdAddCircleOutline} from "react-icons/md"
import {BiRightArrow} from "react-icons/bi"

const CourseBuilderForm = () => {

  const {register,handleSubmit,setValue ,formState :{errors}} =useForm();

 const [editSectionName,seteditSectionName] =useState(null);

 const {course} =useSelector((state)=>state.course);

 const [loading ,setLoading]=useState(false)


 const {token}= useSelector((state)=>state.auth)

 const dispatch =useDispatch();



 useEffect(()=>{
  console.log("UPDATED");
 },[course])


 const cancelEdit =()=>{
  seteditSectionName(null);
  setValue("sectionName" ,"")
 }

 const goBack =()=>{
 dispatch(setStep(1));
 dispatch(setEditCourse(true))
 }
 const gotoNext =()=>{
  if(course?.courseContent?.length === 0){
    toast.error("please add atleast one section ")
    return;
  }
  if(course.courseContent.some((section)=>section.subSection.length === 0)){
    toast.error("please add atleast one lecture ")
    return;
  }

  dispatch(setStep(3))
 }

 
 const onSubmit =async (data)=>{
   setLoading(true);
   let result ;

   if(editSectionName){
     result =await updateSection(
      {
        sectionName:data.sectionName,
        sectionId : editSectionName,
        courseId : course._id
      }, token
     )
   }else{
    result = await createSection(
     { sectionName: data.sectionName,
      CourseId :course._id
     }
     , token
    )  
   }

   console.log("mai original hu" +result)

   if(result){
    dispatch(setCourse(result));
    seteditSectionName(null);
    setValue("sectionName", "")
   }

   setLoading(false)

 }

 const handleChangeEditSectionName  = (sectionId, sectionName)=>{

  if(editSectionName == sectionId){
    cancelEdit();
    return;
  }
  seteditSectionName(sectionId);
  setValue("sectionName", sectionName);

 }

  return (

    
    <div className='text-white '>
          
          <p> course Builder </p>
    
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor='sectionName'>
          Scection name 
        </label>
        <input
        id='sectionName'
        placeholder=' Add a section name '
        {...register("sectionName", {required : true })}
        
        className='w-full text-black '>

        </input>

        {
          errors.sectionName && (
            <span>section name is required </span>
          )
        }
      </div>


      <div className='flex  gap-5'>
        
   
      <div className=' border border-yellow-25  text-center p-5 m-5   rounded-md flex  items-center justify-center  gap-5'>

        <IconBtn
        type="submit"
        text={
          editSectionName ? "edit section name " : "create section"
        }
        outline={true}
        customClass={"text-white"}>
          
        </IconBtn>
        <GrAddCircle />
      </div>
{
  editSectionName && (
    <button 
    type='button'
    onClick={cancelEdit}
    className='text-sm text-richblack-100 underline'> cancel Edit  </button>
  )
}
      </div>

      
    </form>

     

{
  course?.courseContent?.length >0 && (
    
    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
  )
}

<div className='flex justify-end gap-x-3 '>

<button
onClick={goBack}
className=' rounded-md cursor-pointer flex items-center '>
  black
</button>
</div>

<IconBtn 
 text="next"
 onclick={gotoNext}>
  <FaLocationArrow></FaLocationArrow>
 </IconBtn>





    </div>



 
    

  )
}

export default CourseBuilderForm