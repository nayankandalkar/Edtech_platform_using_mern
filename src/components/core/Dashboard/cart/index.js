import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

  const {total, totalItems} = useSelector((state)=>state.cart);



  return (
    <div className='text-white'> 
      <h1> Yours Cart </h1> 
 

 
    <p> {totalItems} Courses in cart </p>
    
    {
      total >0
      ?
      (
        <div>
          <RenderCartCourses></RenderCartCourses>
          <RenderTotalAmount></RenderTotalAmount>
        </div>
      ):
      (
        <div>
          your cart is empty
        </div>
      )
    } 

 


    
    </div>
  )
}

export default Cart