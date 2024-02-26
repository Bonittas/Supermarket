import React, { useState } from 'react';

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

  return (
    <div className="">
      <button
        className="absolute  z-30 right-10 bg-blue-500 text-white px-3 py-1 rounded-md"
        onClick={toggleCart}
      >
        {isOpen ? 'Close Cart' : 'Open Cart'}
      </button>
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white w-1/4 p-4 z-30 shadow-md">
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
                    <span className="ml-2 text-gray-500">(${item.price.toFixed(2)})</span>
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <span className='absolute right-2 font-bold'>
                        Delete
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="my-4">
                <p className="font-bold">
                  Total Price: ${totalPrice.toFixed(2)}{' '}
                  <button className="bg-green-700 p-2 text-white rounded-md">
                    <a href='/purchase'>Purchase</a>
                  </button>
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