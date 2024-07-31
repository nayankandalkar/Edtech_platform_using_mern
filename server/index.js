
// const express=require("express");
// const { connect } = require("./config/databse");
// //const router = require("./routes/route");
// const {cloudinaryconnect}=require("./config/cloudnary")
// const router = require("./routes/route");
// const cookieParser =require("cookie-parser");

// const app = express();
// app.use(cookieParser);
// app.use(express.json());


// const fileupload= require("express-fileupload");
// app.use(fileupload({
//    useTempFiles : true,
//    tempFileDir : '/tmp/'
// }))





// // app.use(
// //   cors({
// //     origin :"http://localhost:3000",
// //     credentials : true
// //   })
// // )


// connect()
//  cloudinaryconnect();

 
// app.use("/api/v1",router);

 

 

//   const port =process.env.PORT;

// app.listen(port, ()=>{
//     console.log("server is started............" +port)
// })

 




































 const express =require("express");
 const app =express();

 const route =require("./routes/route");


 require("dotenv").config();

 const datbase =require("./config/databse");
var cookieParser =require('cookie-parser');
const cors = require("cors")
const port =process.env.PORT;
const {cloudinaryconnect}=require("./config/cloudnary")
//const fileupload=require("express-fileupload")

datbase.connect();
app.use(express.json());


const fileupload= require("express-fileupload");

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
 }))



app.use(cookieParser());

 




app.use(
  cors({
    origin :"http://localhost:3000",
    credentials : true
  })
)



// app.use(fileupload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }))




cloudinaryconnect()

app.use("/api/v1",route );

app.listen( port,()=>{
  console.log(" server is started at " +port)
})

 
app.get("/",(req,res)=>{
  res.send(" hi 123 ")
})
























// const express=require("express");
// const { connect } = require("./config/databse");
// const app = express();
// const {cloudinaryconnect}=require("./config/cloudnary");

// const  router =require("./routes/route")



// require("dotenv").config();

// const port =process.env.PORT


// app.use(express.json());

// const fileupload= require("express-fileupload");

// app.use(fileupload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
//  }))


// connect();
// cloudinaryconnect();


// app.use("/api/v1",router);


// app.listen( port, ()=>{
//   console.log("server is staerted at port " +port)
// })




