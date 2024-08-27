import React, { useState, useEffect } from "react";
import Header from "../components/Header3";
import Search from "../Search";
import axios from "axios";

const Admin = ({ cartItems, setCartItems }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    categoryName: "",
    quantity: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log(`Added ${product.name} to cart`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedProductId) {
        // Update existing product
        await axios.put(`/api/product/${selectedProductId}`, newProduct);
        setSelectedProductId(null); // Clear selected product after update
      } else {
        // Create new product
        await axios.post("/api/products", newProduct);
      }

      fetchProducts();
      setNewProduct({
        name: "",
        price: "",
        image: "",
        categoryName: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error creating/updating product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName,
      quantity: product.quantity,
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = selectedCategory
    ? filteredProducts.filter(
        (product) => product.categoryName === selectedCategory
      )
    : filteredProducts;

  return (
    <>
      <Header />
      <div className="fixed top-4 left-48 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20 my-2">
        <Search onSearch={handleSearch} />
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-green-50 min-h-screen pt-6">
        <div className="flex">
          <div className="w-3/4 p-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory ? `${selectedCategory} Products` : "All Products"}
            </h2>
            <div className="grid grid-cols-3 gap-4 h-3/4">
              {displayedProducts.map((product, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 h-56 rounded-lg"
                  />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 mt-2 ml-2 rounded-lg hover:bg-yellow-600 transition-colors"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 ml-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;