import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../Slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';

const VideDetails = () => {
  


  const {courseId,sectionId,subSectionId} =useParams();
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const playRef=useRef();
  const location=useLocation();
  const { token }=useSelector((state)=>state.auth);
  const {courseSectionData,courseEntireData, completedLectures}=useSelector((state)=>state.viewCourse);
  const [videoData,setVideoData]=useState([]);

  const [videoEnded, setVideoEnded]=useState(false);

  const [loading,setLoading]=useState(false);


  useEffect(()=>{

    const setVideoSpecificDetails= async()=>{
             if(!courseSectionData.length){
                    return
             }
             console.log(courseSectionData);

             if(!courseId && !sectionId && !subSectionId){
              navigate("/dashboard/enrolled-courses")
             }else{
              const filteredData = courseSectionData.filter(
                (course) => course._id === sectionId
            )


              // const filteredVideoData= filteredData?.[0]?.subsection.filter(
              //   (data)=>data._id  === subSectionId
              // )
                   

              const filteredVideoData = filteredData?.[0].subSection.filter(
                (data) => data._id === subSectionId
            )

              setVideoData(filteredVideoData[0]);
              setVideoEnded(false);

             }
    }

    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])


  const isFirstVideo =()=>{

    const currentSectionIndex =courseSectionData.findIndex(
      (data)=>data._id  === sectionId
    )

    const currentSubSectionIndex =courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex=== 0)
       {
        return true
       }else{
        return false
       }

  }

  const isLastVideo =()=>{
    const currentSectionIndex =courseSectionData.findIndex(
      (data)=>data._id  === sectionId
    )


    const noOfSubSections= courseSectionData[currentSectionIndex].subsection.length;
    const currentSubSectionIndex =courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length -1 && currentSubSectionIndex === noOfSubSections -1){
      return true
    }else{
      return false
    }

  }

  const goToNextVideo =()=>{
    const currentSectionIndex =courseSectionData.findIndex(
      (data)=>data._id  === sectionId
    )


    const noOfSubSections= courseSectionData[currentSectionIndex].subsection.length;
    const currentSubSectionIndex =courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )


    if(currentSubSectionIndex !== noOfSubSections-1 ){
      const nesxtSubSection = courseSectionData[currentSectionIndex].subsection[currentSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nesxtSubSection}`)
    }else{
      const nextSectionId =courseSectionData[currentSectionIndex + 1 ];
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subsection[0]._id;
      navigate(`view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)

    }
  }

  const goToPrevVideo =()=>{

    const currentSectionIndex =courseSectionData.findIndex(
      (data)=>data._id  === sectionId
    )


    const noOfSubSections= courseSectionData[currentSectionIndex].subsection.length;
    const currentSubSectionIndex =courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )


    if(currentSubSectionIndex  !==0  ){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subsection[currentSectionIndex - 1 ];

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }else{

      const prevSectionId =courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subsection.length  
      const prevSubSectionId =courseSectionData[currentSectionIndex - 1].subsection[prevSubSectionLength - 1]._id
       navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)   
    }
  }
  
  const handleLectureCompletion =async()=>{

    setLoading(true);

    const res =await markLectureAsComplete({courseId:courseId , subSectionId :subSectionId}, token)

    if(res){
      dispatch(updateCompletedLectures(sectionId))
    }
    setLoading(false);
  }



  return (
    <div> 
    {
      !videoData ? (
        <div>
          No data found
        </div>
      ) : (
              <div>
                      
                      <Player
                       ref ={playRef}
                        aspectRatio ="16:9"
                        playsInline
                        onEnded={()=>setVideoEnded(true)}
                        src={videoData?.videourl}>
                         <AiFillPlayCircle ></AiFillPlayCircle>
                             
                             {
                              videoEnded && (
                                <div>
                                  {
                                    !completedLectures.includes(subSectionId) && (
                                      <IconBtn
                                      disabled={loading}
                                      onclick={()=>handleLectureCompletion}
                                        text={!loading ?"mark as completed " : "loading...."}
                                      ></IconBtn>
                                    )
                                  }



                                  
                                    <IconBtn
                                    disabled={loading}
                                    onclick={()=>{
                                      if(playRef?.current){
                                        playRef.current.seek(0);
                                        setVideoEnded(false)
                                      }
                                    }}></IconBtn>
                                  

                                <div>
                                  {
                                    !isFirstVideo() && (
                                      <button  disabled={loading}  onclick={goToPrevVideo} >
                                        prev
                                      </button>
                                    )
                                  }

                                     {
                                      !isLastVideo() && (
                                        <button  disabled={loading}  onclick={goToNextVideo} >
                                          next
                                        </button>
                                      )
                                     }


                                </div>


                                </div>
                              )
                             }
                      
                      </Player>
              </div>
      )
    }

    <h1>
      {
        videoData?.title
      }
    </h1>
    <p>{
        videoData?.description
    }</p>
         
    </div>

   
  )
}

export default VideDetails