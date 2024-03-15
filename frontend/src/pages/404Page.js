import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you're looking for does not exist.</p>
      <button type="button" className="bg-yellow-600 p-4 rounded-lg ">
      <Link to="/" className="text-white">
        Go back to Home
      </Link>
      </button>
    </div>
  );
};

export default NotFound;
