import React, { useContext } from 'react'
import assets, { userDummyData } from './../../public/index';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const SideBar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pb-5'>
        <div className='flex - justify-between items-center'>
          <img src={assets.logo} alt="Logo" className='max-w-40' />
          <div className='group relative py-2'>
            <img src={assets.menu_icon} alt="Menu icon" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p className='text-sm cursor-pointer' onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr className='my-2 border-t border-gray-600' />
              <p className='text-sm cursor-pointer' onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-[#282142] rounded-full py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="Serch icon" className='w-5' />
          <input type="text" placeholder='Search Friends....' className='bg-transparent outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' />
        </div>
      </div>

      <div className='flex flex-col'>
        {
          userDummyData.map((user, index) => (
            <div key={user._id} className={`relative flex items-center gap-2 pl-4 p-2 rounded max-sm:text-sm cursor-pointer ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`} onClick={() => setSelectedUser(user)}>
              <img src={user?.profilePic || assets.avatar_icon} alt="User" className='w-10 aspect-[1/1] rounded-full' />

              <div className='flex flex-col leading-5'>
                <p className='text-sm'>{user?.fullName}</p>
                {
                  index < 3 ? <span className='text-[#45E091] text-xs'>Online</span> : <span className='text-neutral-400 text-xs'>Offline</span>
                }
              </div>
              {
                index > 2 && <p className='absolute right-4 top-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>
              }

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default SideBar
