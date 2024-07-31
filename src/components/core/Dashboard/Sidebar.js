import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SiderbarLink from './SiderbarLink'
import { VscSettingsGear } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const{user, loading:profileLoading}=useSelector((state)=>state.profile)
 const {loading:authLoading}= useSelector((state)=>state.auth)
   

 const dispatch =useDispatch();
 const navigate=useNavigate();
const [confirmationModal ,setConfirmationModal]=useState(null)


 if(profileLoading || authLoading){
    return (
        <div>loading .....</div>
    )
}
//console.log(confirmationModal);


//const dispatch =useDispatch();
//const navigate=useNavigate();
//const [confirmationModal,setconfirmationModal]=useState(null);

 

  return (
    <div className='text-white '>
             
             <div className='flex min-w-[230px] flex-col border-r-2 border-richblack-700 h-[clac[100vh-3.5rem]]'>
               
               <div className=' flex flex-col gap-y-10 mt-10 '>
               {
            sidebarLinks.map((data)=>{
                if( data.type && user?.accountType !== data.type) return null
                   
                   return (
                       
                       <SiderbarLink  links={data}  iconeName={data.icon} key={data.id}></SiderbarLink>
            )
            
               })
               
               }</div>


               <div className='mx-auto mt-6 h-[1px] w-10/12    bg-richblack-500'>

               </div>
              

              <div className='flex flex-col  gap-10 mt-10'>
                   
                   <SiderbarLink links={{name :"settings" ,path: "/dashboard/setting"}}
                   iconeName="VscSettingsGear"
                   ></SiderbarLink>

                   <button 
                 
                   onClick={()=>setConfirmationModal({
                    text1:"are you sure",
                    text2 : " you will be logout of account",
                    btn1Text: "Log out",
                    btn2Text :"cancel   ",
                    btn1Handler: ()=>dispatch(logout(navigate)),
                    btn2Handler :()=>setConfirmationModal(null)
                   })

                   
                  }
                   
                   className='text-sm font-medium text-richblack-300'>

                    <div className='flex items-center gap-x-2'>
                    <VscSignOut  className='text-lg text-white text-[22px]'/>
                    <span  className='text-white'> log out </span>
                    </div>
                   </button> 
              </div>


             </div>




             {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}


    </div>
  )
}

export default Sidebar