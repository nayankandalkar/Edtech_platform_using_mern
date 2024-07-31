import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { getValue } from '@testing-library/user-event/dist/utils'
import { RxCross1 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn'
import { setCourse } from '../../../../../Slices/courseSlice'
import Upload from '../courseInformation/Upload'

 
const SubSectionModal = (
    {
        modalData,
        setModalData,
        add= false,
        view= false,
        edit=false
    }
) => {

    const { register , handleSubmit ,setValue, formState: {errors}, getValues }=useForm()

    const dispatch =useDispatch();
    const [loading ,setLoading]=useState(false)
    const {course} =useSelector((state)=>state.course);
    const {token}= useSelector((state)=>state.auth);
    useEffect(
        ()=>{
            if(view || edit ){
                setValue("lectureTitle" ,modalData.title);
                setValue("lectureDesc" ,modalData.description);
                setValue("lectureVideo" ,modalData.videoUrl);
            }
        },[])

        const handleEditSubSection=async()=>{
          const currentValues =getValues();
          const formData =new FormData();
          formData.append("sectionId", modalData.sectionId);
          formData.append("subSectionId", modalData._id);
          
          if(currentValues.lectureTitle !== modalData.title )
          {
            formData.append("title", currentValues.lectureTitle);

          }

          if(currentValues.lectureDesc !== modalData.description )
          {
            formData.append("description", currentValues.lectureDesc);
            
          }
          if(currentValues.lectureVideo !== modalData.videoUrl )
          {
            formData.append("title", currentValues.lectureVideo);
            
          }

          setLoading(true);
          const result =await updateSubSection(formData, token);

          if(result){


            const updatedcourseContent =course.courseContent.map((section)=>section._id === modalData.sectionId ? result :section);
                const updatedCourse ={...course, courseContent : updatedcourseContent}

                dispatch(setCourse(updatedCourse));


          //  dispatch(setCourse(result));
          }
          setModalData(null);
          setLoading(false);
        }

        const isFromUpdated =async ()=>{
            const currentValues =getValues();

            if(currentValues.lectureTitle !== modalData.title
               || currentValues.lectureDesc !== modalData.description
               || currentValues.lectureVideo !== modalData.videoUrl){

                return true
            }else{
                return false
            }
        }
   


        const onSubmit = async(data)=>{

            if(view){
                return
            }
            if(edit){
                if(!isFromUpdated){
                    toast.error("No changes  made to form ")
                }else{
                    handleEditSubSection();
                }
                return
            }


            const formData =new FormData();
            formData.append("sectionId", modalData)
            formData.append("title",data.lectureTitle);
            formData.append("description", data.lectureDesc);
            formData.append("videoFile",data.lectureVideo);
            setLoading(true);
            const result = await  createSubSection(formData, token);

            console.log("i am sub section ")
            console.log(result);

            if(result){


                const updatedcourseContent =course.courseContent.map((section)=>section._id === modalData ? result :section);
                const updatedCourse ={...course, courseContent : updatedcourseContent}

                dispatch(setCourse(updatedCourse));

            }
            setModalData(null);
            setLoading(false);
         }

         
  return (
    <div> 
         
         <div>
            <div>
                <p>{view && "viewing "} 
                {add && "Adding"}
                {edit && "Editing"}
                
                Lecture</p>


                 <button
                onClick={
                    ()=>(
                        !loading ? setModalData(null): {}        
                    )
                }>
                  <RxCross1 />
                </button> 

              

                <form onSubmit={handleSubmit(onSubmit)}>

                 
                 <Upload
                 name ="lectureVideo"
                 label ="Lecture Video"
                 register ={register}
                 setValue ={setValue}
                 errors ={errors}
                 video ={true}
                 viewData = { view ?  modalData.videoUrl   : null}
                 editData = {edit ? modalData.videoUrl : null}

                ></Upload> 

                <div>
                    <label htmlFor='lectureTitle'> lecture Title</label>
                    <input id='lectureTitle' 
                    placeholder='Enter lecture Title '
                    {...register("lectureTitle", {required : true})}
                    className=' w-full text-black'
                    ></input>

                    {
                        errors.lectureTitle && (
                            <span>lecture Title is required </span>
                        )
                    }
                </div>


                <div>
                    <label  htmlFor='lectureDesc'> lecture Description </label>
                    <textarea  id="lectureDesc"
                    placeholder='enter lecture description'
                    {...register("lectureDesc" ,{required : true})}
                    className='w-full min-h-[130px] text-black'></textarea>
                         
                        {
                            errors.lectureDesc && (
                                <span> lecture Description is required </span>
                            )
                        } 
                </div>
                    {
                         !view  &&( <div>
                                <IconBtn
                                
                                text={loading ? "loading... ": edit ? "save changes " : "save"}></IconBtn>
                         </div>

                         )
                    }
                </form>
            </div>
         </div>

    </div>

     
  )
}

export default SubSectionModal