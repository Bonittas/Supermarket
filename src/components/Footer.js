import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-green-500 pt-12 pb-6 mx-8 mt-4 rounded-md">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p items-center">
          <div className="w-full mb-6">
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-white">
              <li className="mb-2">
                <Link to="/products">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col justify-center mb-6">
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="flex items-start justify-center mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl mr-2 mt-1" />
              <p className="text-white">Your Supermarket Address, City, State, ZIP</p>
            </div>
            <div className="flex items-start mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-white mr-2 text-xl mt-1" />
              <p className="text-white">123-456-7890</p>
            </div>
            <div className="flex items-start mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl mr-2 mt-1" />
              <p className="text-white">info@supermarket.com</p>
            </div>
          </div>
          <div className="w-full mb-6">
            <h3 className="text-white text-lg font-bold mb-4">Connect with Us</h3>
            <div className="flex flex-col text-white p-2">
              <a href="https://www.linkedin.com/in/biftu-shibbire-20411a228/" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
                <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl" /><span className='p-2'>Facebook</span>
              </a>
              <a href="https://www.linkedin.com/in/biftu-shibbire-20411a228/" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
                <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl" /><span className='p-2'>Twitter</span>
              </a>
              <a href="https://www.linkedin.com/in/biftu-shibbire-20411a228/" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl" /><span className='p-2'>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/biftu-shibbire-20411a228/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl" /><span className='p-2'>Linkedin</span>
                </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-600 py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            &copy; {new Date().getFullYear()} Your Supermarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;