import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPaperPlane, faSearch, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header3';

import img from '../img/items/contact2.avif';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

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
      const response = await fetch('/api/feedback', {
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
        fetchFeedbacks();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedbacks');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <Header />
      <div className="fixed top-4 left-48 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20  my-2">
        <input
          type="text"
          className="rounded-l-full lg:h-12 md:h-10 sm:h-10 py-2 px-4 sm:pr-12 w-full relative right-10 text-white bg-white bg-opacity-10 focus:outline-none focus:border-green-500 border-2 border-green-700 leading-tight shadow-lg mb-2 sm:mb-0"
          placeholder="Search Products"
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-600 text-white font-bold lg:h-12 md:h-10 sm:h-8 py-2 px-4 rounded-r-full absolute right-0 top-0"
        >
          <div className='whitespace-nowrap px-2'><FontAwesomeIcon
            icon={faSearch}
            style={{ marginLeft: '0.5rem' }}
          /></div>
        </button>
      </div>
      <div className="container mx-2 my-16">
        <div className="md:flex md:flex-row-reverse">
          <div className="md:w-1/2 md:order-2 relative top-12">
            <img className="w-3/4 h-auto " src={img} alt="Contact Image" />
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
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none bg-green-600 bg-opacity-10 border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6 font-cursive">Feedbacks</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {feedbacks.map((feedback, index) => (
              <li key={index} className="bg-white shadow-lg p-4 rounded-lg">
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Name: </span>
                  {feedback.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Email: </span>
                  {feedback.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Message: </span>
                  {feedback.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-green-600 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-white">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              123 Street, City, Country
            </p>
            <p className="text-white">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              +1234567890
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;