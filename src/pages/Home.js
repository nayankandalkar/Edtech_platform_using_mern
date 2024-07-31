
import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import Highlitettext from '../components/core/Homepage/Highlitettext';
import Button from '../components/core/Homepage/Button';

import Banner  from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimeLine from '../components/core/Homepage/TimeLine';
import LearningLanguage from '../components/core/Homepage/LearningLanguage';
import Instructor from '../components/core/Homepage/Instructor';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>



    
<div className='relative max-w-maxContent mx-auto flex flex-col w-[11/13] text-white items-center justify-between 
  '>


  <Link to={"/signup"}>
    <div className='mx-auto  rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
        <div className='flex  items-center justify-center gap-4 px-10 py-[5px]  transition-all duration-200 group-hover: bg-richblack-900 '>
              <p>become a instructor </p>
              <FaArrowRight></FaArrowRight>
        </div>
    </div>
  </Link>


  <div className=' text-center text-2xl font-semibold mt-7'>
    Empower your Future With Future scale  
    <Highlitettext text={`  future skill `} ></Highlitettext>
  </div>

  <div className=' text-richblack-300    text-center  text-lg mt-4 w-[90%]'>
    With our online coding course , you can Learn at your own , from anywhere word and get acess to the welth of the resources , including hands-on project and quizzes and personalized feedback from instructor 
  </div>



<div className=' flex flex-row gap-7  mt-8'>
<Button children={"learn more"} linkto="/signup"  active={true} ></Button>
<Button children={"book demo"} linkto="/login" ></Button>

</div>



<div className='shadow-blue-200  mx-3 my-12     w-[80%]   relative ' >
 
 
 

<div className='      '>

   
   <video
   className='w-full'
   muted
   loop
   autoPlay>
 <source src={Banner}></source>
   </video>

   
</div>
</div>



<div>
  
 <CodeBlocks position={"flex-row"}
 heading={
  <div className='text-2xl font-bold'>
  unlock your 
  
  <Highlitettext text={"coding courses "}></Highlitettext>

  with our  online courses 
  </div>
 }

subheading={"our courses design and taught by industry experts who have yexrs of experience "}

ctabtn1={
  {
    btntext :"try it yourself ",
    linkto :"/signup",
    active: true
  }
}

ctabtn2={
  {
    btntext : " learn more",
    linkto : "/login",
    active : false
  }
}

Codeblock={ `<html>
  <head>
    <title>Href Attribute Example</title>
    </head>
  <body>
    <h1>Href Attribute Example</h1>
    <p>
      <a href="https://www.freecodecamp.org/contribute/">The freeCodeCamp Contribution Page</a> shows you how and where you can contribute to freeCodeCamp's community and growth.</a> \n
    </p>
  </body>
</html>  `}
  ></CodeBlocks>
 
</div>




<div>
  
 <CodeBlocks position={"flex-row-reverse"}
 heading={
  <div className='text-2xl font-bold'>
  unlock your 
  
  <Highlitettext text={"coding courses "}></Highlitettext>

  with our  online courses 
  </div>
 }

subheading={"our courses design and taught by industry experts who have yexrs of experience "}

ctabtn1={
  {
    btntext :"try it yourself ",
    linkto :"/signup",
    active: true
  }
}

ctabtn2={
  {
    btntext : " learn more",
    linkto : "/login",
    active : false
  }
}

Codeblock={ `<html>
  <head>
    <title>Href Attribute Example</title>
    </head>
  <body>
    <h1>Href Attribute Example</h1>
    <p>
      <a href="https://www.freecodecamp.org/contribute/">The freeCodeCamp Contribution Page</a> shows you how and where you can contribute to freeCodeCamp's community and growth.</a> \n
    </p>
  </body>
</html>  `}
  ></CodeBlocks>
 
</div>






<ExploreMore></ExploreMore>
 

</div>



<div className='bg-pureGray bg-pure-greys-5  text-richblack-700'>

<div className='homepage-bg h-[333px]'>
 
 <div  className='h-[150px]'></div>

<div className='flex flex-row gap-7 text-white it items-center justify-center  '>
  <Button  active={true} >
    <div  className='flex items-center gap-5'>
      explore full catalogs 
      <FaArrowRight></FaArrowRight>
    </div>
  </Button>

  <Button  active={false} >
    <div  className='flex items-center gap-5'>
    learn more 
      <FaArrowRight></FaArrowRight>
    </div>
  </Button>
</div>
 

</div>
</div>




<div  className='bg-pure-greys-5 text-richblack-700  '>
<div className=' w-11/12 mx-auto flex flex-col items-center justify-between gap-5 '>
<div className='flex flex-row gap-4 items-center justify-center'>
  <div className='text-4xl font-semibold w-[45%]'>
    get the skill you need for a 
    <Highlitettext text={"or that in demand" } className ={'text-blue-700' }></Highlitettext>
  </div>

  <div className=' flex flex-col gap-10 w-[40%]'>
   <div  className='text-10'>
    the mordern study notion i syhe dictate its own items today to be a competitive  specilist require more than professional skill 
   </div>
 <Button  active={true} linkto={"/signup"} className={'w-[5px]'}>
  <div  >
    learn more 
  </div>
 </Button>
  </div>

 
 
</div>

<TimeLine></TimeLine>
 <LearningLanguage></LearningLanguage>
</div>
</div>






<div className='w-[80%] mx-auto flex items-center  flex-col  justify-center gap-8 bg-richblack-900 text-white mt-10'>

   <Instructor></Instructor>
<h2 className='text-center  text-white text-4xl mt-10'>Review from other learner</h2>


<ReviewSlider></ReviewSlider>
</div>





<div>
  <Footer></Footer>
</div>





    </div>
  )
}

export default Home;