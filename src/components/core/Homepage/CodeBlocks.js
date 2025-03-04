import React from 'react'
import Button from './Button'
import Highlitettext from './Highlitettext'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading,ctabtn1, ctabtn2, Codeblock , background, codecolour}  ) => {
  return (
 
 
 <div className={`flex  ${position} my-20   gap-10 w-[11/12]   `}>

<div className=' w-[50%] relative flex flex-col gap-8  '>
  {heading}

  <div className='text-richblack-300 font-bold '>

{subheading}
  </div>

  <div className='flex gap-7 mt-7'>


    <Button  active={ctabtn1.active} linkto={ctabtn1.linkto}  >
<div className='flex gap-2 items-center '>
  {
    ctabtn1.btntext
  }
  <FaArrowRight></FaArrowRight>
</div>
    </Button>




     <Button  active={ctabtn2.active} linkto={ctabtn2.linkto}  >
   {
    ctabtn2.btntext
  }
   </Button>  


  </div>
</div>


<div className=' flex   h-fit flex-row text-[15px] w-[500px] text-yellow-25'>

 
<div className=' text-center flex flex-col w-[10%] font-inter font-bold'>
<p>1</p>
<p>2</p>
<p>3</p>
<p>4</p>
<p>5</p>
<p>6</p>
<p>7</p>
<p>8</p>
<p>9</p>
<p>10</p>
<p>11</p>
</div>


<div className={`w-[90%] flex flex-col gap-2 font-mono ${codecolour} ` }>
<TypeAnimation 
sequence={ [Codeblock,1000 ,"" ]}
repeat={Infinity}
cursor ={true}
style={ 
  {
    whiteSpace :"pre-line",
    display : 'block'
  }
}
/>
</div>

 </div>

 </div>
    
  )
}

export default CodeBlocks