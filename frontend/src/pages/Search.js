import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [category, setCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCategory = async (searchQuery) => {
    try {
      const response = await axios.get(`${apiUrl}/api/category/list?searchQuery=${searchQuery}`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/featured`);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  useEffect(() => {
    fetchCategory(searchQuery);
    fetchFeaturedProducts();
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (category && category.length > 0) {
      const filteredCategory = category.filter((category) => {
        const categoryNameMatch = category.categoryName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const filteredProducts = category.products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return categoryNameMatch || filteredProducts.length > 0;
      });
      setFilteredCategory(filteredCategory);
    }
  }, [category, searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className="px-4 py-2 border border-gray-300 rounded-md w-full"
      />

      {/* Render the filtered categories and featured products */}
      {filteredCategory.map((category) => (
        <div key={category.id}>
          <h2>{category.categoryName}</h2>
          {category.products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              {/* Render other product details */}
            </div>
          ))}
        </div>
      ))}
      {featuredProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {/* Render other featured product details */}
        </div>
      ))}
    </div>
  );
};

export default Search;