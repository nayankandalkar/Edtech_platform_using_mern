// import {combineReducers} from '@redux.js/toolkit'

 

import { combineReducers } from "@reduxjs/toolkit"
  import authrReducer from "../Slices/authSlice"
import profilereducer from '../Slices/profileSlice'
import cartReducer from '../Slices/cartSlice'

import courseReducer from '../Slices/courseSlice'
import viewCourseSlice from "../Slices/viewCourseSlice"
 const rootReducer = combineReducers({
    auth : authrReducer,
    profile : profilereducer,
     cart : cartReducer,
     course:courseReducer,
     
     viewCourse:viewCourseSlice
 })

 export default rootReducer