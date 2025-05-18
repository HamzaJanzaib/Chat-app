import React, { useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../../public'
import { formatTime } from '../Lib/Utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(messagesDummyData);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        senderId: selectedUser._id,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header */}
      <div className='sticky top-0 flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="user profile" className='w-10 aspect-[1/1] rounded-full' />
        <p className=' flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser?.fullName || "User"}
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img src={assets.arrow_icon} alt="arrow icon" className='md:hidden max-w-7' onClick={() => setSelectedUser(null)} />
        <img src={assets.help_icon} alt="info icon" className='hidden md:block max-w-5 cursor-pointer' />
      </div>
      <div className='h-[77%] overflow-y-scroll overflow-hidden'>
        {/* Chat */}
        <div className='flex flex-col min-h-[calc(100% - 120px)] p-3 pb-6 overflow-y-scroll '>
          {
            messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.senderId !== selectedUser._id ? "justify-start" : "justify-end"}`}>
                {msg.senderId !== selectedUser._id && (
                  <div className='flex-shrink-0'>
                    <img src={msg.senderId === selectedUser._id ? assets.avatar_icon : assets.profile_martin} alt="" className='w-8 h-8 rounded-full' />
                  </div>
                )}
                <div className={`flex flex-col ${msg.senderId !== selectedUser._id ? "items-start" : "items-end"}`}>
                  {msg.image ? (
                    <img src={msg.image} alt="message" className='max-w-[230px] rounded-lg overflow-hidden' />
                  ) : (
                    <p className={`text-white text-sm rounded-lg px-4 py-3 max-w-[250px] ${msg.senderId !== selectedUser._id ? "bg-indigo-600/70 rounded-bl-none" : "bg-violet-500/70 rounded-br-none"}`}>
                      {msg.text}
                    </p>
                  )}
                  <p className='text-gray-400 text-xs mt-1'>{formatTime(msg.createdAt)}</p>
                </div>
                {msg.senderId === selectedUser._id && (
                  <div className='flex-shrink-0'>
                    <img src={assets.avatar_icon} alt="" className='w-8 h-8 rounded-full' />
                  </div>
                )}
              </div>
            ))
          }
          <div ref={scrollEnd} className='flex-1'></div>
        </div>
      </div>

      {/* message bar */}
      <div className='sticky bottom-0 left-0 p-3 flex items-center gap-2 w-full'>
        <div className='flex items-center gap-2 bg-gray-100/12 rounded-full py-3 px-4 w-full max-w-[90%]'>
          <input
            type="text"
            placeholder='Send message'
            className='bg-transparent outline-none text-white text-sm placeholder-[#c8c8c8] flex-1'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <input type="file" id='imageInput' accept='image/png, image/jpeg' hidden />
          <label htmlFor="imageInput" className='cursor-pointer'>
            <img src={assets.gallery_icon} alt="gallery icon" className='max-w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img src={assets.send_button} alt="send button" className='max-w-10 cursor-pointer' onClick={handleSendMessage} />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden '>
      <img src={assets.logo_icon} alt="logo icon" className='max-w-16' />
      <p className='text-white text-lg  font-medium'>Welcome to QuickChart</p>
    </div>
  );
}

export default ChatContainer