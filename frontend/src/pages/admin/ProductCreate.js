import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [error, setError] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    categoryName: "",
    quantity: "",
    isFeatured: false,
  });

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setIsFeatured(!isFeatured);
    setNewProduct({ ...newProduct, isFeatured: !isFeatured });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);
      formData.append("categoryName", newProduct.categoryName);
      formData.append("quantity", newProduct.quantity);
      formData.append("isFeatured", newProduct.isFeatured);

      await axios.post("/api/product", formData);

      setNewProduct({
        name: "",
        price: "",
        image: null,
        categoryName: "",
        quantity: "",
        isFeatured: false,
      });
      setError("");
      setSuccessMessage("Product created successfully!");
    } catch (error) {
      setError("Error creating product");
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 h-auto px-4 pb-6 pt-2 border rounded-lg shadow-lg mx-auto my-2">
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
                className="mt-1 block w-1/3 rounded-md border-2 border-gray-400 focus:border-green-500"
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
                className="mt-1 block w-1/3 rounded-md border-2 border-gray-400 focus:border-green-500"
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
                className="mt-1 block w-1/3 rounded-md border-2 border-gray-400 focus:border-green-500"
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
                className="mt-1 block w-1/3 rounded-md border-2 border-gray-400 focus:border-green-500"
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
            <label>
                Featured:
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Product
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;