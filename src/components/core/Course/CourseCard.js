import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addToCart } from '../../../Slices/cartSlice';
 

const CourseCard = ({course,setConfirmationModal,handleBuyCourse}) => {
   
    const {user}= useSelector((state)=>state.profile);
    const {token}= useSelector ((state)=>state.auth);
    const navigate =useNavigate()
    const dispatch =useDispatch();

    const {
        thumbNail : thumbNail,
        price:price
    }=course


    const handleAddtocart=()=>{

      if(user && user.accountType ==="Instructor" ){
        toast.error(" you are an instructor you cant buy course")
        return;
      }

      if
      (token){
        console.log("dispatch add to cart ")
        dispatch(addToCart(course))
        return
      }
        setConfirmationModal ({
          text1:" you are not logged in",
          text2:" please loggin to add to cart",
          btn1Text:"login",
          btn2Text: "cancel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null)
        })
      

      
    }

    const handleShare =()=>{
       copy(window.location.href)
       toast.success(" link copied to clipboard")
    }
    return (
    <div>
        <img src={thumbNail} className=' max-h-[300px]  min-h-[180px]   rounded-xl' alt='thumbnail image'></img>
          
          <div>
            Rs .{price}
          </div>
          <div className='flex flex-col gap-y-5'>
            <button 
            onClick={
              user && course?.studentEnrolled.includes(user?._id)?
              ()=>navigate("/dashboard/enrolled-courses"): handleBuyCourse
            }
            className=' bg-yellow-50 p-5 text-richblack-700 rounded-md'>
                {
                      user && course?.studentEnrolled.includes(user._id) ?
                      " go to course " : " buy now "
                }

                
            </button>

            {
              (!course?.studentEnrolled.includes(user?._id)) && (
                <button  onClick={handleAddtocart}
                
                className=' bg-yellow-50 p-5 text-richblack-700 rounded-md'>
                  Add to cart
                </button>
              )

            }
          </div>

          <div>
            <p>
              30 days money back gaurantee 
            </p>
            <p>
              this course  includes
            </p>
            <div className='flex gap gap-y-3'>
              {
                course?.instructions?.map((item, index)=>(
                  <p className='flex gap-3'>
                    <span key={index}>{item}</span>
                  </p>
                ))
              }
            </div>



          </div>


          <div>
            <button
            onClick={handleShare}
            className=' mx-auto  flex items-center gap-3 p-7 text-yellow-50 '>
              share
            </button>
          </div>
    </div>
  )
}

export default CourseCard