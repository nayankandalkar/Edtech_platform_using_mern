import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
 
const SiderbarLink = ({links ,iconeName}) => {

    const Icon=Icons[iconeName];
    const location= useLocation();
    const dispatch =useDispatch();



    const matchRoute=(route)=>{
        return matchPath({path:route} ,location.pathname)
    }

    return (
      <div className='flex '>

 
    <div className='   gap-11'>




    <NavLink
    to={links.path}

    
    className= {` relative pc-8 py-2 text-sm 
     ${matchRoute(links.path)? "bg-yellow-100" : "bg-opacity-0"}    ` }

    >
    <span className={
      
      `absolute left-0 -top-1   w-[200px] bg-yellow-400  h-[30px]   z-[1]
    
   ${ matchRoute(links.path) ? "opacity-120" : "opacity-0"}`}>

    </span>

    <div className='flex  items-center gap-x-2'>
    
    <Icon className="text-lg   z-40 " />
    <span className='    z-40'>{links.name}</span>
    </div>
       
    </NavLink>



    
    </div>

    </div>
  )
}

export default SiderbarLink