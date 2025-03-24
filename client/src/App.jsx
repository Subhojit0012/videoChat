import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { SocketProvider } from './providers/Socket'

function App() {

  return (
    <div>
      <SocketProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:roomId' element={<h1>Hello</h1>}/>
        </Routes>
      </SocketProvider>
    </div>
  )
}

export default App
