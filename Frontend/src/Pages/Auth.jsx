import React, { useState, useContext } from 'react'
import assets from './../../public/index';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Auth = () => {
  const [currentForm, setCurrentForm] = useState('Register');
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDataSubmited, setIsDataSubmited] = useState(false)

  const { Auth } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentForm === "Register" && !isDataSubmited) {
      setIsDataSubmited(true);
      return;
    }
    setIsLoading(false);
    Auth(currentForm, { fullName, email, password, bio })

  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <div className='hidden sm:flex  items-center justify-center ' >
        <img src={assets.logo_big} alt="logo" className="w-50" />
      </div>


      {/* right */}
      <form
        onSubmit={onSubmitHandler}
        className='backdrop-blur-xl text-white bg-white/8 border-2 border-gray-600  rounded-2xl flex flex-col gap-6 p-6'>
        <h2 className='text-2xl font-medium flex justify-between items-center'>
          {currentForm}
          {
            isDataSubmited && (
              <button type='button' onClick={() => setIsDataSubmited(false)} className='text-sm font-medium text-indigo-500'>  <img src={assets.arrow_icon} alt="arrow" className='w-7 cursor-pointer' /></button>
            )
          }

        </h2>
        {
          currentForm === "Register" && !isDataSubmited && (
            <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='FullName' required />
          )
        }

        {
          !isDataSubmited && (
            <>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder='Email Address' required />

              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' required />
            </>
          )
        }


        {currentForm === "Register" && isDataSubmited && (
          <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} className='border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a Short Bio......' required />
        )}

        {
          currentForm === "Register" && !isDataSubmited ? (
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox" id="Check" className='cursor-pointer' />
              <label htmlFor="Check"> Agree to terms and conditions & privacy policy</label>
            </div>
          ) : (
            !isDataSubmited && (
              <>
                <div className='flex items-center gap-8 justify-between text-sm text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <input type="checkbox" id="Check" className='cursor-pointer ' />
                    <label htmlFor="Check"> Remember me</label>
                  </div>

                  <Link href="#" className='text-indigo-500 ml-1'>Forgot Password?</Link>
                </div>
              </>
            )
          )
        }

        <button type='submit' className='bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-3 px-4 rounded-md w-full cursor-pointer'>
          {
            isLoading ? "Loading..." : currentForm === "Register" ? "Create Account" : "Login Now"
          }
        </button>

        <div>
          <p>{currentForm === "Register" ? "Already have an account?" : "Don't have an account?"} <span className='text-violet-500 ml-1 cursor-pointer' onClick={() => {
            setCurrentForm(currentForm === "Register" ? "Login" : "Register");
            setIsDataSubmited(false);
          }
          }>{currentForm === "Register" ? "Login" : "Register"}</span></p>
        </div>
      </form >

    </div >
  )
}

export default Auth