import React from "react";
import { useSocket } from '../providers/Socket'

const Home = () => {
    const { socket } = useSocket()
    socket.emit("join-room", { roomId: "1", emailId: "test@gmail.com" })
    return (
        <div className="homepage">
            <div className="input-container">
                <input type="email" placeholder="Enter your email" />
                <input type="text" placeholder="Enter room code" />
                <button>Enter Room</button>
            </div>
        </div>
    )
}

export default Home;