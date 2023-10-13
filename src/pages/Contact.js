import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPaperPlane,faSearch, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header3';

import img from '../img/items/contact2.jpg';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Header/>
       
      <div className="container mx-2 my-16">
        <div className="md:flex md:flex-row-reverse">
          <div className="md:w-1/2 md:order-2 relative top-12">
            <img className="w-3/4 h-auto " src={img} alt="Contact Image" />
            <div className='w-full flex justify-start mx-4 mt-12 '>
      <div className='bg-green-600 h-36 flex justify-start   rounded-md'>
      
     
      <div className=" mx-auto px-4 py-2 text-white flex items-center  justify-center ">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          Piyasa, Addis Ababa, Ethiopia
          <FontAwesomeIcon icon={faPhone} className="ml-4 mr-2" />
          +123-456-7890
        </div>
        </div>
        </div>
          </div>
          
          <div className="md:w-1/2 md:order-1 mr-4 relative top-10 ">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-cursive">Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Name
                  </label>
                  <input
                    className="shadow appearance-none bg-green-600 bg-opacity-10 border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email
                  </label>
                  <input
                    className="shadow appearance-none bg-green-600 bg-opacity-10 border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none bg-green-600 bg-opacity-10 border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none mb-4"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
        </div>
       
      </div>
     
    </>
  );
}

export default Contact;