import React, { useState } from 'react';
import Header from '../../components/Header3';
import { categories } from './Category';
import { Link } from 'react-router-dom';

import Search from '../Search';

const Sanitizers = ({ cartItems, setCartItems }) => {
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log(`Added ${product.name} to cart`);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = categories[6].products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="fixed lg:top-4 md:top-6 sm:top-4 left-32 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20 my-2">
        <Search onSearch={handleSearch} /> 
      </div>
      <div className="container mx-auto px-3">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-green-100 p-4 m-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-4 font-cursive font-bold text-lg hover:bg-green-200 transition-colors"
                >
                  <Link to={`/${category.name}`}>{category.name} </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" p-4">
            <h2 className="text-2xl font-bold mb-4">Sanitizers</h2>
            <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 h-56 rounded-lg"
                  />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-500">{product.price.toFixed(2)} Birr</p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sanitizers;