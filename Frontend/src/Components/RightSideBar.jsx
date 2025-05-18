import React from 'react'
import assets, { imagesDummyData } from '../../public'

const RightSideBar = ({ selectedUser }) => {
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 w-full rounded-l-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>

      <div className='pt-7'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="User" className='w-32 aspect-[1/1] rounded-full mx-auto' />
        <h1 className='text-center px-13 gap-2 max-auto flex items-center text-white text-lg font-medium mt-3'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser?.fullName}
        </h1>
        <p className='text-center text-sm text-gray-400'>{selectedUser?.bio}</p>
      </div>

      <hr className='border-t border-gray-600 my-5' />

      <div className='px-5 text-xs'>
        <p className='text-white text-lg text-center font-medium'>Media</p>

        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {
            imagesDummyData.map((img, index) => (
              <div key={index} onClick={() => window.open(img)}  className=' relative cursor-pointer rounded overflow-hidden'>
                <img src={img} alt="User" className='object-cover w-full aspect-[1/1] rounded-lg' />
              </div>
            ))
          }
        </div>

        <hr className='border-t border-gray-600 my-5' />
       <button className='bg-white/10 text-white text-sm font-medium py-3 px-4 rounded-xl w-full cursor-pointer'>
        Logout
       </button>

      </div>

    </div>
  )
}

export default RightSideBar