import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import myImage from '../img/shopping-1165437.jpg';
import Header2 from '../components/Header3';
function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === '' && errors.email === '' && errors.password === '') {
      axios
        .post('http://localhost:3002/signup', values)
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
<div className=" z-20">
        <div
          className="w-full h-screen bg-cover bg-center"
        
        >
           
            <Header2 />
            
          <div className="flex justify-center items-center mx-2  ">
        <div className="w-full max-w-md mx-2 p-8 py-10 bg-green-200  shadow-lg rounded-lg absolute top-32 ">
          <h2 className="text-2xl font-bold mb-3 text-center text-black">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 font-medium text-black">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                className="w-full px-3 py-2 rounded border border-white-300 text-black bg-green-300  focus:outline-none focus:border-white-500 "
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                className="w-full px-3 py-2 rounded border border-white-300 text-black bg-green-300 focus:outline-none focus:border-white-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium text-black font-bold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                className="w-full px-3 py-2 text-black rounded border border-white-300 bg-green-300 focus:outline-none focus:border-green-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
              >
                Sign up
              </button>
              <p className='text-black items-center'>
                
                <Link to="/login" className="text-black  text-center">
                Already Have an Account?{' '}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
     
    </>
  );
}

export default Signup;