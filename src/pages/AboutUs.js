import React from 'react'
import Highlitettext from '../components/core/Homepage/Highlitettext'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import foundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import Learninggrid from '../components/core/AboutPage/Learninggrid'
import ContactFromSection from '../components/core/AboutPage/ContactFromSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const AboutUs = () => {
  return (
    <div>

        <section>
            <div className='flex  flex-col items-center justify-center'>
                <header className='text-white  text-3xl  text-center'>
                    Driving innovation in online Education far a 
                    <Highlitettext text={"Brighter future "}></Highlitettext>
                    <p className='text-xl mt-4 text-richblack-50'> studynotion is at the forefront of driving innovation in  online  education we`re passinate
                    about creating   a brighter future by offering cutting-edge  course 
                    leveraging emerging technology and nurturing a vibrant learning community </p>
                </header>

               
               
                <div className=' flex gap-x-3 mx-auto mt-10    '> 
                     
                     <img src={BannerImage1}></img>
                     <img src={ BannerImage2}></img>
                     <img src={BannerImage3}></img>
                </div>
            </div>
        </section>


        <section>
            <div className='text-white text-center  text-lg mt-10'>
                <Quote></Quote>
            </div>
        </section>




        <section className='text-white items-center  flex flex-col items-center justify-center'>

            <div className='flex flex-col items-center   mt-11'>
                <div className='flex  items-center  justify-center w-[80%]   gap-10'>
                    <div className='w-[50%] text-center flex flex-col  gap-[50px]'>

                        <h1>Our founding Story </h1>
                        <p> our e-leaarning platform was born out of a shared vision 
                        and passion for transformming education it all begin with a group of educators ,
                        technologist and life long  learner who recirgnize the need for accessible 
                        flexible and high quality learning opportunity in rapidly evolving 
                        digital word </p>

                        <p>as experience educators ourself we witnessed the limmiting challenges 
                        of traditional educational system we belive that education should be confinrd  to the walls of classrooms or restricted by the geographical boundries wev envisioned
                         a platform that could bridge these gaps and Empower
                        indivisual from all works of life to unlock their full potential </p>
                    </div>


                    <div className='w-[50%]'>
                       
                       <img src={foundingStory}></img>
                    </div>
                </div>


                <div className='w-[80%] flex  gap-[90px] mt-[50px]'>
                    <div className=' items-center text-center'>
                        <h1>Our vision</h1>
                        <p>with this vision  in mind we set out on a journey to create an e-learning 
                        platfrom that would revolutionizing the way people learn our team of dedicaterd
                        experts worked tirelessly to develop a robust and intuitive platfrom
                        that compines cutting-edge technology with engaging content , fosting a dynamic and interactive learning experts </p>
                    </div>

                    <div className='text-center'>
                        <h1>Our Mission</h1>
                        <p>our mission goes beyond just delevering courses online  we wanted 
                        a creating vibrant community of learner where individual can connect 
                        collborate and learn from one another we belive that knowledge thrives 
                        in an enviroment of sharing and dialogue and we foster this spirit of collaboration through 
                        foroms live sessions and networking community </p>
                    </div>
                </div>


            </div>
        </section>

        <Stats></Stats>

    
    <section className="  m-[50px] mt-[100px]">
        <Learninggrid></Learninggrid>
    </section>

    <section>
        <ContactFromSection></ContactFromSection>
    </section>

    <section className='text-white  text-center'>
        <div >
            Review from other section 
        </div>

        <ReviewSlider></ReviewSlider>
    </section>
    <Footer></Footer>
    </div>
  )
}

export default AboutUs