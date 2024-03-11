import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-green-500 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="flex items-start mb-2">
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

          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-white">
              <li className="mb-2">
                <a href="/products">Products</a>
              </li>
              <li className="mb-2">
                <a href="/about">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Connect with Us</h3>
            <div className="flex">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4">
                <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
                <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl" />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-white mb-2">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                className="input-field mb-2 mx-2 p-1"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="text-white">
              <li className="mb-2">
                <a href="/faq">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="/returns">Returns</a>
              </li>
              <li className="mb-2">
                <a href="/shipping">Shipping Information</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
            <h3 className="text-white text-lg font-bold mb-4">Social Media Feed</h3>
            
          </div>
        </div>
      </div>

      <div className="py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            &copy; {new Date().getFullYear()} iShop Supermarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
