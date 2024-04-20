// Fruit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../SearchBar";
import Header from "../../components/Header3";
import Cart from "../Cart"; // Assuming the Cart component is correctly connected to Redux
import { removeFromCart } from "../../features/cart/cartSlice"; // Import removeFromCart action
import { useDispatch } from 'react-redux'; // Import useDispatch

const Fruit = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    fetchFruitProducts();
  }, []);

  const handleDeleteItem = (itemName) => {
    try {
      dispatch(removeFromCart(itemName.trim())); // Dispatch removeFromCart action
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      // Handle the error (e.g., display a message to the user)
    }
  };

  const fetchFruitProducts = async () => {
    try {
      const response = await axios.get("/api/products/list");
      const fruitProducts = response.data
        .filter((product) => product.categoryName.toLowerCase() === "vegetables")
        .map((product) => ({ ...product, id: product._id }));

      setProducts(fruitProducts);
    } catch (error) {
      console.error("Error fetching fruit products:", error);
    }
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product._id);
    let updatedCartItems = [];

    if (existingItemIndex !== -1) {
      updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
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

  const isSmallScreen = window.innerWidth < 768;
  const itemsPerPageForScreen = isSmallScreen ? 4 : 8;

  const indexOfLastProduct = currentPage * itemsPerPageForScreen;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPageForScreen;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
      <section id="Categories" className="container mx-auto md:px-10 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="shadow-lg p-4 md:w-1/5 md:h-screen order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 text-center">Categories</h2>
            <ul className="flex flex-wrap md:flex-col md:space-x-2">
              {/* Categories rendering code */}
            </ul>
          </div>

          <div className="w-full md:w-4/5 py-4 pl-6 order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4">Vegetable Products</h2>
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
              {/* Pagination rendering code */}
            </div>
          </div>
        </div>
      </section>
      <Cart cartItems={cartItems}  handleDeleteItem={handleDeleteItem} />
    </>
  );
};

export default Fruit;
