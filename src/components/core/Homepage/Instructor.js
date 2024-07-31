import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import Highlitettext from './Highlitettext'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div> 
    

    <div className='flex flex-row gap-20 items-center  mx-auto'>

        <div className='w-[50%]'>
           <img src={instructor} className=' shadow-white shadow-lg'></img> 
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
         
         <div className='text-4xl font-semibold w-[50%] '>
            Become an
            <Highlitettext text={"instructor"}></Highlitettext>
         </div>

         <p className='  font-medium text-[16px] w-[90%] text-richblack-400'>
            instructor from around the world  teach millions of students on studynotion 
            we provide the tools and skills to teach  what you love 
         </p>

         <div className='w-fit '>
         <Button active={true} linkto={"signup"} className="w-fit">
            <div className='flex gap-2  items-center justify-center'>
                 <p>start learning today</p>
                  <FaArrowRight></FaArrowRight>
            </div>
         </Button>

         </div>

       
        </div>

    </div>
    
    
    </div>
  )
}

export default Instructor