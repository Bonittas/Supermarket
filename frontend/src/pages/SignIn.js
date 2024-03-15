import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../components/Header3";
// import myImage from "../img/shopping-1165437.jpg";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/signIn", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;

        if (data.success === false) {
          setError(data.message);
          return;
        }
        setError(null);
        localStorage.setItem('isAuthenticated', 'true');
        navigate("/admin");

      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="z-20 bg-gradient-to-r from-yellow-50 to-green-200">
      <div
        className="w-full h-screen bg-cover bg-center"
        // style={{ backgroundImage: `url(${myImage})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 flex flex-col justify-center items-center" />

        <Header2 />
        <div className="flex justify-center items-center mx-2  ">
          <div className="w-full max-w-md mx-2 p-8 py-10 bg-green-200  shadow-lg rounded-lg absolute top-32 ">
            <h2 className="text-2xl font-bold mb-3 text-center text-black">
              Sign In
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between gap-5"
            >
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-black"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 rounded border border-white-300 text-black bg-green-600 bg-opacity-10 focus:outline-none focus:border-white-500"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-black"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 rounded border border-white-300 text-black bg-green-600 bg-opacity-10 focus:outline-none focus:border-white-500"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none">
                Sign In
              </button>
              <p className="text-black items-center">
                <Link to="/signup" className="text-black  text-center">
                  Don't have an account? Sign up here.
                </Link>
              </p>
            </form>
            {error && <p className="text-red-500 text-center mt-5">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
