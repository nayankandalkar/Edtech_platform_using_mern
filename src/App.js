import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VeryfyEmail from './pages/VeryfyEmail';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Myprofile from './components/core/Dashboard/Myprofile';
import Cart from './components/core/Dashboard/cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';
import AddCourse from './components/core/Dashboard/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catelog from './pages/Catelog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideDetails from './components/core/Viewcourse/VideDetails';
import VideoDetails3 from './components/core/Viewcourse/VideoDetails3';
import EnrolledCourses3 from './components/core/Dashboard/EnrolledCourses3';
import ViewCourse3 from './pages/ViewCourse3';
import Instructor from './components/core/Homepage/Instructor';
import InstructorDash from './components/core/Dashboard/InstructorDashboard/instructor';

function App() {

  const { user } = useSelector((state) => state.profile)
  //console.log( "i am user \n "+user.accountType)
 // console.log(ACCOUNT_TYPE.STUDENT)
 
  return (
 

    <div className=' w-screen min-h-screen  bg-richblack-900 flex flex-col   font-inter '>
    
    <Navbar></Navbar>
    
     <Routes>
        <Route path='/' element={<Home></Home>} />
           
           <Route path='/catalog/:catelogName' element={<Catelog></Catelog>}></Route>

           <Route path='courses/:courseId' element={<CourseDetails></CourseDetails>}></Route>

        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/verify-email' element={<VeryfyEmail></VeryfyEmail>}></Route>
        <Route path='/about' element={<AboutUs></AboutUs>}></Route>
        
        


{/*         
         <Route path='/dashboard/my-profile' element={<Dashboard></Dashboard>}></Route>
             <Route path='*' element={<Error></Error>}></Route>
             '
             <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}></Route>
       
 */}









                
             <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
  

          <Route path="dashboard/my-profile" element={<Myprofile></Myprofile>} />
       
    
         
           
        {/* {
        user?.accountType === ACCOUNT_TYPE.STUDENT &&(
          <>   */}


          <Route path='dashboard/cart' element={<Cart></Cart>}></Route>
          
          
          {/* <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} /> */}

          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />


{/*         
           </>
        )
       }   */}



{/*        
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      } */}
{
  user?.accountType== ACCOUNT_TYPE.INSTRUCTOR &&(
    <>
      <Route path='dashboard/add-course' element={<AddCourse></AddCourse>}></Route>
      <Route path='/dashboard/instructor'  element={<InstructorDash></InstructorDash>}></Route>
      <Route path='/dashboard/my-courses' element= {<MyCourses></MyCourses>}></Route>
      <Route path='/dashboard/edit-course/:courseId' element={<EditCourse></EditCourse>}></Route>
    </>
  )
}
          


    </Route>



<Route element={
  <PrivateRoute>
    <ViewCourse3></ViewCourse3>
  </PrivateRoute>
}>
{
  user?.accountType === "Student" && (
    <>
  
  
       {/* <Route path='view-course/:courseId/section/:sectionId/sub-section/:subsectionId' element={<VideDetails></VideDetails>} /> */}

       <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails3></VideoDetails3>} />
    </>
  )
}

</Route>


    <Route path="*" element={<Error />} />

 




      </Routes>
    </div>
  );
}

export default App;
