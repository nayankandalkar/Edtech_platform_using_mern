import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Myprofile from '../components/core/Dashboard/Myprofile';

const Dashboard = () => {

    const {loading :authLoading}=useSelector((state)=>state.auth);
    const {loading :profileLoading}=useSelector((state)=>state.profile);

    if(profileLoading || authLoading){
        return (
            <div>loading .....</div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
       <Sidebar></Sidebar>

       <div className='h-[clac(100vh-3.5rem)] overflow-auto   m-10'>
           <div>
            <Outlet></Outlet>
           </div>
       </div>
{/* 
    <Myprofile></Myprofile> */}


    </div>
  )
}

export default Dashboard