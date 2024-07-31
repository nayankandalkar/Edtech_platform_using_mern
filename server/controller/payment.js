 
const {instance} =require("../config/razorpay");
const Course =require("../models/course");
const User =require("../models/User");

const { default: mongoose } = require("mongoose");
const mailSender =require("../utils/nodemailer");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const courseProgrss = require("../models/courseProgrss");





// exports.capturePayment =async(req,res)=>{
//     const {courses} =req.body;

//     const userId =req.user.id;



//     if(courses.length ===0 ){
//         return res.json({
//             sucess : false,
//             message : "please provide course id"
//         })
//     }

//     let totalAmount =0;
//     let course;
//     try{

//         course=await Course.findById(Course.);

//         // if(!course){
//         //     return res.status(200).json({
//         //         sucess :false,
//         //         message :"could not found the course"
//         //     })
//         // }

//         //     const uid =new mongoose.Types.ObjectId(userId);

//         //     if(course.studentEnrolled.includes(uid)){
//         //         return res.status(200).json({
//         //             sucess: false,
//         //             message : "student is alreadly enrolled "
//         //         })
                  
//         //     }

//         //     totalAmount =course.price

        
//     }catch(e){
//         console.log(e);
          
//         res.status(500).json({
//             sucess : false,
//             message : "something went wrong whilw creating  the payment"
//         })
//     }




// //     const options ={
// //         amount : totalAmount * 100,
// //         currency  : "INR",
// //         receipt : Math.random(Date.now()).toString()
// //    }

// //     try{
// //         const paymentResponse =await instance.orders.create(options);
// //         res.json({
// //             sucess :true,
// //             message : paymentResponse
// //         })
// //     }catch (e){
// //         console.log(e);
// //         res.status(500).json({
// //             sucess : false,
// //             message : " could not initiate order"
// //         })
// //     }

     
// res.json({
//                 sucess :true,
//     //             message : paymentResponse
//          })


// }




exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
            console.log("iam course",course_id.courseId)
            console.log(course_id)
           
             course = await Course.findById(course_id.courseId);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

             totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }


    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{

        console.log(options)
         const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
 

}




exports.verifyPayments =async (req, res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id =req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses= req.body?.courses;
    const userId =req.user.id;

    if(!razorpay_payment_id || !razorpay_signature || !courses  || !userId){
        return res.status(200).json({
            sucess : false,
            message : "payment failed"
        })
    }

    let body =razorpay_order_id + "|" +razorpay_payment_id;
    const expectedSignature =crypto 
    .create("sha256", process.env.RAZORPAY_SECRETE)
    .update(body.toString)
    .digest("hex")


    if(expectedSignature === razorpay_signature){

        await enrolledStudents(courses,userId,res);

        return res.status(200).json({
         sucess  : true,
         message : "payment verified"
        })
    }
    res.status(200).json({sucess :false, message : "payment failed"})
}



const enrolledStudents = async (courses, userId,res)=>{
          
     if(!courses || !userId){
        return res.status(400).json({
            sucess: false,
            message : "please provide data for courses and userId"
        })
     }


     for (const courseId of courses){
          try{
            

        const enrolledCourse =await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new: true}
        )
    

     if(!enrolledCourse){
        return res.status(500).json({
            sucess : true ,
            message : "course not found"

        })
     }

     const enrolledStudents = await User.findByIdUpdate(userId,
    {
        $push: {
            courses : courseId,
        }
    }, {new: true});


    const emailResponse =await mailSender(
        enrolledStudents.email,
        `sucessfullyn enrolled into ${enrolledCourse.courseName}`,
          
        courseEnrollmentEmail(enrolledCourse.courseName ,`${enrolledStudents.firstName}`)
           
    )
    console.log("email send sucessfully " , emailResponse.response);



          }catch(e){
                   
            console.log(e);
            return res.status(500).json({
                sucess : false ,
                message : e.message
            })
          }

}


}

