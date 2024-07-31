import React from 'react'
import Logo1  from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2  from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3  from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4  from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../../assets/Images/TimelineImage.png'

const TimeLineData=[
{
    Logo:Logo1,
    heading : "leadership",
    subheading:"i am sub heading ",
    Description :"fully commmitted to sucessfull company"
},
{
    Logo:Logo2,
    heading : "leadership",
    subheading:"i am sub heading ",
    Description :"fully commmitted to sucessfull company"
},
{
    Logo:Logo3,
    heading : "leadership",
    subheading:"i am sub heading ",
    Description :"fully commmitted to sucessfull company"
},{
    Logo:Logo4,
    heading : "leadership",
    subheading:"i am sub heading ",
    Description :"fully commmitted to sucessfull company"
}
]


const TimeLine = () => {
  return (
    <div>
    
    <div className='flex flex-row items-center gap-[50px] mt-[50px]  '>



<div className='w[50%] flex flex-col gap-5'>

{
    TimeLineData.map((elements, index)=>{
        return (
           <div className='flex flex-row gap-6' key={index}>
                      
            <div  className='w-[45px] h-[50px] bg-white flex items-center'>
               
               <img src={elements.Logo}/>
            </div>

            <div>
                <h2 className='font-semibold text-[18px]'>{elements.heading}</h2>
                <p>{elements.subheading}</p>
            </div>
           </div> 
        )
    })
}
</div>


<div className='relative shdow shadow-blue-200    '>
<img src={timelineimage} className=' shadow-white  h-fit'></img>

<div className='absolute  left-[50%] translate-x-[-40%] translate-y-[-50%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-10   items-center justify-center  px-10'>




<div className='flex gap-5 items-center border-r  border-caribbeangreen-300 pr-7'>
    <h1>10</h1>
    <h1 className='  text-caribbeangreen-300'>year of experience</h1>
</div>



<div className='flex gap-5 items-center px-7'>
      <h1>20</h1>
      <h1 className='  text-caribbeangreen-300'>year of experience</h1>
</div>


</div>
</div>
    </div >
    
    </div>
  )
}

export default TimeLine