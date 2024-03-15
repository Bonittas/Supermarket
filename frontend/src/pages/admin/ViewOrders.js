import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header3";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedData, setEditedData] = useState({
    quantity: "",
    email: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    paymentMethod: "",
    remark: "",
    shoppingExperience: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/order/list");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`/api/order/${orderId}`);
      if (response.status === 200) {
        console.log("Order deleted successfully");
        fetchOrders();
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
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
      quantity: "",
      email: "",
      address: "",
      deliveryDate: "",
      deliveryTime: "",
      paymentMethod: "",
      remark: "",
      shoppingExperience: "",
    });
  };

  const handleSaveEdit = async (orderId) => {
    try {
      const response = await axios.put(`/api/order/${orderId}`, editedData);
      if (response.status === 200) {
        console.log("Order edited successfully");
        fetchOrders();
        setEditingOrder(null);
        setEditedData({
          quantity: "",
          email: "",
          address: "",
          deliveryDate: "",
          deliveryTime: "",
          paymentMethod: "",
          remark: "",
          shoppingExperience: "",
        });
      } else {
        console.error("Failed to edit order");
      }
    } catch (error) {
      console.error("Error editing order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
       <div className="bg-green-50 h-auto px-4 w-full pb-6 pt-2 rounded-lg   my-2">
        <h2 className="text-3xl font-bold mb-8 text-center">View Orders</h2>
        {orders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-2 border-gray-300">
              <tr>
                <th className="py-2 px-2 border text-center">Quantity</th>
                <th className="py-2 px-2 border text-center">Email</th>
                <th className="py-2 px-2 border text-center">Address</th>
                <th className="py-2 px-2 border text-center">Delivery Date</th>
                <th className="py-2 px-2 border text-center">Delivery Time</th>
                <th className="py-2 px-2 border text-center">Payment Method</th>
                <th className="py-2 px-2 border text-center">Remark</th>
                <th className="border px-4 py-2">Shopping Experience</th>
                <th className="border px-4 py-2">Cart Items
                    <th className="px-4 py-2">Items Image</th>
                    <th className="px-4 py-2">Items </th>
                    <th className="px-4 py-2"> Items Price</th>
                 </th>
                {/* <th className="py-2 px-2 border-b text-center">Actions</th> */}
              </tr> 
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 border text-left">{order.quantity}</td>
                    <td className="py-2 px-4 border text-left">{order.email}</td>
                    <td className="py-2 px-4 border text-left">{order.address}</td>
                    <td className="py-2 px-4 border text-left">{order.deliveryDate}</td>
                    <td className="py-2 px-4 border text-left">{order.deliveryTime}</td>
                    <td className="py-2 px-4 border text-left">{order.paymentMethod}</td>
                    <td className="py-2 px-4 border text-left">{order.remark}</td>
                    <td className="py-2 px-4 border text-left">
                      {order.shoppingExperience}
                    </td>
                    <td className="border px-4 py-2">
                      {order.cartItems.map((item) => (
                        <div key={item._id} className="flex items-left">
                          <td className="py-2 px-2 border-r text-left">
                            <img
                              src={`/uploads/${item.categoryName}/${item.image}`}
                              alt={item.name}
                              className="w-10 h-8 object-cover"
                            />
                          </td>
                          <td className=" py-2 px-2 border-r text-left">{item.name}</td>
                          <td className="py-2 px-2  text-right">
                              <p>Price</p>${item.price.toFixed(2)}
                          </td>
                        </div>
                      ))}
                    </td> 
                    {/* <td className="border px-4 py-2">
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
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                            onClick={() => handleEditOrder(order._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td> */}
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
