import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './courseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseBuilderForm3 from './CourseBuilder/CourseBuilder3'
import PublishedCourse from './PublishedCourse'
import CourseInformationForm3 from './courseInformation/CourseInformationForm3'
 

const RenderSteps = () => {

 // const {step} = useSelector((state)=> state.course);

   let  {step} =useSelector((state)=>state.course)
   console.log(step)
    const steps =[
        {
            id :1,
            title: "Course Information"
        },
        {
            id :2,
            title: "Course Builder"
        },
        {
            id :3,
            title: "Course Publish"
        }
    ]
  return (
    <div className=''>
      <div>

 
        {


          steps.map((items)=>(

            <div>

         
            <div>
               <div className={`${step === items.id ? "bg-yellow-900  border-yellow-50 text-yellow-50"
               :" border-richblack-700  bg-richblack-800  text-richblack-100"}`}>
               {
                step > items.id ? (<FaCheck></FaCheck>) : (<p>{items.id}</p> )
               }
               </div>
            </div>

            </div>
          ))


        } 



      </div>


       
       <div>
        {
          
          steps.map((items)=>(
            <div>
               <div>
                <p>{items.title}</p>
               </div>
            </div>
          )) 
           
          
        }
       </div>

       {
        step === 1 && 
        <div> 
    
    <CourseInformationForm3></CourseInformationForm3>

        {/* <CourseInformationForm></CourseInformationForm> */}
        
        
        </div>
       }

       {
        step === 2 && 
        <div>
              {/* <CourseBuilderForm3></CourseBuilderForm3> */}

              <CourseBuilderForm></CourseBuilderForm>
        </div>
       }

       {
        step === 3 && 
        <div>
          
            <PublishedCourse></PublishedCourse>
        </div>
       }

      
    </div>
  )
}

export default RenderSteps