import React from 'react'
import Highlitettext from './Highlitettext'
 import konow_your_progress from '../../../assets/Images/Know_your_progress.png'
import compareimport from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'
const LearningLanguage = () => {
  return (
    <div> 
    
    <div className='flex flex-col   mt-[100px] items-center mb-10'>


    <div className=' text-4xl font-semibold text-center '>
     Your swiss Kniff for 
        <Highlitettext text={"learning any language"}></Highlitettext>
    </div>
         
         <div className='text-center text-richblack-600  mx-auto mt-3 font-medium w-[70%]'>
            using spin making learning multiple language easy with 20+ language realistics voice-over progress 
            tracking , custom schedule and more 
         </div>


         <div className='flex justify-center items-center mt-5'>
           
           <img src={konow_your_progress} className='  -mr-28 '></img>
           <img src={compareimport}></img>
           <img src={plan_your_lesson} className=' -ml-32'></img>
             
         </div>

         <div className='w-fit '>
            <Button active={true} linkto={"/signup"} >
                Learn More 
            </Button>
         </div>

    </div>


        
    </div>
  )
}

export default LearningLanguage