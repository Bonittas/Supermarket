import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems, onDeleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  const handleDeleteItem = (itemId) => {
    onDeleteItem(itemId);
  };

  const groupedItems = cartItems.reduce((grouped, item) => {
    const uniqueItemId = `${item.id}-${item.categoryName}`;
    if (!grouped[uniqueItemId]) {
      grouped[uniqueItemId] = { ...item, quantity: 1 };
    } else {
      grouped[uniqueItemId].quantity++;
    }
    return grouped;
  }, {});

  const totalItems = cartItems.length;

  const totalPrice = Object.values(groupedItems).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
 



  return (
    <div className="">
      <button
        className="fixed z-30 top-8 right-3 bg-green-50 text-green-600 px-2 py-2 rounded-full"
        onClick={toggleCart}
      >
        <p className="text-sm text-center text-green-600 font-cursive">
          <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8" />
        </p>
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-md">
            {totalItems}
          </span>
        )}
        {isOpen ? '' : ''}
      </button>
      {isOpen && (
        <div className="fixed top-24 right-4 bg-white w-1/4 p-4 z-30 shadow-md">
          <h2 className="text-lg font-bold mb-2">Cart</h2>
          {cartItems.length === 0 ? (
  <p className="text-gray-500">Your cart is empty.</p>
) : (
  <div>
    <ul className="space-y-2">
    {Object.values(groupedItems).map((item) => (
  <li key={item.id} className="flex items-center">
    <div className="relative mr-2">
      <img
        src={`/uploads/${item.categoryName}/${item.image}`}
        alt={item.name}
        className="w-8 h-8 object-cover"
      />
      {item.quantity > 1 && (
        <span className="absolute bottom-0 right-0 bg-green-500 text-white px-1 rounded-md">
          {item.quantity}
        </span>
      )}
    </div>
    <span>
      {item.name}{' '}
      {item.quantity > 1 && (
        <span className="text-gray-500 ml-2">
          ({item.quantity})
        </span>
      )}
    </span>
    <span className="ml-2 text-gray-500">
      (${item.price.toFixed(2)})
    </span>
    <button
      className="ml-2 text-red-600"
      onClick={() => handleDeleteItem(item.id)}
    >
      <span className="absolute right-2 font-bold">Delete</span>
    </button>
  </li>
))}
    </ul>

    <div className="my-4">
      <p className="font-bold">
        Total Pricee: ${totalPrice.toFixed(2)}{' '}
        <Link to="/purchase">
          <button className="bg-green-700 p-2 text-white rounded-md">
            Purchase
          </button>
        </Link>
      </p>
    </div>
  </div>
)}
        </div>
      )}
    </div>
  );
};
export default Cart;