exports.sendPaymentSucessEmail =async (req, res)=>{
    const {orderId, paymentId , amount }=req.body;
    const userId=req.user.id;
    if(!orderId || !paymentId || amount || !userId){
         return res.status(400).json({
            sucess : false ,
            message : "please provide all field"
         })
    }
    try {
        const enrolledStudents =await User.findByIdUpdate(userId);
        await mailSender(
            enrolledStudents.email,
            'payment Received',
            paymentSuccessEmail(`${enrolledStudents.firstName}`,
        amount/100,
    orderId,
paymentId)
        )

    }catch(e){


         console.log("error in mail sending " , e);
         return res.status(500).json({
            sucess: false ,
            message : "could not send"
         })
    }
}




exports.enrollStudentsAdmin = async( req,res) => {


    const courses=req.body.courses;
    const userId=req.body.userId;
    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }




        const courseProgress12= await courseProgrss.create({
            courseId:courseId,
            userId: userId,
            completedVideos: []
        })


        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgrss: courseProgress12._id
            }},{new:true})
            
        ///bachhe ko mail send kardo
    //     const emailResponse = await mailSender(
    //         enrollStudents.email,
    //         `Successfully Enrolled into ${enrolledCourse.courseName}`,
    //         courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
    //     )    
    // console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    res.status(200).json({success:true,message:" ok sucess ",courses});

}








// exports.capturePayment = async (req,res)=>{

//     try{

//     const {courseId } =req.body;

//     const userId=req.user.id;
//     if(!courseId || !userId){
//         return res.status(400).json({
//             sucess : false ,
//             message : "please enter whole data"
//         })

//         let course;

//         try{

//             course =await Course.findById(courseId) ;


//             if (!course) {
//                 return res.status(400).json({
//                     sucess : false,
//                     message : "could not found the data"
//                 })
//             }

//             const uid =new mongoose.Types.ObjectId(userId);

//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     sucess : false,
//                     message : "student is alreadly enrolled "
//                 })
//             }


//         }catch(e){
//             console.log("error has been occourred" +e);
//             return res.status(500).json({
//                 sucess : false,
//                 message : "something went wrong"
//             })             


//         }

// const amount =course.price;
// const currency ="INR";

// const option ={
//     amount :amount *100,
//     currency,
//     receipt : Math.random(Date.now()).toString(),
//     notes : {
//         courseId :courseId,
//         userId
//     }
// }


// try {

//    const paymentResponse =await instance.orders.create(option);
//    console.log(paymentResponse);

//    res.status(200).json({
//     sucess :true,
//     message : "course buy sucessfully",
//     courseName :course.courseName,
//     courseDescription: course.courseDescription,
//     thumbNail :course.thumbNail,
//     orderId : paymentResponse.id,
//     currency : paymentResponse.currency,
//     amount :paymentResponse.amount
//    })

// }catch(e){
//     console.log(e)
//     res.status(500).json({
//         sucess :false,
//         message : "could not initiate order"
//     })
// }
        


//     }
//     }catch(e){
//         console.log("error has been occourred" +e);
//         return res.status(500).json({
//             sucess : false,
//             message : "something went wrong"
//         })
//     }
// }



// exports.varifysignature =async (req,res)=>{
//     const webhookSecret ="12345678";
//     const signatre =req.headers("x-razorpay-signature");
    
//     const shasum=crypto.createHmac("sha256",webhookSecret);
//            shasum.update(JSON.stringify(req.body));
//      const digest =shasum.digest("hex");
     
//      if(signatre == digest){
//         console.log("payment is authorize");
    
//         const {courseId,userId}=  req.body.payload.payment.entity.notesl;
//         try{

//             const enrolledCourse =await Course.findOneAndUpdate({_id :courseId }, {
//                 $push : {
//                     studentEnrolled : userId
//                 }
//             },{new : true})


//             if(!enrolledCourse){
//                  return res.status(400).json({
//                     sucess : false,
//                     message : "course not found "
//                  })
//             }

//             console.log(enrolledCourse);



//             const enrollStudent =await User.findOneAndUpdate({_id : userId} ,{
//                 $push : {
//                     courses: courseId 
//                 }
//             },{new :true})


//             const emilresponse= await mailSender(
//                 enrollStudent.email,
//                 "congratulation you are enrolled",
//                 "congrats"
//             )
//             console.log(emilresponse);
//             res.status (200).json({
//                 sucess :true,
//                 message : "email has been sent sucessfully and course is created"
//             })

//         }catch(e){
//             console.log(e)
//         }
    
//     }


// }

