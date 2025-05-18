import React, { useState } from 'react'
import { ChatContainer, RightSideBar, SideBar } from '../Components/Index'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  return (
    <div className='h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 h-full rounded-2xl grid grid-cols-1 relative overflow-hidden ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr] ' : 'grid-cols-2'}`}>
        <SideBar setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSideBar selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default Home