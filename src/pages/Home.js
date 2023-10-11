import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import myImage from '../img/shopping-1165437.jpg';

import Header from '../components/Header3';
import i1 from '../img/snacks/snacks.png';
import i2 from '../img/fruits/fruit.png';
import i3 from '../img/vegetables/veg.png';
import i4 from '../img/drinks/bev.png';
import i5 from '../img/dairy/meat.png';
import i6 from '../img/sanitizing/soap.png';
import i7 from '../img/dairy/dairy.png';

import p1 from '../img/dairy/whole fish.png';
import p2 from '../img/vegetables/red onion.png';
import p3 from '../img/dairy/whole chicken.png';
import p4 from '../img/fruits/oranges.png';
import p5 from '../img/drinks/coca 500ml.png';
import p6 from '../img/snacks/sunchips blue.png';

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
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const randomProducts = generateRandomProducts();

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <div className="relative top-0 left-0 mb-2 w-full h-fit">
          <img
            src={myImage}
            alt="Background"
            className="w-full h-fit object-cover transform -scale-x-100"
            style={{ maxHeight: '660px' }}
          />
        </div>
        <div className="bg-black bg-opacity-40 absolute top-0 h-full left-0 w-full py-4"></div>

        <div className="absolute right-2 flex flex-col justify-end items-end bottom-48 mx-2">
          <p className="text-white font-bold text-3xl text-center pb-3 w-2/3">
            Elevate Your Shopping Experience with Our Vast Selection
          </p>
          <p className="text-white font-bold text-xl pb-4 text-center w-2/3">
            Competitive Prices, Stellar and Fast Service
          </p>
          <div className="relative w-2/3 top-6 my-2">
            <input
              type="text"
              className="rounded-l-full lg:h-16 md:h-16 sm:h-10 py-2 px-4 sm:pr-12 w-full relative right-10 text-white bg-white bg-opacity-10 focus:outline-none focus:border-green-500 border-green-500"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute right-0 top-0 mt-3 mr-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-white text-opacity-60"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto py-6">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filteredCategories.map((category) => (
      <div
        key={category.name}
        className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg py-6 px-4 hover:shadow-xl transition duration-300"
      >
        <Link to={`/${category.name}`}>
          <div className="relative w-32 h-32">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl font-bold">{category.name}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>

<div className="text-2xl font-bold mt-12 mb-8 text-center">Featured Products</div>

            <div className="flex  justify-center items-center bg-white rounded-lg shadow-md py-10">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
    {randomProducts.map((product) => (
<div key={product.id} className={`border p-4 rounded-lg hover:shadow-lg transition-shadow ${ selectedCategory === product.product ? 'border-4 border-green-500' : '' }`} onClick={() => handleCategoryClick(product.product)} > 
<div className="relative p-2 "> 
<img src={product.product.image} alt={product.product.name} className="w-full h-64 object-cover" /> 
</div> <div className="p-4 flex flex-col justify-items-center"> <h3 className="text-xl font-bold text-center mb-2">{product.product.name}</h3>
 <p className="text-gray-700 font-bold text-center mt-2">{product.product.price.toFixed(2)} Birr</p> <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-48">Add to Cart<FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 px-2 relative top-1" />
 </button> 
 </div>
 
 </div> ))} 
</div> 
</div>
        </div>
      </div>
     
    </>
  );
};

export default Home;