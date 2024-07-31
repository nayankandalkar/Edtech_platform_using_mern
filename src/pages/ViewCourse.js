import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Slices/viewCourseSlice';
import VideoDetailsSideBar from '../components/core/Viewcourse/VideoDetailsSideBar';
import CourseReviewModal from '../components/core/Viewcourse/CourseReviewModal';
import VideoDetailsSidebar3 from '../components/core/Viewcourse/VideoDetailsSideBar3';
import CourseReviewModal3 from '../components/core/Viewcourse/CourseReviewModel3';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] =useState(false);
        const {courseId} =useParams();
        const {token} =useSelector((state)=>state.auth);
        const dispatch =useDispatch();
        
        useEffect(()=>{
        const setCourseSpecificDetails =async ()=>{
            const CourseData=await getFullDetailsOfCourse(courseId, token);
             dispatch(setCourseSectionData(CourseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(CourseData.completedVideos))
            let lectures =0;
            CourseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures +=sec.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));

        } 
        
        setCourseSpecificDetails();
        },[])


  return (
    <div>
     
     
           {/* <VideoDetailsSideBar setReviewModal={setReviewModal}></VideoDetailsSideBar>  */}

           <VideoDetailsSidebar3 setReviewModal={setReviewModal} />

        <div>
            <Outlet></Outlet>
        </div>

        

        {reviewModal && (<CourseReviewModal3 setReviewModal={setReviewModal}></CourseReviewModal3>)}
    </div>
  )
}

export default ViewCourse