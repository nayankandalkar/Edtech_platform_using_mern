
const mongoose=require("mongoose");

require("dotenv").config();
exports.connect =()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(console.log("databse connection is sucessfull"))
    .catch((e)=>{
        console.log("error in databse connection"+e)
        process.exit(1)
    })
}
