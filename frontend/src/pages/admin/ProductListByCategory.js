// ProductListByCategory.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductListByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryName]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(`/api/products/list?category=${categoryName}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
      <div className="w-full mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">{categoryName} Products</h2>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
              <img
                src={`/uploads/${product.categoryName}/${product.image}`}
                alt={product.name}
                className="mb-2 h-56 rounded-lg cursor-pointer"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                // You can add an onClick handler here if needed
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListByCategory;
