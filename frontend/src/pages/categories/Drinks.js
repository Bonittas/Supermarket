import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../SearchBar";
import Header from "../../components/Header3";
import Cart from "../Cart";
import { categories } from "./Category";
import Footer from "../../components/Footer";

const Fruit = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchFruitProducts();
  }, []);

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchFruitProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/list`);
      const fruitProducts = response.data
        .filter((product) => product.categoryName.toLowerCase() === "drinks")
        .map((product) => ({ ...product, id: product._id }));

      setProducts(fruitProducts);
    } catch (error) {
      console.error("Error fetching fruit products:", error);
    }
  };

  const handleAddToCart = (product) => {
    console.log("Before adding to cart:", cartItems);

    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCartItems.push({
        ...product,
        quantity: 1,
        id: product._id,
      });
    }

    setCartItems(updatedCartItems);
    console.log("After adding to cart:", updatedCartItems);
    console.log(`Added ${product.name} to cart`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!products) {
    return <p>Loading...</p>;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // Adjust items per page for small screens
   const isSmallScreen = window.innerWidth < 768; 
   const itemsPerPageForScreen = isSmallScreen ? 4 : 8;
  // Get current posts
  const indexOfLastProduct = currentPage * itemsPerPageForScreen;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPageForScreen;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

   // Create page numbers
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPageForScreen); i++) {
     pageNumbers.push(i);
   }
    
  return (
    <>
      <Header />
      <div className="fixed top-4 left-48 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20 my-2">
        <Search onSearch={handleSearch} />
      </div>
      <section
        id="Categories"
        className="md:px-5 bg-green-50"
      >
        <div className="flex flex-col md:flex-row">
          <div className="shadow-lg p-4 md:w-1/5 md:h-screen order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 text-center">Categories</h2>
            <ul className="flex flex-wrap md:flex-col md:space-x-2">
              {categories &&
                categories.map((category, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-4 font-cursive font-semibold text-gray-900 text-lg hover:bg-green-200 transition-colors"
                  >
                    <Link to={`/${category.name}`}>{category.name}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="w-full md:w-4/5 py-4 pl-6 order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4">Drink Products</h2>
            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-${isSmallScreen ? '2' : '4'}  gap-4`}>
              {currentProducts.map((product) => (
                 <div
                 key={product._id}
                 className={`border p-2 rounded-lg hover:shadow-lg transition-shadow text-center`}
               >
                    <img
                      src={`/uploads/${product.categoryName}/${product.image}`}
                      alt={product.name}
                      className={`mb-2 ${isSmallScreen? 'h-16': 'md:h-36 lg:h-40'} mx-auto rounded-lg cursor-pointer`}
                    />
                  <div className="flex space-x-12 mx-auto mb-2">
                    <h3 className="text-lg font-bold">
                      {product.name}
                     
                    </h3>
                    <p className="text-gray-500">
                      {product.price.toFixed(2)}{" "}
                      <span className="font-bold">Birr</span>{" "}
                    </p>
                  </div>

                  <button
                    className="bg-yellow-600 text-white px-4  py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
            <div className="pagination space-x-2 flex justify-center my-4 py-4">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={`${
                    currentPage === number
                      ? "bg-green-500 text-white"
                      : "bg-white text-green-500"
                  } px-4 py-2 border rounded-lg focus:outline-none`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
      <Footer />
    </>
  );
};

export default Fruit;
