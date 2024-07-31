import React from 'react'
import Highlitettext from '../Homepage/Highlitettext'
import Button from '../Homepage/Button'

const Learninggrid = () => {

    const LearnigGridArray =[
        {
            order :-1,
            heading : "world class learning for ",
            highliteText :"Anyone ,Anywhere",
            description : 
            "studynotion parteners with more than 275+  leading universities  and companies to bring flexible  AFFORDABLE JOB-RELEVANT LEARNING TO INDIVIDUAL and organisations worldwide  ",
            BtnText: "Lern More",
            BtnLink : "/"
        },
        {
            order :1,
            heading : " curriculum based industry  ",
            
            description : 
            "savve time and money Belajor curriculam is made to be easier to understand and in like with industry need  "
        },
        {
            order :2,
            heading : "  our learning method ",
            
            description : 
                "studynotion parteners with more than 275+  leading universities  and companies to bring"    
        }, 

        {
            order :3,
            heading : "  Certification", 
            description : 
                "studynotion parteners with more than 275+  leading universities  and companies to bring"    
        }, 
        {
            order :4,
            heading : "Rating auto-Grading",
            
            description : 
                "studynotion parteners with more than 275+  leading universities  and companies to bring"    
        }, 

        {
            order :5,
            heading : " Ready to work",
            
            description : 
                "studynotion parteners with more than 275+  leading universities  and companies to bring"    
        }, 

    ]

  return (
    <div className='grid mx-auto  grid-cols-4  mb-10 '> 
    {
        LearnigGridArray.map((card,index)=>(
              
              <div key={index}  className={` ${index === 0 &&  "col-span-2"}
              
              ${
                card.order %2 === 1 ? "bg-richblack-700": " bg-richblack-800"
              }
              
              ${
                card.order ==3 && "  col-start-2" 
              }
               text-white
                h-[250px]
                 items-center
                  justify-center
                  text-center
                    
                   mx-auto 
                   
              `}
              
              >
            

{
    card.order <0 ? (
        <div className='flex flex-col justify-center items-center   h-[100%]' >
             <div className='text-4xl font-semibold  '>
                {card.heading} 
                <Highlitettext text={card.highliteText}></Highlitettext>
                
             </div>
             <p>{card.description}</p>

             <Button  active={true}  linkto={card.BtnLink}   >
                {card.BtnText}
             </Button>
        </div>
    )
    :(<div className='flex flex-col items-center justify-center   h-[100%]'>
        <h1 className='text-4xl '>{card.heading}</h1>
        <p>
            {card.description}
        </p>
    </div>)
}

              </div>
        ))
    }

    </div>
  )
}

export default Learninggrid