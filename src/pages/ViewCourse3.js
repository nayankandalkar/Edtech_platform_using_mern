import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Slices/viewCourseSlice';
 
 
import VideoDetails3 from '../components/core/Viewcourse/VideoDetails3';
import VideoDetailsSidebar3 from '../components/core/Viewcourse/VideoDetailsSideBar3';
import CourseReviewModal3 from '../components/core/Viewcourse/CourseReviewModel3';

const ViewCourse3 = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div>
        
        
            <VideoDetailsSidebar3 setReviewModal={setReviewModal} />
            <div>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal3 setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse3
