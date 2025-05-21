import React, { useState, useContext } from 'react'
import assets from './../../public/index';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
  const { authUser, UpdateProfile, token } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName)
  const [bio, setBio] = useState(authUser?.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedImage) {
        await UpdateProfile({ fullName: name, bio });
        navigate("/")
        return;
      }

      const render = new FileReader();
      render.readAsDataURL(selectedImage);
      render.onload = async () => {
        const base64String = render.result.split(',')[1];
        const data = {
          profilePic: base64String,
          fullName: name,
          bio
        }
        await UpdateProfile(data, token);
        navigate("/")
        return;
      };
    } catch (error) {
      console.error("Error updating profile:", error);

    }
  }

  return authUser && (
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
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="Edit Profile Image" className={`w-12 h-12 ${selectedImage && "rounded-full"}`} />
            <p className='text-sm'>Change Avatar</p>
          </label>

          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Your Name' required />
          <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a Short Bio......' required />

          <button type='submit' className='bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-3 px-4 rounded-md w-full cursor-pointer'>
            Save
          </button>

        </form>

        <div>
          <img src={authUser?.profilePic} alt="profile logo" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
        </div>
      </div>

    </div>
  )
}

export default Profile