import React from "react";
import { useSocket } from "../providers/Socket";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState();
  const [email, setEmail] = useState();

  const handleRoomJoined = useCallback(
    ({ roomId }) => {
      console.log("Room joined", roomId);
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);

    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [socket, handleRoomJoined]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId }, (res) => {
      console.log(res);
    });
  };

  return (
    <div className="homepage">
      <div className="input-container">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Enter room code"
        />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;
