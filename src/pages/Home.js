import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping,faSearch } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

import Header from '../components/Header3';
import i1 from '../img/snacks.png';
import i2 from '../img/fruit.png';
import i3 from '../img/veg.png';
import i4 from '../img/bev.png';
import i5 from '../img/meat.png';
import i6 from '../img/soap.png';
import i7 from '../img/dairy.png';
import p1 from '../img/whole fish.png';
import p2 from '../img/red onion.png';
import p3 from '../img/whole chicken.png';
import p4 from '../img/oranges.png';
import p5 from '../img/coca 500ml.png';
import p6 from '../img/sunchips blue.png';

const categories = [
  { name: 'Fruits', image: i2 },
  { name: 'Vegetables', image: i3 },
  { name: 'Dairy Products', image: i7 },
  { name: 'Snacks', image: i1 },
  { name: 'Beverages', image: i4 },
  { name: 'Meat and Seafood', image: i5 },
  { name: 'Soap and Detergents', image: i6 },
];

const products = [
  { name: 'Fish', image: p1, price: 10.99 },
  { name: 'SunChips', image: p6, price: 2.49 },
  { name: 'Chicken', image: p3, price: 7.99 },
  { name: 'Orange', image: p4, price: 3.99 },
  { name: 'Soap', image: p5, price: 1.99 },
  { name: 'Onion', image: p2, price: 0.99 },
];
const generateRandomProducts = () => {
  const randomProducts = [];
  const selectedImages = [];

  for (let i = 1; i <= 6; i++) {
    let randomProduct;
    do {
      randomProduct = products[Math.floor(Math.random() * products.length)];
    } while (selectedImages.includes(randomProduct.image));

    selectedImages.push(randomProduct.image);

    randomProducts.push({
      id: i,
      name: `Product ${i}`,
      product: randomProduct,
      description: `Description of product ${i}.`,
    });
  }

  return randomProducts;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const randomProducts = generateRandomProducts();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen">
    <div className=" absolute right-2 top-64 flex flex-col justify-end items-end w-1/3 mx-2">
            <p className='text-white font-bold text-3xl text-center pb-3 w-full'>Elevate Your Shopping Experience with Our Vast Selection </p>
            <p className='text-white font-bold text-xl pb-4 text-center w-full'>Competitive Prices, Stellar and Fast Service</p>
              <div className="relative w-full top-6 my-2">
                <input
                  type="text"
                  className="rounded-l-full lg:h-16 md:h-16 sm:h-10 py-2 px-4 sm:pr-12 w-full relative right-10 text-white bg-white bg-opacity-10 focus:outline-none focus:border-green-500 border-2 border-green-700 leading-tight shadow-lg mb-2 sm:mb-0"
                  placeholder="Search Events"
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white font-bold lg:h-16 md:h-16 sm:h-10 py-2 px-4 rounded-r-full absolute right-0 top-0"
                 
                >
                  <div className='whitespace-nowrap px-2'><FontAwesomeIcon
  icon={faSearch}
  style={{ marginLeft: '0.5rem' }}
/></div>
                </button>
              </div>
            </div>
      <main className="container mx-auto py-2 ">
          <h2 className="text-2xl font-bold mb-1 text-center">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link to={`/${category.name.toLowerCase()}`} key={index}>
              <div
                className={`  border-2 bg-green-50 border-white rounded-full h-80 w-80  overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 ${
                  selectedCategory === category ? 'border-4 border-green-100' : ''}`}
              >
                
                <div className="relative">
                  <img src={category.image} alt={category.name} className="w-full h-72 object-cover" />
                  <div className=" flex items-center justify-center"></div>
                </div>
                <div className="p-4">
                  <button className="text-black absolute bottom-10 bg-green-300 px-1 py-1  font-bold rounded-full mb-2 w-full">{category.name}</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-12 mb-8 text-center">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {randomProducts.map((product) => (
  <div
    key={product.id}
    className={`rounded-lg overflow-hidden  h-fit bg-green-50 shadow-md transform transition duration-500 hover:scale-105 ${
      selectedCategory === product.product ? 'border-4 border-green-500' : ''
    }`}
    onClick={() => handleCategoryClick(product.product)}
  >
    <div className="relative p-2 ">
      <img src={product.product.image} alt={product.product.name} className="w-full h-64 object-cover" />
    </div>
    <div className="p-4 flex flex-col justify-items-center">
      <h3 className="text-xl font-bold text-center mb-2">{product.product.name}</h3>
      <p className="text-gray-700 font-bold text-center mt-2">{product.product.price.toFixed(2)} Birr</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 w-48">Add to Cart<FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 px-2 relative top-1" /></button>
    </div>
  </div>
))}
        </div>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">© 2023 Supermarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;