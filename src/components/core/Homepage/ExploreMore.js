
import React, { useState } from 'react'

import {HomePageExplore} from '../../../data/homepage-explore'
import Highlitettext from './Highlitettext';
import CourseCard from './CourseCard';


const tabName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]


const ExploreMore = () => {
    const[currentTab, setCurrentTab]=useState(tabName[0]);
    const[courses, setCourses]=useState(HomePageExplore[0].courses);
     const[currentCad ,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

   const setMyCards=(value)=>{
    setCurrentTab(value);
    const result=HomePageExplore.filter((course)=>course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
   }
   
   //console.log( currentCad )

  return (
    <div>


<div className='text-4xl font-semibold text-center'>
    unloack the the 
    <Highlitettext text={"Power of course"}  ></Highlitettext>
    <p className='text-center text-lg text-richblack-300 font-semibold mt-4'>learn to build anything you can imagine </p>
    
</div>

<div className=' flex   bg-richblack-800 rounded-full   gap-5 mt-10 border-richblack-100 border-2 px-2 items-center justify-center w-fit mx-auto '>
    {
        tabName.map( (elements,index)=>{
            return (

                <div key={index}>

                <div key={index} className={`text-[16px] flex flex-row gap-2 items-center 
                ${currentTab === elements ? 
                "  bg-richblack-900  font-medium  text-richblack-5 "
                 : "text-richblack-200  " }
                  rounded-lg transition-all duration-200 cursor-pointer  hover:placeholder-richblue-900 hover:text-richblack-5 px-2 py-3`}
                onClick={()=>setMyCards(elements)}>
                    {elements}
                </div>

                </div>
                


                
            )
        })
    }
</div>


<div className='h-[150px]'></div>


<div className='relative flex items-center justify-center'>


 
<div className='flex gap-8    items-center justify-center   absolute  -top-[110px] '>
    {
        courses.map((elements,index)=>{
            return(
                
                <div key={index} className='flex      '>
                   <CourseCard 
                   heading={elements.heading}
                   description={elements.description}
                   level={elements.level}
                   lessionNumber={elements.lessionNumber}
                    currentCad={currentCad}
                    setCurrentCard={setCurrentCard}
                   ></CourseCard>
                </div>
        )})
    }
</div>

    
</div>
    </div>
  )
}

export default ExploreMore