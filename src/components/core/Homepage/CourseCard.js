import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";

const CourseCard = ({heading,  description , level ,lessionNumber, currentCad,setCurrentCard}) => {
 
 function a(){
  console.log(currentCad,heading)
  setCurrentCard(heading);
 }

  return (
    <div className={`border border-richblack-100 py-5 px-5  w-[300px]  flex flex-col gap-5 justify-center        
     ${currentCad == heading ? " bg-white    text-richblack-600  border-r-8  border-yellow-100 border-b-8 border-l-0 border-t-0":"   bg-richblack-900 "}    rounded-md  h-[230px] `} onClick={a} >

  <div className=''>




  <h1 className='text-4xl '> {heading}</h1>
   
 <p className='text-md  text-richblack-300  font-thin  text- text-base'>{description}</p>

 <div  className='flex  justify-between'>

<div className='flex gap-2'>
<FaUserPlus></FaUserPlus>
<p>{level}</p>
</div>
 
  <div className='flex gap-2'>
<MdPlayLesson></MdPlayLesson>
<p>{lessionNumber}</p>
  </div>
 </div>



  </div>  
  
    </div>
  )
}

export default CourseCard