import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    categoryName: "",
    quantity: "",
  });

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create new product
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);
      formData.append("categoryName", newProduct.categoryName);
      formData.append("quantity", newProduct.quantity);

      await axios.post("/api/product", formData);
      // Reset form after successful creation
      setNewProduct({
        name: "",
        price: "",
        image: null,
        categoryName: "",
        quantity: "",
      });
      setError("");
    } catch (error) {
      setError("Error creating product");
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 min-h-screen pt-6 shadow-md m-5 ">
        <div className="w-1/2 mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
          <form onSubmit={handleProductSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleProductChange}
                className="form-input mt-1 block w-2/4"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
                className="form-input mt-1 block w-2/4"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="form-input mt-1 block w-2/4"
                accept="image/*"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-gray-700 font-bold"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={newProduct.categoryName}
                onChange={handleProductChange}
                className="form-input mt-1 block w-2/4"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-bold"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleProductChange}
                className="form-input mt-1 block w-2/4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Product
            </button>
            {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
