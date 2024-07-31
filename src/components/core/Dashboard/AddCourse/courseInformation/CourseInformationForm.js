import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'

import { setCourse, setStep } from '../../../../../Slices/courseSlice'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import Requirementfield from './Requirementfield';
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../../utils/constants copy'
import ChipInput from './ChipInput'
import Upload from './Upload'
 

const CourseInformationForm = () => {

    const {
        register,
         handleSubmit,
        setValue,
        getValues,
        formState : {errors}
    }=useForm()


    const dispatch =useDispatch();
   const {course,editCourse} =useSelector((state)=>state.course)
    const [loading ,setloading] =useState(false);
    const [courseCategory ,setCourseCategory]=useState([]);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        const getcategories =async ()=>{
          //  setloading(true)
            const categories =await fetchCourseCategories();

            if( categories.length >0){
                setCourseCategory(categories)
            }
          //  setloading(false);
        }

        if(editCourse){
          
            setValue("courseTitle" ,course.courseName)
            setValue("courseShortDesc" ,course.courseDescription)
            setValue("coursePrice" ,course.price)
            setValue("courseTags" ,course.tag)
            setValue("courseBenefits" ,course.whatYouWillLearn)
            setValue("courseCategory" ,course.category)
            setValue("courseRequirements" ,course.instructions)
            setValue("courseImage" ,course.thumbNail)
        }

        getcategories();
    },[])




    const isfromupdated=()=>{
        const currentValues =getValues();
        if( currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
              course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail){
            return true
        }else{
            return false
        }
    }
    const onSubmit =async (data)=>{
        
        
        
        
        if(editCourse){


        if( isfromupdated()){





                 
            const currentValues =getValues();
            const formData =new FormData();

            formData.append("courseId" , course._id);
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle)
            }
            if(currentValues.courseDescription !== course.courseDescription){
                formData.append("courseDescription", data.coursePrice)
            }

            if(currentValues.coursePrice !== course.price){
                formData.append("price", data.courseTitle)
            }

            
            if(currentValues.coursebenefits !== course.whatYouWillLearn){
                formData.append("whatYouWillLearn", data.coursebenefits)
            }
            
            if(currentValues.courseCategory._id !== course.category._id){
                formData.append("category", data.courseCategory)
            }

            if(currentValues.courseRequirement.toString() !== course.instructions.toString()){
                formData.append("courseRequirement",  JSON.stringify( data.courseRequirement ))
            }


            if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
              }

           // setloading(true);

            const result =await editCourseDetails(formData,token)
           // setloading(false);


            if(result){
              setStep(2)
              dispatch(setCourse(result));
            }





        }else{
            toast.error("No changes  made to the form ");
        }
        return













        
        } 

        const formData =new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription" , data.courseDescription);
        formData.append("price" ,data.coursePrice);
        formData.append( "whatYouWillLearn" ,data.coursebenefits);
        formData.append("Category",data.courseCategory);
        formData.append("image",data.courseImage)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append( "instructions", JSON.stringify(data.courseRequirement));
        formData.append("status" , COURSE_STATUS.DRAFT);
       // loading(true);

       console.log(formData)
        const result = await  addCourseDetails(formData,token);

       // console.log("i am result "+result);
        // setStep(2);
       if(result){
        //console.log("i am result "+result);
         dispatch(setStep(2));
         dispatch(setCourse(result));
       }
      //  setloading(false)
        
    }

  return (
    <div> 
    
<form onSubmit={handleSubmit(onSubmit)} className=' rounded-md  border-richblack-700 p-6 space-y-6'>

<div>
    <label  htmlFor='courseTitle' >Course Title *</label>
    <input
    id='courseTitle'
    placeholder='enter course title '
    {...register("courseTitle", {required: true})}
    className='W-full text-black'>
    </input>

    {
        errors.courseTitle && (
            <span>Course Title is required </span>
        )
    }

</div>

<div>
    <label  htmlFor='courseDescription'> Course Short Description</label>
    <textarea
id='courseDescription'
placeholder='enter the description '
    {...register("courseDescription", {required:true})}
    className=' min-h-[140px] w-full text-black'>

    </textarea>
    {
        errors.courseDescription && (
            <span>
                Course Description is required 
            </span>
        )
    }
</div>



<div className='relative '>
    <label className=' block'  htmlFor='coursePrice'>Course price *</label>
    <input
    id='coursePrice'
    placeholder='enter course price'
    {...register("coursePrice", {required: true,
    validNumber : true,
    })}
    className='W-full text-black'>
    </input>
    <HiOutlineCurrencyRupee className='absolute  top-0 left-52'></HiOutlineCurrencyRupee>

    {
        errors.coursePrice && (
            <span>Course Price  is required </span>
        )
    }

</div>

<div>
    <label htmlFor='courseCategory'>Course  Category</label>
    <select
    id='courseCategory'
    defaultValue=""
    {...register("courseCategory" ,{required: true})}
    className='text-black'>
          
          <option value="" disabled> Choose a Category </option>

          {
            !loading &&  courseCategory.map((category,index)=>(
                <option key={index} value={category?._id} className='text-black'>{category?.name}</option>
            )) 
          }
    </select>

    {
        errors.courseCategory && (
            <span>
                course category is required 
            </span>
        )
    }
</div>

{/* 
<Chipinput
label="Tags"
name="courseTags"
register={register}
 errors ={errors}
 setValue = {setValue}
 getValue={getValue}
></Chipinput> */}



 <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
       
      {/* Course Thumbnail Image */}

       <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      /> 





<div>
    <label className='block ' htmlFor='coursebenefits'>banefits of the Course</label>
    <textarea
    id='coursebenefits'
    placeholder='enter the Benefits of the course'
    {...register("courseBenefits",{required: true})}
    className='min-h-[130px] w-full  '></textarea>

    {
        errors.coursebenefits && (

            <span>
                 Benefits of the courses are required 
            </span>
        )
    }
</div>


<Requirementfield
name="courseRequirement"
label="Requirement/Instructions"
register= {register}
errors ={errors}
setValue ={setValue}
getValue={getValues}></Requirementfield>
<div>
    {
                        <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300 p-5 rounded-md'
                    >
                        Continue Without Saving
                    </button>
    }
</div>
<div>
    <IconBtn 
    className=' text-white'
    text={!editCourse ? "Next" : "save changes"}></IconBtn>
</div>

</form>

    </div>
  )
}

export default CourseInformationForm