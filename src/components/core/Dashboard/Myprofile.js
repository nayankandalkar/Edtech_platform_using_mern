import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const Myprofile = () => {
    
    const {user}= useSelector((state)=>state.profile)
    const navigate=useNavigate();

  return (
    <div className='text-white '>
        <h1>My  Profile</h1>

        <div>
            <div>
                <img src={`${user?.image}`}  alt={`{profile-${user.firstName}}`} className=' aspect-square w-[70px] object-cover  rounded-full'></img>
                <div>
                    <p>{user?.firstName + " " +user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>

            <IconBtn
            text="edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}>

            </IconBtn>
        </div>


        <div>
            <div>
                <p>About</p>
                <IconBtn
                text={"edit"}
                onclick={()=>{
                    navigate("/dashboard/setting")
                }}></IconBtn>
            </div>
            <p> {user?.additionalDetail?.about  ?? "write something about yourself"}</p>
        </div>

        <div>
            <div>
                <p>personal Details</p>
                <IconBtn
            text="edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}>

            </IconBtn>
            </div>

            <div>
                <p> first name</p>
                <p>{user?.firstName}</p>
            </div>

            <div>
                <p> email</p>
                <p>{user?.email}</p>
            </div>

            <div>
                <p> first name</p>
                <p>{user?.firstName}</p>
            </div>

            <div>
                <p> last name</p>
                <p>{user?.lastName}</p>
            </div>

            <div>
                <p>  phone number</p>
                <p>{user?.additionalDetail?.contactNumber  ?? "add phone number "}</p>
            </div>


             
            <div>
                <p>   date of birth</p>
                <p>{user?.additionalDetail?.dateOfBirth  ?? " add date of birth"}</p>
            </div>

            
        </div>

        
    </div>
  )
}

export default Myprofile