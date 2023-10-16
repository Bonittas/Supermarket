import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems, onDeleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const groupedItems = cartItems.reduce((grouped, item) => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 1 };
    } else {
      grouped[item.id].quantity++;
    }
    return grouped;
  }, {});

  const totalPrice = Object.values(groupedItems).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleDeleteItem = (itemId) => {
    onDeleteItem(itemId);
  };

  const itemCount = Object.values(groupedItems).reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="z-30">
      <button className="fixed sm:top-10 md:top-8 lg:top-8 z-30 right-2 text-green-900 px-3 py-1 rounded-md" onClick={toggleCart}>
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} className="w-8 h-8 absolute right-3 top-8 z-30" />
        ) : (
          <div className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="w-10 h-10 ml-3" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-green-900 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </div>
        )}
      </button>
      {isOpen && (
        <div className="fixed top-24 border rounded-sm right-6 bg-white w-72 p-4 z-30 shadow-md">
          <h2 className="text-lg font-bold mb-2">Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="space-y-2">
                {Object.values(groupedItems).map((item) => (
                  <li key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-cover mr-2"
                    />
                    <span>
                      {item.name} {item.quantity > 1 ? `(${item.quantity})` : ''}
                    </span>
                   
                    <span className="ml-2 text-black">-{item.price.toFixed(2)} Birr</span>
                    <button
                      className="ml-2 text-white "
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <span className="absolute right-2 font-bold">Delete</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="my-4">
                <p className="font-bold">
                  Total Price: {totalPrice.toFixed(2) } Birr{' '}
                  <Link to="/purchase">
                    <button className="bg-green-700 p-2 absolute right-2 mb-4 text-white rounded-md">
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