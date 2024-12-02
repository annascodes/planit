import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInOk } from '../redux/user/userSlice';

const Login = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [err, setErr] = useState(null)
  const handleChange = (e)=>{
    e.preventDefault()
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  const handleSubmit = async()=>{
    console.log(formData)
    try {
      const res = await fetch('/api/auth/login', 
      {
        method:'post',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(!res.ok) {
        console.log(data.message)
        setErr(data.message)
      }else{
        setErr(null)
        dispatch(signInOk(data))
        console.log(data)
      }
    } catch (error) {
      console.log(error)
      setErr(error.message)
    }
  }
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-1/2 md:block hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md scale-150">
              <div className="flex flex-row  justify-center items-center gap-3">
                <div className="loader"></div>
                <h1
                  style={{ fontFamily: "Bebas Neue" }}
                  className="text-5xl font-bold "
                >
                  PlanIt.
                </h1>
              </div>
              <p className="py-1">"Get things done with effortless ease."</p> 
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-base-200  md:w-1/2 flex flex-col justify-center items-center md:h-auto h-screen">
        <div className="max-w-md md:hidden block ">
          <div className="flex flex-row  justify-center items-center gap-3">
            <div className="loader"></div>
            <h1
              style={{ fontFamily: "Bebas Neue" }}
              className="text-5xl font-bold "
            >
              PlanIt.
            </h1>
          </div>
          <p className="py-6">"Get things done with effortless ease."</p>

        </div>
        <h1 className="text-4xl my-4 md:block hidden">Login</h1>
        <div className="md:w-3/5 flex flex-col gap-3 ">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input onChange={handleChange} id='username' type="text" className="grow" placeholder="Username" />
          </label>
          {/* --- */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input onChange={handleChange} id='password' type="password" className="grow" />
          </label>
          <button onClick={handleSubmit} className="btn bg-blue-500 text-white hover:bg-blue-700">
            Login
          </button>
          <p>Don't have an Account? Let's <Link to={'/register'} className='text-blue-500 underline underline-offset-4'>Register</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Login
