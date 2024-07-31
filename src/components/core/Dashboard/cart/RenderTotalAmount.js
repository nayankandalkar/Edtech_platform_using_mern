import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {
    const {total,cart}=useSelector((state)=>state.cart);

    const handlebyCourse=()=>{
           const course=cart.map((course)=>course._id)
           console.log("bought those courses",course)
    }
  return (
    <div>
        <p>Total</p>
        <p>{total}</p>

        <IconBtn
        
        text="buy now"
        onclick={handlebyCourse}
        customClass={"w-full justify-center" }></IconBtn>
    </div>
  )
}

export default RenderTotalAmount