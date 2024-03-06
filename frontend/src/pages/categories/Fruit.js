import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../Search";
import Header from "../../components/Header3";
import Cart from "../Cart";
import { categories } from "./Category";

const Fruit = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFruitProducts();
  }, []);

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const fetchFruitProducts = async () => {
    try {
      const response = await axios.get("/api/products/list");
      const fruitProducts = response.data
        .filter((product) => product.categoryName.toLowerCase() === "fruits")
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
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If the item is not in the cart, add it with quantity 1
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

  if (!products) {
    return <p>Loading...</p>;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="fixed top-4 left-48 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20 my-2">
        <Search onSearch={handleSearch} />
      </div>
      <div className="bg-green-50 min-h-screen pt-6">
        <div className="flex">
          <div className="w-1/4 bg-green-100 p-4 m-8 rounded-md">
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
          <div className="w-3/4 p-4">
            <h2 className="text-2xl font-bold mb-4">Fruit Products</h2>
            <div className="grid grid-cols-3 gap-4 h-3/4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <Link to={`/fruits/${product.id}`}>
                    <img
                      src={`/uploads/${product.categoryName}/${product.image}`}
                      alt={product.name}
                      className="mb-2 h-56 rounded-lg cursor-pointer"
                    />
                  </Link>
                  <h3 className="text-lg font-bold">
                    {product.name}
                    {cartItems.some((item) => item.id === product.id) && (
                      <span className="text-gray-500 ml-2">
                        (
                        {
                          cartItems.find((item) => item.id === product.id)
                            .quantity
                        }
                        )
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
    </>
  );
};

export default Fruit;
