import React, { useState, useEffect } from "react";
import Header from "../components/Header3";
import axios from "axios";

const PurchasePage = ({ cartItems, setCartItems, onDeleteItem }) => {
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    remark: "",
    shoppingExperience: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currency = "ETB";
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      
      // Send order data to the server
      await sendOrderData();

      // Initialize payment
      const response = await axios.post(`${apiUrl}/api/payment/initialize`, {
        amount: getTotalPrice(),
        currency: "ETB",
        ...formData,
        tx_ref: `TX${Math.floor(100000 + Math.random() * 9000000)}`,
        callback_url: "https://example.com/callback",
        return_url: "https://dalas-backend.onrender.com/",
        customization: {
          title: "Customer",
          description: formData.remark,
        },
      });
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.error(error);
      setErrorMessage("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOrderData = async () => {
    try {
      const purchaseData = {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        remark: formData.remark,
        shoppingExperience: formData.shoppingExperience,
        cartItems: cartItems,
      };
      await axios.post(`${apiUrl}/api/order`, purchaseData);
    } catch (error) {
      console.error("An error occurred while sending order data.");
      throw error;
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/list`);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to fetch orders. Please try again later.");
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "fname",
      "lname",
      "email",
      "address",
      "deliveryDate",
      "deliveryTime",
      "remark",
      "shoppingExperience",
    ];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setErrorMessage(
          `Please enter your ${
            field === "fname"
              ? "first name"
              : field === "lname"
              ? "last name"
              : field
          } field.`
        );
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <>
      <Header />
      <div className="container w-full md:max-w-4xl mx-auto my-6 flex rounded-md shadow-md">
      <div className="bg-white p-4 w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-center mb-4">
            Purchase Form
          </h2>
          <form onSubmit={handlePurchaseSubmit}>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label htmlFor="fname" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="lname" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="deliveryDate"
                  className="block text-sm font-medium"
                >
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="deliveryTime"
                  className="block text-sm font-medium"
                >
                  Delivery Time
                </label>
                <input
                  type="time"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="remark" className="block text-sm font-medium">
                Remark
              </label>
              <textarea
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="shoppingExperience"
                className="block text-sm font-medium"
              >
                Your Shopping Experience
              </label>
              <select
                id="shoppingExperience"
                name="shoppingExperience"
                value={formData.shoppingExperience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              >
                <option value="">Select an option</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">{`${getTotalPrice()} ${currency}`}</span>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
              displaced={loading}
            >
              {loading ? "Processing..." : "Purchase"}
            </button>
          </form>
          </div>

          <div className="p-4 w-full md:w-1/2">
          <div className="mt-4">
            {cartItems && cartItems.length > 0 && (
              <div>
              <h3 className="text-xl font-semibold text-center mb-4">Cart Items</h3>
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center">
                        <img
                          src={`${apiUrl}/uploads/${item.categoryName}/${item.image}`}
                          alt={item.name}
                          className="w-16 h-12 object-cover mr-2 rounded"
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>{item.price.toFixed(2)} Birr</span>
                      <button
                        className="text-red-600 ml-2"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchasePage;
