import React, { useState, useEffect } from 'react';
import Header from '../components/Header3'

const PurchasePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
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

  useEffect(() => {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.log(error));
  }, []);

  const handleItemSelect = (event) => {
    setSelectedItem(event.target.value);
  };

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
      item: selectedItem,
      quantity: quantity,
      email: email,
      address: address,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      paymentMethod: paymentMethod,
      remark: remark,
      shoppingExperience: shoppingExperience
    };

    fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseData)
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setPurchaseSuccess(true);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
    <Header/>

    <div className=" justify-center flex items-center border border-gray-300 shadow-sm rounded-md">
      {purchaseSuccess ? (
        <div>
          <p>Purchase successful!</p>
        </div>
      ) : (
        <div>
                  <h1 className="text-2xl font-bold mb-4">Purchase Page</h1>

          <h2 className="text-xl font-bold mb-4">Cart Items</h2>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))}
          <div className='absolute top-10 left-40 text-white left-32 z-40'>
            <a href='/'>Continue Shopping? </a></div>
          <h2 className="text-xl font-bold mb-4">Purchase Form</h2>
          <form onSubmit={handlePurchaseSubmit}>
            <div className="mb-4">
              <label htmlFor="item" className="block font-bold">Select Item:</label>
              <select id="item" value={selectedItem} onChange={handleItemSelect} className="border border-gray-300 rounded p-2">
                <option value="">Select an item</option>
                {cartItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-bold">Quantity:</label>
              <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} className="border border-gray-300 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold">Email Address:</label>
              <input type="email" id="email" value={email} onChange={handleEmailChange} className="border border-gray-300 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-bold">Address:</label>
              <textarea id="address" value={address} onChange={handleAddressChange} className="border border-gray-300 rounded p-2"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block font-bold">Delivery Date:</label>
              <input type="date" id="deliveryDate" value={deliveryDate} onChange={handleDeliveryDateChange} className="border border-gray-300 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryTime" className="block font-bold">Delivery Time:</label>
              <input type="time" id="deliveryTime" value={deliveryTime} onChange={handleDeliveryTimeChange} className="border border-gray-300 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block font-bold">Payment Method:</label>
              <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} className="border border-gray-300 rounded p-2">
                <option value="Credit Card">Tele Birr</option>
                <option value="Debit Card">CBE Banking</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">Payment on Delivery</option>
 
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="remark" className="block font-bold">Remark:</label>
              <textarea id="remark" value={remark} onChange={handleRemarkChange} className="border border-gray-300 rounded p-2"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="shoppingExperience" className="block font-bold">How easy was your shopping experience?</label>
              <select id="shoppingExperience" value={shoppingExperience} onChange={handleShoppingExperienceChange} className="border border-gray-300 rounded p-2">
                <option value="">Select an option</option>
                <option value="Very easy">Very easy</option>
                <option value="Easy">Easy</option>
                <option value="Neutral">Neutral</option>
                <option value="Difficult">Difficult</option>
                <option value="Very difficult">Very difficult</option>
              </select>
            </div>
            <button type="submit" disabled={!selectedItem || loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
              {loading ? 'Processing...' : 'Purchase'}
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default PurchasePage;