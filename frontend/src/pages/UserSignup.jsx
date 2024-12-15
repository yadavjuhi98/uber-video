import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [userData, setUserData] = useState({})
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    // Set user data (you can use this for other purposes, e.g., showing confirmation)
    setUserData({
      username: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })

    const newUser = {
      fullname: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    // Log the new user to ensure it's being set correctly
    console.log(newUser)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user) // Store the user info in context
        localStorage.setItem('token', data.token)

        // Redirect after successful registration
        navigate('/home')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }

    // Clear the form fields
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

          <form onSubmit={submitHandler}>

            <h3 className='text-lg w-1/2  font-medium mb-2'>What is your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What is your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required type="password"
              placeholder='password'
            />

            <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
              Create account
            </button>
          </form>

          <p className='text-center'>
            Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link>
          </p>
        </div>

        {user && (
          <div>
            <p>Welcome, {user.firstName} {user.lastName}!</p> {/* Display the logged-in user */}
          </div>
        )}

        <div>
          <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div >
  )
}

export default UserSignup

