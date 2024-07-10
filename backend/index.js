const express = require("express");
const cors = require("cors");
const mongoose =  require("mongoose");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoute.js");
app.use("/api/auth",userRoute)

mongoose.connect(process.env.MONGO_URL,{

}).then(()=>{
    console.log("DB Connection Successful");
}).catch((error)=>{
    console.log(error.message);
});

const server = app.listen(process.env.PORT||5000,()=>{
    console.log(`Server listening of ${process.env.PORT}`);
});