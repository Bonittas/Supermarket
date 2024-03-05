// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from '../img/shopping-1165437.jpg';
import Header from "../components/Header3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faArrowCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductListByCategory from "./admin/ProductListByCategory";
import ad from '../img/items/ad.jpg';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get("/api/products/featured");
      console.log("Featured Products Response:", response); // Log the entire response
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };
  
  
  
  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);
  
  useEffect(() => {
    console.log("Featured Products:", featuredProducts);
  }, [featuredProducts]);
  
  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find((category) => category._id === categoryId);
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

      console.log("FormData content:", [...formData.entries()]);

      const response = await axios.put(`/api/category/${editingCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Successfully updated category!", response.data);

      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error
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
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredCategories = categories.filter(category => {
    return category.categoryName && category.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

        <div className="absolute right-2 flex flex-col justify-end items-end bottom-32 mx-2">
          <p className="text-white font-bold text-3xl text-center pb-3 w-2/3">
            Elevate Your Shopping Experience with Our Vast Selection
          </p>
          <p className="text-white font-bold text-xl pb-4 text-center w-2/3">
            Competitive Prices, Stellar and Fast Service
          </p>
          <div className="relative w-2/3 top-6 my-2">
            <div className="flex">
              <input
                type="text"
                className="rounded-l-md lg:h-16 md:h-16 sm:h-10 py-2 px-4 sm:pr-12 w-full relative right-8 text-white bg-white bg-opacity-40 focus:outline-none focus:border-green-500 border-green-500"
                placeholder="Search for Categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ color: "black" }}
              />
              <button
                className="bg-green-700 rounded-r-md p-6 flex items-center justify-center"
                style={{ minWidth: "3rem", marginLeft: "-2rem" }}
              >
                <FontAwesomeIcon icon={faSearch} className="text-white " />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex mx-auto py-6">
        <div className="flex">
          <div className="bg-green w-96 mr-8 border rounded-md flex items-start">
            <img src={ad} alt="ad" className="w-full h-full rounded-md object-cover" />
          </div>
        </div>

        <div className="bg-green-50  min-h-screen p-6 shadow-md m-5">
          <div className="w-full mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="relative overflow-hidden m-2 rounded-full shadow-lg"
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
                      <p className="text-white text-center text-lg font-semibold">{category.categoryName}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display Featured Products */}
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              <img
                src={`/uploads/${product.categoryName}/${product.image}`}
                alt={product.name}
                className="mb-2 h-56 rounded-lg"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <Link to={`/products/${product._id}`} className="text-green-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
