import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course,height}) => {

  const [averagereviewCount,setAverageReviewCount]=useState(0);
  useEffect(()=>{
    const count =GetAvgRating(course.ratingAndReview);
    setAverageReviewCount(count)
  })

  return (
    <div className='text-white  '> 
    
    
    <Link to={`/courses/${course._id}`}>
       <div>
           <div>
            <img src={course?.thumbNail} className={`${height} w-full rounded-xl`}></img>
           </div>
           <div>
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName}</p>
            <div className='flex gap-x-3'>
              <span>{averagereviewCount } </span>
              <RatingStars Review_Count={averagereviewCount} ></RatingStars>
              <span>{course?.ratingAndReview?.length}</span>
              <span></span>
            </div>
            <p>{course?.price}</p>
           </div>
       </div>
    </Link>
    </div>
  )
}

export default Course_Card