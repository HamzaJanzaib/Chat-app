import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
// import Chat from './Pages/Chat'

const App = () => {
  return (
    <>
      <div className="bg-[url('/bgImage.svg')] bg-cover  h-screen overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App