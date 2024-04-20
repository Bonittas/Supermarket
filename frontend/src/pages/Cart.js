import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart } from '../features/cart/cartSlice';
import {Link} from "react-router-dom"
class ItemNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ItemNotFoundError';
  }
}

const Cart = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (itemName) => {
    try {
      dispatch(removeFromCart(itemName.trim())); // Trimming whitespace from itemName
    } catch (error) {
      if (error instanceof ItemNotFoundError) {
        console.error(error.message);
        // Handle the error (e.g., display a message to the user)
      } else {
        console.error(error);
        // Handle other errors
      }
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <button className="fixed z-30 top-6 right-3 text-green-600 px-2 py-2 rounded-full">
        <p className="text-sm text-center text-green-600 font-cursive">
          <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8" />
        </p>
      </button>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="">
      <button className="fixed z-30 top-6 right-3 text-green-600 px-2 py-2 rounded-full">
        <p className="text-sm text-center text-green-600 font-cursive">
          <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8" />
        </p>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm px-1 pb-1 w-5 h-5 rounded-full">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      <div className="fixed top-24 right-4 bg-white w-1/4 p-4 z-30 shadow-md">
        <h2 className="text-lg font-bold mb-2">Cart</h2>
        <div>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center">
                <div className="relative mr-2">
                  <img
                    src={`/uploads/${item.categoryName}/${item.image}`}
                    alt={item.name}
                    className="w-10 h-10 object-cover"
                  />
                </div>
                <span>
                  {item.name}{' '}
                  {item.quantity > 0 && (
                    <span className="text-gray-500 ml-2">
                      ({item.quantity})
                    </span>
                  )}
                </span>
                <span className="ml-2 text-gray-500">
                  {(item.price * item.quantity).toFixed(2)}Birr)
                </span>
                <button
                  className="ml-8 font-bold text-xl text-red-600"
                  onClick={() => handleDeleteItem(item.name)} // Use itemName for delete
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="my-4">
                <p className="font-bold">
                  Total Price: {totalPrice.toFixed(2)}Birr{' '}
                  <Link to="/purchase">
                    <button className="bg-green-700 p-2 text-white rounded-md">
                      Purchase
                    </button>
                  </Link>
                </p>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
