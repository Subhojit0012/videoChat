const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server({
  cors: true,
});

const app = express();

app.use(bodyParser.json());

const emailSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("New connection");
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User:", emailId, "Room ID:", roomId);
    emailSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const socketId = emailSocketMapping.get(emailId);
    const fromEmail = socketToEmailMapping.get(socket.id);
    socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;

    const socketId = emailSocketMapping.get(emailId);
    socket.to(socketId).emit("call-accepted", { ans });
  });
});

app.listen(3000, () => console.log("Server running at 3000"));
io.listen(3002);
