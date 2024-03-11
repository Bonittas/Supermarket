import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header3";
import Footer from "../components/Footer";

import img from "../img/items/contact2.avif";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        <div className="md:flex mx-auto md:flex-row-reverse">
          <div className="md:w-1/2 md:order-2 relative">
            <img className="w-full h-auto" src={img} alt="Contact Image" />
          </div>
          <div className="md:w-1/2 md:order-1 md:px-8 py-8">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 font-cursive text-center">
                Contact Us
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center text-left"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Name
                  </label>
                  <input
                    className="input-field border  border-gray-600 p-2 rounded-lg"
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email
                  </label>
                  <input
                    className="input-field border border-gray-600 p-2 rounded-lg "
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 "
                    htmlFor="message"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Message
                  </label>
                  <textarea
                    className="input-field border border-gray-600 p-4 rounded-lg"
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
      <Footer />
    </>
  );
}

export default Contact;
