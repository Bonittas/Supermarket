import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header3';
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order/list');
      console.log('Fetched orders:', response.data); // Log the fetched orders
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`/api/order/${id}`);
      console.log('Delete response:', response.data);
      // Update the orders state by filtering out the deleted order
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  
  
  
  return (
    <>
    <Header/>
    <div className=" mx-auto my-8 p-8 bg-white rounded ">
      <h2 className="text-3xl font-bold mb-8 text-center">View Orders</h2>
      {orders.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Delivery Date</th>
              <th className="border px-4 py-2">Delivery Time</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Remark</th>
              <th className="border px-4 py-2">Shopping Experience</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">{order.email}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">{order.deliveryDate}</td>
                <td className="border px-4 py-2">{order.deliveryTime}</td>
                <td className="border px-4 py-2">{order.paymentMethod}</td>
                <td className="border px-4 py-2">{order.remark}</td>
                <td className="border px-4 py-2">{order.shoppingExperience}</td>
                <td className="border px-4 py-2">
  <button
    className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition"
    onClick={() => handleDeleteOrder(order._id)}  
  >
    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No orders available.</p>
      )}
    </div>
    </>
  );
};

export default ViewOrders;
