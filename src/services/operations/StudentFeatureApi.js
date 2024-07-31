import { apiConnector } from "../Apiconnector";
import { studentEndpoints } from "../api";
import { toast } from "react-hot-toast";
import rzpLogo from '../../assets/Logo/rzp_logo.png'
 
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";


const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;
function loadscript(src){
    return new Promise ((resolve)=>{
        const script =document.createElement("script");
        script.src =src;

        script.onload=  ()=>{
            resolve(true);

        }
        script.onerror =()=>{
            resolve(true);
        }
        document.body.appendChild(script);
    })
}



// export async function buyCourse(token ,courses, userDetails ,navigate , dispatch){

//     const toastId = toast.loading("loading....");
//     try {


//          const res =await loadscript("https://checkout.razorpay.com/v1/checkout.js");
//          console.log(res);

//         if(!res){
//             toast.error("Razorpay sdk failed to load ");
//             return
//         }


//         const orderresponse =await apiConnector("POST",COURSE_PAYMENT_API, { courses  },
//     {
//         Authorisation: `Bearer ${token}`
//     });


//     console.log(orderresponse)

//     // if(!orderresponse.data.sucess){
//     //     throw new Error(orderresponse.data.message);

//     // }

//     const options = {
//         key: process.env.RAZORPAY_KEY,
//         currency: orderresponse.data.message.currency,
//         amount: `${orderresponse.data.message.amount}`,
//         order_id:orderresponse.data.message.id,
//         name:"StudyNotion",
//         description: "Thank You for Purchasing the Course",
//         image:rzpLogo,
//         prefill: {
//             name:`${userDetails.firstName}`,
//             email:userDetails.email
//         },
//         handler: function(response) {
//             //send successful wala mail
//             sendPaymentSuccessEmail(response, orderresponse.data.message.amount,token );
//             //verifyPayment
//             verifyPayment({...response, courses}, token, navigate, dispatch);
//         }
//     }

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     paymentObject.on("payment.failed", function(response) {
//         toast.error("oops, payment failed");
//         console.log(response.error);
//     })



//     }catch(e){

//         console.log("payment api  error " ,e);
//         toast.error("could not make payment ");
//     }

//     toast.dismiss(toastId);
// }



export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    AuthoriSation: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response ,amount , token ){
    try{

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            order_id: response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount ,
        },
    {
        Authorization : ` Bearer ${token}`
    })
    }catch(e){

    }
}


 async  function verifyPayment ( bodyData , token , navigate , dispatch ){
      const toastId =toast.loading("verifying toast.........");
      dispatch(setPaymentLoading(true));
      try{
        const response =await apiConnector("POST", COURSE_VERIFY_API, bodyData,{
            
            
                Authorisation : `Bearer ${token}`,
            
        })


        if(!response.status.sucess){
            throw new Error(response.data.message);

        }
        toast.success("paYMENT IS SUCESSFULL  you are added  to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

     
      }
      catch(e){


        console.log("payment verify error");
        toast.error("could not verify payment");

      }
      toast.dismiss(toastId);
      dispatch(setPaymentLoading(true));

 }