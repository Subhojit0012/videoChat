import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/Room";
import { SocketProvider } from "./providers/Socket";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <div>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
