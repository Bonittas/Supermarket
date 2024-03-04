import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header3';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedData, setEditedData] = useState({
    quantity: '',
    email: '',
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: '',
    remark: '',
    shoppingExperience: '',
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order/list'); 
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`/api/order/${orderId}`);
      if (response.status === 200) {
        console.log('Order deleted successfully');
        fetchOrders();
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (orderId) => {
    setEditingOrder(orderId);
    const orderToEdit = orders.find((order) => order._id === orderId);
    if (orderToEdit) {
      setEditedData({
        quantity: orderToEdit.quantity,
        email: orderToEdit.email,
        address: orderToEdit.address,
        deliveryDate: orderToEdit.deliveryDate,
        deliveryTime: orderToEdit.deliveryTime,
        paymentMethod: orderToEdit.paymentMethod,
        remark: orderToEdit.remark,
        shoppingExperience: orderToEdit.shoppingExperience,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditedData({
      quantity: '',
      email: '',
      address: '',
      deliveryDate: '',
      deliveryTime: '',
      paymentMethod: '',
      remark: '',
      shoppingExperience: '',
    });
  };

  const handleSaveEdit = async (orderId) => {
    try {
      const response = await axios.put(`/api/order/${orderId}`, editedData);
      if (response.status === 200) {
        console.log('Order edited successfully');
        fetchOrders();
        setEditingOrder(null);
        setEditedData({
          quantity: '',
          email: '',
          address: '',
          deliveryDate: '',
          deliveryTime: '',
          paymentMethod: '',
          remark: '',
          shoppingExperience: '',
        });
      } else {
        console.error('Failed to edit order');
      }
    } catch (error) {
      console.error('Error editing order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto my-8 p-8 bg-white rounded">
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
                <th className=" border-r border-black px-4 py-2">Shopping Experience</th>
                <th className=" border-r border-black px-4 py-2">Cart Items
                <th className="border px-4 py-2">Items Image</th>
                <th className="border px-4 py-2">Items </th>
                <th className="border px-4 py-2"> Items Price</th>

</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2">{order.deliveryDate}</td>
                  <td className="border px-4 py-2">{order.deliveryTime}</td>
                  <td className="border px-4 py-2">{order.paymentMethod}</td>
                  <td className="border px-4 py-2">{order.remark}</td>
                  <td className="border px-4 py-2">{order.shoppingExperience}</td>
                  <td className="border px-4 ">
                  {order.cartItems.map((item) => (
                      <div key={item._id} className="flex items-center">
                                            <td className='border-r px-4 h-24 ' >

                        <img
                          src={`/uploads/${item.categoryName}/${item.image}`}
                          alt={item.name}
                          className="w-8 h-8 object-cover mr-2"
                        />
                                                    </td>

                        <div>
                            <td className=' px-4 border-r h-24'>

                          {item.name} 
                          </td>
                          <td className=' px-4 '>
 <p>Price</p>${item.price.toFixed(2)}
</td>

                        </div>

                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex">
                      {editingOrder === order._id ? (
                        <>
                          <div>
                            <button
                              className="bg-green-500 text-white rounded p-2"
                              onClick={() => handleSaveEdit(order._id)}
                            >
                              Save
                            </button>
                          </div>
                          <button
                            className="bg-gray-500 text-white rounded p-2"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-yellow-600 text-white rounded p-2"
                          onClick={() => handleEditOrder(order._id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white rounded p-2 ml-2"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </div>
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
