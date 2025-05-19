import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Auth from './Pages/Auth'
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <div className="bg-[url('/bgImage.svg')] bg-cover h-screen overflow-y-auto overflow-x-hidden">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={authUser ? <Navigate to="/" /> : <Auth />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </>
  )
}

export default App