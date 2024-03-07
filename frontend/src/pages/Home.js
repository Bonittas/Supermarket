import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from '../img/bg/p2.png';
import Header from "../components/Header3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ad from '../img/items/ad.jpg';
import '../styles/animation.css'; // Add this file for animation styles
import {  categories } from './categories/Category';

const Home = () => {
  const [category, setcategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchcategory();
    fetchFeaturedProducts();
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setcategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get("/api/products/featured");
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = category.find((category) => category._id === categoryId);
    setEditingCategory(categoryToEdit);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryName", editingCategory.categoryName);
      formData.append("image", editingCategory.image);

      const response = await axios.put(`/api/category/${editingCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchcategory();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingCategory((prevCategory) => ({
      ...prevCategory,
      image: file,
    }));
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/category/${categoryId}`);
      fetchcategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredcategory = category.filter(category => {
    return category.categoryName && category.categoryName.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });
  

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r h-400 from-yellow-100 to-green-200 relative"       style={{ maxHeight: '470px', marginLeft: 'auto' }}
>


      <div className="h-400">
      <div className="fixed w-1/2 left-32 top-8  z-40  flex">
        <input
          type="text"
          className="rounded-l-full lg:h-12 md:h-12 sm:h-10 py-2 px-4 sm:pr-12 w-full relative right-8 text-white bg-white focus:outline-none focus:border-green-500 border-2 border-green-700"
          placeholder="Search for category..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ color: 'white' }}
        />
        <button
          className="bg-yellow-600 rounded-r-full p-1 flex items-center justify-center"
          style={{ minWidth: '3rem', marginLeft: '-2rem' }}
        >
          <FontAwesomeIcon icon={faSearch} className="text-white " />
        </button>
      </div>

  <div className="flex flex-col w-1/2 justify-start items-start mx-2 h-auto relative top-24 left-20">
    <p className="text-green-800 font-bold text-3xl text-center pb-3 ">
      Elevate Your  
      
    <span className="px-2 text-yellow-600">Shopping</span> Experience with Our Vast Selection</p>
      <p className="text-green-700 font-bold text-xl text-center pb-3 ">
      {/* <p className="text-green-700 font-bold text-lg pb-4 text-center mx-4">
      Get Fresh Groceries At Your Doorsteps    </p> */}
    </p>
    
    <p className="text-green-700 font-bold text-xl pb-4 text-center mx-4">
      Competitive Prices, Stellar Time Consuming and Fast Service
    </p>
    <div className="flex items-center text relative left-36 justify-center">
<div className="container">
    <button className="bg-yellow-600 p-3 my-4 mr-5 font-bold  rounded-md text-white ">Shop with Us</button>
    <button className="bg-white p-3 my-4 font-bold rounded-md text-yellow-600 "> <Link to='/contact'>Contact Us</Link></button>
    </div>
    </div>
    </div>
  </div>
  <div className="relative -top-48 right-24  w-full ml-2 ">
    <img
      src={myImage}
      alt="Background"
      className="w-500 h-full move-up-down"
      style={{ maxHeight: 'auto', maxWidth: 'auto' }}
    />
  </div>
</div>
  
      <div className="container flex mx-6 py-6">
      <div className="bg-yellow-50 min-h-screen pt-6">
        <div className="flex">
          <div className="w-1/3  p-4 m-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories &&
                categories.map((category, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-4 font-cursive font-bold text-lg hover:bg-green-200 transition-colors"
                  >
                    <Link to={`/${category.name}`}>{category.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          </div>
          </div>

        <div className="bg-gradient-to-r from-yellow-50 to-green-200 w-full min-h-screen p-6 shadow-md m-5">
        <h2 className="text-2xl text-center w-full font-bold ">Top category</h2>

  <div className="w-full mx-auto mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
      {filteredcategory.map((category) => (
        <div
          key={category._id}
          className="relative overflow-hidden rounded-full m-2 shadow-lg transition-transform transform hover:scale-105 duration-300"
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          <div className="aspect-w-1 aspect-h-1 m-4">
            <div className="rounded-full overflow-hidden">
              <Link to={`/${category.categoryName}`}>
                <img
                  src={`/uploads/category/${category.categoryImage}`}
                  alt={category.categoryName}
                  className="object-cover w-full h-full"
                />
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-700 to-transparent p-4">
            <Link to={`/${category.categoryName}`}>
              <p className="text-white text-center text-lg font-semibold">
                {category.categoryName}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>

      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              classNames="fade"
              timeout={300}
            >
              <div
                className="bg-white p-4 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={`/uploads/${product.categoryName}/${product.image}`}
                  alt={product.name}
                  className="mb-2 h-56 rounded-lg object-cover"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="text-green-500 hover:underline block mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
