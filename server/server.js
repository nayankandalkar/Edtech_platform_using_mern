
const express=require("express");
const { connect } = require("./config/databse");
const { cloudinaryconnect } = require("./config/cloudnary");
const router = require("./routes/route");
//const { route } = require("./routes/route");

const cors = require("cors")
const app=express();

app.use(express.json());



const fileupload= require("express-fileupload");

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
 }))
 
 var cookieParser =require('cookie-parser');
 app.use(cookieParser());



 
app.use(
    cors({
      origin :"http://localhost:3000",
      credentials : true
    })
  );

connect();
cloudinaryconnect();



app.use("/api/v1",router)
app.listen(4000,()=>{
    console.log("server is started sucessfully ");
})