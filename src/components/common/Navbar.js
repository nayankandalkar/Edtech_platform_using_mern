
import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'

import {NavbarLinks} from '../../data/navbar-links'

import logo from '../../assets/Logo/Logo-Full-Light.png'

import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CiShoppingCart } from "react-icons/ci";
import ProfileDeopDown from '../core/Auth/ProfileDeopDown'
import { apiConnector } from '../../services/Apiconnector'

import { categories } from '../../services/api'
import { IoMdArrowDropdown } from "react-icons/io";


const Navbar = () => {
   
  const location=useLocation()
   
  const {token} =useSelector((state)=> state.auth)
  const {user} =useSelector( (state)=>state.profile)
  const {tokenItem}=useSelector( (state)=> state.cart)


    

   const [subLinks , setSubLinks ]=useState([]);


   const fetchSubLinks =async ()=>{

 
      try
      {
          const result =await apiConnector("GET", categories.CATEGORIES_API);
              setSubLinks(result.data.allCategory);
              console.log(subLinks)
                   
      }catch(e){
        console.log("cannot fetch category"+e)
      }
    

   }

   useEffect( ()=>{
           
     fetchSubLinks()
   },[])



  const matchroute =(route)=>{
    return matchPath({path:route}, location.pathname);
  }

  return (
    <div className='  flex h-14 items-center justify-center  border-b-[1px] border-richblack-700 '>
    
        <div className=' flex  w-[90%]       items-center   justify-between    '>
              
              
              <Link to={"/"}>
                <img src={logo} className=' ' width={160} height={42}></img>
              </Link>


              <nav>
                
                <ul className='flex  gap-x-6 text-richblack-25'>
               
               {  
                
                NavbarLinks.map((links, index)=>{

                  
                 return   <li key={index}>
                        {
                          links.title === "Catalog" ? 
                          (
                            <div className='flex  gap-3 items-center group relative'>
                         <p>{links.title}   </p>   
                         <IoMdArrowDropdown  />


                          <div className='    absolute left-[50%] top-[10%]  flex flex-col
                           translate-x-[-50%] translate-y-[23%]
                           bg-richblack-5  text-richblue-900  opacity-0   transition-all   duration-200 
                              group-hover:opacity-100   w-[250px]  bg-white z-30 rounded-md flex items-center  gap-4 p-5'>
                               
                               <div className='absolute left-[50%] top-0 w-7  translate-x-[70%] translate-y-[-30%] rotate-45  h-5 bg-richblack-5 z-0 '>
                                     
                               </div>

                               {
                                    
                                    subLinks.length ? (
                                      
                                        subLinks.map((subLinks,index)=>(
                                          <Link to={`/catalog/${subLinks.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}  >
                                            
                                          {
                                           <div className='   w-[230px] z-100 flex items-center justify-center border bg-richblack-5 rounded-lg p-2'  key={index}>
                                             {
                                              subLinks.name
                                             }
                                           </div>  
                                          }
                                          </Link>
                                    )
                                      
                                    )) :
                                    (<div></div>)


                                
                               }

                          </div>

                          </div>
                          
                          ) 
                          :(
                            <Link to={links.path}>
                                <p className={` ${matchroute(links.path)?" text-yellow-25":" text-richblack-25"}`}>{links.title}</p>
                            </Link>
                          )
                        }
                    </li>
                 })


               }
                </ul>
              </nav>
                 

                 <div className='flex  gap-x-4  items-center '>
                     {
                      user  && user ?.accounttype  != "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                        <CiShoppingCart />
                           {
                            tokenItem
                           }

                               
                        </Link>
                      )
                     }  


                     {
                      token === null && (
                        <Link to={"login"}>
                        <div className=' text-white border border-richblack-300  bg-richblack-500 p-[8px] px-3 rounded-lg'>
                        login 
                        </div>
                        
                        </Link>
                      )
                     }

                      {
                      token === null && (
                        <Link to={"/signup"}>
                          <div className=' text-white border border-richblack-700 bg-richblack-500  p-[8px] rounded-lg text-richblack-50'>
                              signup
                          </div>
                        </Link>
                      )
                     } 

                     {
                      token !==  null && 
                      <ProfileDeopDown></ProfileDeopDown>
                     }
                 </div>

        </div>
    </div>
  )
}

export default Navbar