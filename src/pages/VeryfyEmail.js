import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';

import { Link } from 'react-router-dom';

const VeryfyEmail = () => {
    const[otp,setOtp]=useState("");
    const dispatch =useDispatch();
    const {signupData,loading} =useSelector((state)=>state.auth);
     const navigate=useNavigate();

     useEffect(()=>{
        if(!signUp){
            navigate("/signup")
        }
     })

  const handleOnSubmit=(e) =>{
           e.preventDefault();
           const {
            accountType,
            firstName,
            lastName,email,
            password,
            confirmPassword
           } = signupData;
           dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));

  }
    return (
    <div className='text-white'> {
    loading
    ?(<div>loading.........</div>): (<div>
        <h1>very email</h1>
        <p>A verification code is sent to you enter the code below </p>
        <form onSubmit={handleOnSubmit}>
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
             renderSeparator={<span></span>}
            renderInput={(props)=><input {...props}
                className='text-black'
            />}
            >  
            </OTPInput>

            <button type='submit'>verify email</button>
        </form>

<div> 
 
       <div>
                <Link to={"/login"}>
                    <p>Back to login</p>
                </Link>
            </div>
            <div
            onClick={()=>dispatch(sendOtp(signupData.email))}>
                resend it 
            </div>

</div>
    </div>)
    }</div>
  )
}

export default VeryfyEmail