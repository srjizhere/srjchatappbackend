const express = require('express');
const colors = require('colors');
const {chats} = require('./data/data')
require('dotenv').config()
const connectDB = require('./config/db');
connectDB()
const app = express()
app.use(express.json())
const userRoutes = require('./Routs/userRouts');
const chatRoutes = require('./Routs/chat.Routes');
const messageRoutes = require('./Routs/messageRoutes');
const {notFound,errHandler} = require('./middelware/error.middelware');
const { Socket } = require('socket.io');





app.get('/',(req,res)=>{
    res.send("API is running Successfully")
});

app.use("/api/user",userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound)
app.use(errHandler)

const server  = app.listen(process.env.port,()=>{ 
    console.log(`server running on port ${process.env.port}` .yellow.bold)

})

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
})
io.on("connection",(socket)=>{
console.log(`connected to socket.io`);

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected")
    })
    socket.on('joinChat',(room)=>{
        socket.join(room)
        console.log("user joined room  " + room);
    })
    socket.on("typing",(room)=>socket.in(room).emit('typing'));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))





    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id==newMessageRecieved._id) return;

            socket.in(user._id).emit("message recieved",newMessageRecieved)
        });
    });
    socket.off("setup",()=>{
        console.log('USER DISCONNECTED');
        socket.leave(userData._id)
    })
});

