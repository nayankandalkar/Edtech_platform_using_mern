import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
 
const CourseReviewModal = ({setReviewModal}) => {

  const {user}=useSelector((state)=>state.profile);
  const {token} =useSelector((state)=>state.auth);
const {courseEntireData}=useSelector((state)=>state.viewCourse)

   const {
    register ,
    handleSubmit,
    setValue,
    formState:{errors}
   }  = useForm()



   useEffect(()=>{
  setValue("courseExperience", "");
  setValue("courseRating" ,0);

   },[])

  const  onSubmit =  async (data)=>{


    console.log("i am data", data);
    console.log("i am courseData", courseEntireData);

    
    await  createRating(
      {
        courseId:courseEntireData[0],
         rating:data.courseRating,
         revivew :data.courseExperience,
      },
      token
    )

    // setReviewModal(false)
  }

  const  ratingChange =(newRating)=>{
setValue("courseRating", newRating)
  }

  return (
    <div className='text-white'> 
    
     <div>



        <div>
                <p> Add Review </p>
                <button  onClick={()=>setReviewModal(false)}> close</button>         
        </div>


         <div>
              <div>
                 <img  src={user?.image} alt='user image' className=' aspect-square w-[50px]  rounded-full object-cover'/>
                    <div>
                      <p>{user?.firstName}</p>
                      <p>{user?.lastName}</p>
                      <p> posting publically</p>
                    </div>
              </div>


              <form onSubmit={handleSubmit(onSubmit)} className=' mt-6 flex flex-col items-center '>
                      
                      <ReactStars
                      count={5}
                      onChange={ratingChange}
                      size={24}
                       activeColor="#ffd700"
                      >

                      </ReactStars>

                      <div>

                        <label>Add your experience</label>
                        <textarea
                        id='courseExperience'
                        placeholder='add your experience'
                        {...register("courseExperience", {required:true})}
                        className=' form-style  min-h-[130px] w-full'>

                        </textarea>

                        {
                          errors.courseExperience && (
                            <span>
                              please add your own experience 
                            </span>
                          )
                        }
                      </div>


                      <button
                      onClick={()=>setReviewModal(false)}>
                        cancel
                      </button>

                       
                       <IconBtn
                       text="save">

                       </IconBtn>



              </form>
         </div>

 
     </div>
    
    </div>
  )
}

export default CourseReviewModal