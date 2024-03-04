import React, { useState, useEffect } from 'react';

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback/list');
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
    <div className="container mx-auto my-10">
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
  );
}

export default Feedbacks;