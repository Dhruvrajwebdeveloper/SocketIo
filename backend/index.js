const express = require("express");
const cors = require("cors");
const mongoose =  require("mongoose");
const socket = require("socket.io");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoute.js");
app.use("/api/auth",userRoute)

const messageRoute = require("./routes/messagesRoute.js");
app.use("/api/messages",messageRoute);

mongoose.connect(process.env.MONGO_URL,{

}).then(()=>{
    console.log("DB Connection Successful");
}).catch((error)=>{
    console.log(error.message);
});

const server = app.listen(process.env.PORT||5000,()=>{
    console.log(`Server listening of ${process.env.PORT}`);
});

const io = socket(server,{
    cors:{
        origin:["http://localhost:3000"],
        credentials:true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    })
})