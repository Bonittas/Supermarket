import React from "react";
import Header from "../components/Header3";
import myimg from "../img/items/about.avif";
import myimg2 from "../img/items/OurMission.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold font-cursive mb-6 text-yellow-600 text-center">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-4 md:mb-0">
            <img src={myimg} alt="About Us" className="rounded-lg w-full shadow-md p-4" />
          </div>
          <div className="border rounded-md shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600 text-center">
              Our Story
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mt-4">
              If you have any questions or feedback, please feel free to contact
              us. We would love to hear from you.
            </p>
            <p className="text-gray-600 mt-4">
              If you have any questions or feedback, please feel free to contact
              us. We would love to hear from you.
            </p>
            <div className="flex justify-center mt-4">
              <Link to='/contact'>
            <button className="bg-yellow-600 text-white hover:bg-green-700 p-2 rounded-md">
              Contact us
            </button>
            </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="border rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500 text-center">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
       
          </div>

          <div className="relative">
            <img src={myimg2} alt="About Us" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
       <Footer/>
    </>
  );
};

export default About;
