import React, { useState } from 'react'
import assets from './../../public/index';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [slectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Hamza Janzaib")
  const [bio, setBio] = useState('Hi Everyone, I am Using QuickChat')

  const handleSubmit = async (e)=>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>

      <div className='backdrop-blur-xl text-gray-300  w-5/6 max-w-2xl  border-2 border-gray-600  rounded-lg flex items-center justify-between max-sm:flex-col-reverse '>

        <form
        onSubmit={handleSubmit}
        className='flex-1 flex flex-col gap-5 p-10' >
          <h3 className='text-lg'>
            Profile Details
          </h3>

          <label htmlFor="avtar" className='flex items-center cursor-pointer gap-2'>
            <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avtar' hidden accept='image/png, image/jpeg' />
            <img src={slectedImage ? URL.createObjectURL(slectedImage) : assets.avatar_icon} alt="Edit Profile Image" className={`w-12 h-12 ${slectedImage && "rounded-full"}`} />
            <p className='text-sm'>Change Avatar</p>
          </label>

          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Your Name' required />
          <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a Short Bio......' required />

          <button type='submit' className='bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-3 px-4 rounded-md w-full cursor-pointer'>
            Save
          </button>

        </form>

        <div>
          <img src={assets.logo_icon} alt="profile logo" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
        </div>
      </div>

    </div>
  )
}

export default Profile