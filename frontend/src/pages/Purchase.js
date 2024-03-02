import React, { useState, useEffect } from 'react';
import Header from '../components/Header3';
import axios from 'axios'
const PurchasePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [remark, setRemark] = useState('');
  const [shoppingExperience, setShoppingExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDeliveryDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };

  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleShoppingExperienceChange = (event) => {
    setShoppingExperience(event.target.value);
  };

  const handlePurchaseSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const purchaseData = {
      quantity: quantity,
      email: email,
      address: address,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      paymentMethod: paymentMethod,
      remark: remark,
      shoppingExperience: shoppingExperience,
    };

    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setPurchaseSuccess(true);
        fetchOrders(); // Fetch the updated orders after successful purchase
      })
      .catch((error) => {
        setLoading(false);
        console.error('An error occurred during the purchase.');
        console.log(error);
        throw error; // Re-throw the error to propagate it
      });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/order/list");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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



  const handleEditOrder = async (orderId, newData) => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        console.log('Order edited successfully');
        fetchOrders(); // Fetch the updated orders after successful edit
      } else {
        console.error('Failed to edit order');
      }
    } catch (error) {
      console.error('Error editing order:', error);
    }
  };
  return (
    <>
      <Header />
  <div className=' justify-center flex items-center z-40 my-12'>
      <div className=" justify-center flex items-center p-6 px-20 border border-gray-300 shadow-sm rounded-md">
        {purchaseSuccess ? (
          <div>
            <p>Purchase successful!</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Purchase Page</h1>
  
            <h2 className="text-xl font-bold mb-4">Purchase Form</h2>
            <form onSubmit={handlePurchaseSubmit}>
              <div className="mb-4">
                <label htmlFor="quantity" className="block font-bold">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-bold">
                  Address:
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                  className="border border-gray-300 rounded p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="deliveryDate" className="block font-bold">
                  Delivery Date:
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  value={deliveryDate}
                  onChange={handleDeliveryDateChange}
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deliveryTime" className="block font-bold">
                  Delivery Time:
                </label>
                <input
                  type="time"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={handleDeliveryTimeChange}
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="block font-bold">
                  Payment Method:
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="border border-gray-300 rounded p-2"
                >
                  <option value="">Select a payment method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="remark" className="block font-bold">
                  Remark:
                </label>
                <textarea
                  id="remark"
                  value={remark}
                  onChange={handleRemarkChange}
                  className="border border-gray-300 rounded p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="shoppingExperience" className="block font-bold">
                  Shopping Experience:
                </label>
                <select
                  id="shoppingExperience"
                  value={shoppingExperience}
                  onChange={handleShoppingExperienceChange}
                  className="border border-gray-300 rounded p-2"
                >
                  <option value="">Select a shopping experience</option>
                  <option value="great">Great</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded p-2"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Purchase'}
                </button>
              </div>
            </form>
  
            
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default PurchasePage;