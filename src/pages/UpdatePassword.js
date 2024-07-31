
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { VscPass } from "react-icons/vsc";
import { PiPasswordFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { resetYourPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const {loading} =useSelector((state)=>state.auth);
    const[showPassword,setShowPassword]=useState(false);
const[showConfirmedpassword, setShowConfimedPassWord]=useState(false);
 const location= useLocation();

const dispatch =useDispatch();
    const [formdata, setFromData]=useState({
        password: "" ,
        confirmedPassword :""
    })

    const {password,confirmedPassword}=formdata;

    const handleOnChange=(e)=>{
        setFromData(
            (prevData)=>(
                {
                    ...prevData,
                    [e.target.name] :  e.target.value,
                }
            )
        )
    }

    const handleOnSubmit= (e)=>{
        e.preventDefault();
             const token =location.pathname.split("/").at(-1);
            dispatch(resetYourPassword(password,confirmedPassword,token))
    }

  return (
    <div className='text-white'> 
    
    {
        loading ? (<div>loading............</div>)
        :(<div>
            <h1>choose new password </h1>
            <p>Almost done enter your password and you are all set </p>


            <form onSubmit={handleOnSubmit}>


                <label >
                    <p>New password *</p>
                    <input required 
                    type={showPassword ? "text" :"password"}
                    value={password}
                    name='password'
                    onChange={handleOnChange}
                    className='text-black'></input>
                   <span onClick={()=>setShowPassword((prev)=>!prev)}>
                    {
                        showPassword ? <VscPass ></VscPass> : <PiPasswordFill></PiPasswordFill>
                    }
                   </span>
                </label>


                <label >
                    <p>confirmed New password *</p>
                    <input required 
                    type={showConfirmedpassword ? "text" :"password"}
                    value={confirmedPassword}
                    name='confirmedPassword'
                    onChange={handleOnChange}
                    placeholder='confirmed password'
                    className='text-black'></input>
                   <span onClick={()=>setShowConfimedPassWord((prev)=>!prev)}>
                    {
                        showConfirmedpassword ? <VscPass ></VscPass> : <PiPasswordFill></PiPasswordFill>
                    }
                   </span>
                </label>

                <button type='submit'> reset password</button>

                
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

export default UpdatePassword