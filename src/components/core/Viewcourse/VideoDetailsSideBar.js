import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus ,setActiveStatus] =useState("");
    const [videoBarActive, setyVideoBarActive] =useState("");
    const location =useLocation();
    const navigate =useNavigate();
    const {sectionId ,subsectionId}= useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures 
    }= useSelector((state)=>state.viewCourse);


    useEffect(()=>{
        const setActiveFlags= ()=>{
            if(!courseSectionData.length){
                return
           }
           const currentSectionIndex =courseSectionData.findIndex( (data)=> data._id === sectionId);

           const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subsectionId
        )


        console.log(sectionId, subsectionId);
          
           const activeSubSectionId =courseSectionData[currentSectionIndex]?.subsection?.[currentSubSectionIndex]?._id;
      
      
       setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
       setyVideoBarActive(activeSubSectionId)
        }


        setActiveFlags();
    }, [courseSectionData, courseEntireData,location.pathname])



  return (
    <div> 
    
          {/* <div className=' text-white'>
            <div>
                <div
                onClick={()=>navigate("/dashboard/enrolled-courses")}>
                       Back 
                </div>

                <div>
                    <IconBtn
                    text={"Add review "}
                    onclick={()=>setReviewModal(true)}>

                    </IconBtn>
                </div>

                <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length } / {totalNoOfLectures}</p>
                </div>


            </div>


            <div>
                {
                    courseSectionData.map((course, index)=>{
                        <div 
                        onClick={()=>setActiveStatus(course?._id)}
                        key={index}>
                            

                            <div>
                                 <div>
                                    {course?.sectionName}

                                 </div>

                            </div>
                         

                         <div>
                            {
                                activeStatus === course?._id  && (
                                    <div>
                                        {
                                            course.subsection.map((topic,index)=>(
                                                <div className={`flex gap-3 p-7 ${
                                                videoBarActive === topic._id ?
                                                 " bg-yellow-200  text-richblack-900" : " bg-richblack-900 text-white"
                                                }`}
                                                
                                                key={index}
                                                
                                                onClick={()=>{
                                                    navigate(
                                                        `/view-course/${courseEntireData._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )

                                                    setyVideoBarActive(topic?._id)
                                                }}
                                                 
                                                >
                                                    <input 
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)} />


                                                    <span>
                                                        {topic.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                         </div>

                        </div>
                    })
                }
            </div>
         </div>  */}
    
    </div>
  )
}

export default VideoDetailsSideBar