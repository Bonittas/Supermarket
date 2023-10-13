import React from 'react';
import Header from '../components/Header3';
import myimg from '../img/items/about.jpg';
import myimg2 from '../img/items/about1.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faUser,faCartShopping } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <>
      <Header />
     
      <div className="container mx-auto px-4 py-8">
     
        <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={myimg} alt="About Us" className="rounded-lg" />
          </div>
          <div className=' border-bottom rounded-md shadow-lg p-3 h-fit relative top-10 mb-2'>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mt-4">
              If you have any questions or feedback, please feel free to contact us. We would love to hear from you.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className=' border-top rounded-md shadow-lg p-3 h-fit'>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mt-4">
              If you have any questions or feedback, please feel free to contact us. We would love to hear from you.
            </p>
            <Link to ='/contact'><button className='bg-green-600 text-white hover:bg-green-700 p-2 rounded-md my-2'>Contact us</button></Link>
          </div>
          <div className='relative bottom-32'>
            <img src={myimg2} alt="About Us" className="rounded-lg" />
          </div>
        </div>
      </div>
    
    </>
  );
};

export default About;