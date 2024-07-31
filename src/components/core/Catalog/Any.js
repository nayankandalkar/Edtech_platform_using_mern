import React, { useEffect } from 'react'
import {Swiper ,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import  Course_Card from './Course_Card'

import { Pagination } from 'swiper/modules';
export const Any = ({courses}) => {
    useEffect(()=>{
        
        console.log("uish")
        console.log(courses)
    },[])
  return (
    <div>

       {
        courses?.length ? (<div > 
           <Swiper
           slidesPerView={1}
           loop={true}
           spaceBetween={25}
           pagination={true}
           modules={[Pagination]}
            >
            
            {
                courses.map((course,index)=>(
                    <SwiperSlide kay={index}
                    >
                        <Course_Card course={course} height={'h-[250px]'}></Course_Card>
                    </SwiperSlide>
                ))
            }
           </Swiper>
        
        </div>):(<p>Nop course found</p>)
       }
 

    </div>
  )
}
