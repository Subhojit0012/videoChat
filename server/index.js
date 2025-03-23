const express = require('express');
const bodyParser = require("body-parser");
const {Server} = require('socket.io');

const io = new Server()

const app = express();

app.use(bodyParser.json())

const emailSocketMapping = new Map()

io.on('connection', (socket)=> {
    socket.on('join-room', (data)=>{
        const {roomId, emailId} = data;
        console.log("User", emailId, "Room", roomId);
        emailSocketMapping.set(emailId, socket.id);
        socket.broadcast.to(roomId).emit('user-joined', {emailId});
    })
})

app.listen(3000, ()=> console.log("Server running at 3000"))
io.listen(3002)
