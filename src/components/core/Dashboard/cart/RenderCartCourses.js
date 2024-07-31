import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'

import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { removeFromCart } from '../../../../Slices/cartSlice';

const RenderCartCourses = () => {
const {cart} =useSelector((state)=>state.cart)
const dispatch =useDispatch()

  return (
    <div> 
      {
        cart.map((course,index)=>(
            <div>

            {
              console.log("iam course",course)
            }
                 <div>
                    <img src={course.thumbNail}  ></img>
                    <div>
                        <p>{course?.nmae}</p>
                        <p>{course?.category?.name}</p>
                          <div>
                            <p>4.87</p>
                          </div>

                          <ReactStars 
                          count={5}
                          size={20}
                          edit={false}
                           activeColor ="#ffd700"
                           emtpyIcon={<GiNinjaStar />}
                           fullIcon={<GiNinjaStar />}
                           ></ReactStars>


                           <span>{course.ratingAndReview.length} Ratings </span>

                    </div>
                 </div>

                 <div>
                      <button onClick={()=>{
                        dispatch(removeFromCart(course._id))
                      }}>

                      <RiDeleteBin4Line />
                      <span>remove</span>
                      </button>
                      <p>Rs {course?.price}</p>
                 </div>

            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses