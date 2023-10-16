import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faArrowCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import 'tailwindcss/tailwind.css';
import myImage from '../img/shopping-1165437.jpg';
import ad from '../img/items/ad5.jpg';
import Header from '../components/Header3';
import i1 from '../img/snacks/snacks.png';
import i2 from '../img/fruits/fruit.png';
import i3 from '../img/vegetables/veg.png';
import i4 from '../img/drinks/bev.png';
import i5 from '../img/dairy/meat.png';
import i6 from '../img/sanitizing/soap.png';
import i7 from '../img/dairy/dairy.png';

import p1 from '../img/dairy/eggs.png';
import p2 from '../img/vegetables/tomato.png';
import p3 from '../img/dairy/chicken drumsticks.png';
import p4 from '../img/fruits/grapes.png';
import p5 from '../img/drinks/coca 500ml.png';
import p6 from '../img/snacks/sunchips blue.png';
import p7 from '../img/sanitizing/laundry soap.png';
import p8 from '../img/snacks/nutella.png';

const categories = [
  { name: 'Fruits', image: i2 },
  { name: 'Vegetables', image: i3 },
  { name: 'Dairy', image: i7 },
  { name: 'Snacks', image: i1 },
  { name: 'Beverages', image: i4 },
  { name: 'Meat', image: i5 },
  { name: 'Sanitizers', image: i6 },
];

const products = [
  { name: 'Eggs', image: p1, price: 12,link:'/Dairy' },
  { name: 'Sunchips', image: p6, price: 25,link:'/Snacks' },
  { name: 'Chicken Drumsticks', image: p3, price: 110,link:'/Dairy' },
  { name: 'Grapes', image: p4, price: 60,link:'/Fruits' },
  { name: 'Drinks', image: p5, price: 25,link:'/Drinks' },
  { name: 'Tomato', image: p2, price: 45,link:'/Vegetables' },
  { name: 'Laundry Soap', image: p7, price: 30 ,link:'/Vegetables'},
  { name: 'Nutella', image: p8, price: 75 ,link:'/Snacks' },

];

const generateRandomProducts = () => {
  const randomProducts = [];
  const selectedImages = [];

  for (let i = 1; i <= 8; i++) {
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
<div className="bg-gray-100  w-full">
  <div className="relative top-0 left-0 mb-2  h-fit">
    <img
      src={myImage}
      alt="Background"
      className="w-full h-fit object-cover transform -scale-x-100"
      style={{ maxHeight: '660px' }}
    />
  </div>
  <div className="bg-black bg-opacity-40 absolute top-0 h-fit left-0 w-full py-4"></div>

  <div className="absolute right-2 flex flex-col justify-end items-end top-32 sm:top-32 md:top-72 lg:top-80 mx-2">
    <p className="text-white font-bold lg:text-3xl md:text-xl sm:text-lg text-center pb-1 sm:w-3/4 md:w-2/3 lg:w-2/3">
      Elevate Your Shopping Experience with Our Vast Selection
    </p>
    <p className="text-white font-bold lg:text-xl md:text-lg sm:text-sm pb-1 text-center  sm:w-3/4 md:w-2/3 lg:w-2/3">
      Competitive Prices, Stellar and Fast Service
    </p>
    <div className="relative  w-full lg:w-2/3 top-1  sm:top-0 h-auto mb-2">
      <div className="flex sm:items-center sm:justify-center h-10 lg:h-16">
        <input
          type="text"
          className="rounded-l-md  py-2 px-4 sm:pr-12 w-full text-white bg-white bg-opacity-40 focus:outline-none focus:border-green-500 border-green-500"
          placeholder="Search for Categories..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ color: "black" }}
        />
        <button
          className="bg-green-700   rounded-r-md p-5 sm:p-3 md:p-3 flex items-center justify-center"
          style={{ minWidth: "3rem", marginLeft: "-2rem" }}
        >
          <FontAwesomeIcon icon={faSearch} className="text-white" />
        </button>
      </div>
    </div>
  </div>

<div className=" w-full py-6">
  <div className="flex flex-col md:flex-row mx-2">
    <div className="bg-green flex flex-col relative left-10 justify-start w-80  border rounded-md ">
      <img src={ad} alt="add" className="w-full h-full rounded-md object-cover" />
    </div>
    <div className='flex flex-col justify-center items-center mx-4 relative left-10'>
  <p className="text-black text-center font-bold text-2xl">Top Categories</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 ">
    {filteredCategories.map((category) => (
      <div
        key={category.name}
        className="relative overflow-hidden m-2 rounded-full shadow-lg"
        style={{
          width: '200px',
          height: '200px',
        }}
      >
        <div className="aspect-w-1 aspect-h-1 m-4">
          <div className="rounded-full overflow-hidden">
            <Link to={`/${category.name}`}>
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-700 to-transparent p-4">
          <Link to={`/${category.name}`}>
            <p className="text-white text-center text-lg font-semibold">{category.name}</p>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
  </div>
</div>
<div className="mx-10">
  <h2 className="text-2xl font-bold mt-12 mb-8 text-center">Featured Products</h2>
  <div className="flex items-center justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className={`product border p-4 m-4 mx-2 rounded-lg hover:shadow-lg transition-shadow ${
            selectedCategory === product.name ? 'border-4 border-green-500' : ''
          }`}
          onClick={() => (window.location.href = product.link)}
        >
          <div className="relative w-full">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
          </div>
          <div className="p-4 flex justify-end items-end h-1 mt-6">
            <h3 className="text-xl font-bold text-end mb-2">{product.name}</h3>
            <button className="text-green-700 rounded-full px-2">
              <FontAwesomeIcon icon={faArrowCircleRight} className="w-8 h-8 mt-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
      
    </>
  );
};

export default Home;