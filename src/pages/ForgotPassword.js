import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken, getPasswordResetToken1 } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailsent ,setEmailSent]=useState(false);
    const[email,setEmail]=useState("")
    const dispatch =useDispatch();


     const {loading} =useSelector((state)=>state.auth);
     const handleonSubmit =(e)=>{
        e.preventDefault();

 console.log("ok ")
       dispatch(getPasswordResetToken1(email, setEmailSent))
     }
  return (
    <div className='text-white  flex items-center  justify-center'> 
    
    {
         loading ? (<div> loading....</div>) : (<div>
            <h1>
                {
                    !emailsent ? "Reset your Password " : "Check Ypur Email"
                }
            </h1>
            <p>
                {
                    !emailsent ?
                     "have no  fear we shall email you instruction to reset your password if you dont have acess to your email we can try account recovery "
                      :`we have sent email to ${email}`
                }
            </p>
            <form onSubmit={handleonSubmit}>
                {
                    !emailsent && (
                        <label>
                            <p>Email Address</p>
                            <input 
                            required
                            type='email'
                            name='email'
                            onChange={(e)=>setEmail(e.target.value)}
                                placeholder='enter your email Address '
                                className='text-black'
                            ></input>
                        </label>
                    )
                }

                <button  type='submit'>
                    {
                        !emailsent ? "reset Password " : "Resend password "
                    }
                </button>
            </form>

            <div>
                <Link to={"/login"}>
                    <p>Back to login</p>
                </Link>
            </div>
         </div>)
    }
    </div>
  )
}

export default ForgotPassword