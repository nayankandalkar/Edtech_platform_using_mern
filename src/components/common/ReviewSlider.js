import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/Apiconnector'
import { ratingsEndpoints } from '../../services/api'
import { FaStar } from 'react-icons/fa'

const ReviewSlider = () => {

 const [reviews , setReviews]=useState([]);
 const trancatewords= 15;

 useEffect(()=>{
const fetchAllReviews = async ()=>{
    const response= await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
       console.log("i am ratingv  ",response.data.data)

       const {data}=response;
       if(data?.success){
        setReviews(data?.data);
       }

       console.log(" final review", reviews)
}

fetchAllReviews()
 },[])
    

  return (
    <div> 
    
    <div className=' h-[180px] max-w-maxContent'>
    <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
         
            className='w-[500px] '
            >


            {
                reviews.map((review , index)=>(

                     <div>

                        <SwiperSlide key={index}>
                              
                              <img src={review?.user?.image} alt='image' className='w-9 h-9  rounded-full object-cover'/>
                              
                              <p>{review?.user?.firstName} {review?.user?.lastName}</p>

                                <h1>
                                {
                                  review?.course?.courseName
                                }
                                </h1>

                                <p>
                                {
                                review?.review
                                }</p>
                             
                               
                               <p>{review?.rating.toFixed(1)}</p>
                                  

                              <p>
                                <ReactStars
                                count={5}
                                value={review.rating}
                                
                                edit={false}
                                activeColor="#ffd700"
                                   emptyIcon={<FaStar></FaStar>}
                                   filledIcon={<FaStar></FaStar>}
                                >    </ReactStars>

                                </p>
                        </SwiperSlide>
                     </div>
                ))
            }
        </Swiper>
    </div>
    </div>
  )
}

export default ReviewSlider