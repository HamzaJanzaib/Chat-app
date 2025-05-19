import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Auth from './Pages/Auth'

const App = () => {
  return (
    <>
      <div className="bg-[url('/bgImage.svg')] bg-cover  h-screen overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

export default App