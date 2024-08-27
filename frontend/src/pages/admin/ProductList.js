import React, { useState, useEffect } from "react";
import axios from "axios";

// EditProductForm component for editing product details
const EditProductForm = ({ product, onEdit }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [imageFile, setImageFile] = useState(null);

  const handleEditChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("price", editedProduct.price);
      formData.append("categoryName", editedProduct.categoryName);
      formData.append("quantity", editedProduct.quantity);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `/api/product/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onEdit(response.data);
      setEditedProduct({ ...product });
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className="shadow-md p-4 bg-white rounded mb-2"
    >
      <div className="mb-2">
        <label htmlFor="editName" className="block text-gray-700 font-bold">
          Name
        </label>
        <input
          type="text"
          id="editName"
          name="name"
          value={editedProduct.name}
          onChange={handleEditChange}
          className="mt-1 border border-gray-400 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="editPrice" className="block text-gray-700 font-bold">
          Price
        </label>
        <input
          type="number"
          id="editPrice"
          name="price"
          value={editedProduct.price}
          onChange={handleEditChange}
          className="mt-1 border border-gray-400 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          required
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="editCategoryName"
          className="block text-gray-700 font-bold"
        >
          Category Name
        </label>
        <input
          type="text"
          id="editCategoryName"
          name="categoryName"
          value={editedProduct.categoryName}
          onChange={handleEditChange}
          className="mt-1 border border-gray-400 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="editQuantity" className="block text-gray-700 font-bold">
          Quantity
        </label>
        <input
          type="number"
          id="editQuantity"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleEditChange}
          className="mt-1 border border-gray-400 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="editImage" className="block text-gray-700 font-bold">
          Image
        </label>
        <input
          type="file"
          id="editImage"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 border border-gray-400 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full hover:bg-yellow-600 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
};

// ProductList component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page, limit, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products/lists", {
        params: { searchQuery, page, limit },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditingProduct(productToEdit);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleEditSave = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 h-auto px-4 pb-6 pt-2 border rounded-lg shadow-lg mx-auto my-2">
        <div className="w-full mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-400 rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-400 rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={30}>30 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b text-left">No</th>
                <th className="py-2 px-2 border-b text-left">Name</th>
                <th className="py-2 px-2 border-b text-left">Price</th>
                <th className="py-2 px-2 border-b text-left">Category</th>
                <th className="py-2 px-2 border-b text-left">Quantity</th>
                <th className="py-2 px-2 border-b text-left">Image</th>
                <th className="py-2 px-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="py-2 px-2 border-b text-left">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="py-2 px-2 border-b text-left">
                    {product.name}
                  </td>
                  <td className="py-2 px-2 border-b text-left">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 border-b text-left">
                    {product.categoryName}
                  </td>
                  <td className="py-2 px-2 border-b text-left">
                    {product.quantity}
                  </td>
                  <td className="py-2 px-2 border-b text-left">
                    {product.image ? (
                      <img
                        src={`${apiUrl}/uploads/${product.categoryName}/${product.image}`}
                        alt={`Product ${product.name}`}
                        className="max-h-20 max-w-20"
                        onError={(e) => console.error("Image load error:", e)}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {editingProduct && editingProduct._id === product._id ? (
                      <>
                        <EditProductForm
                          product={editingProduct}
                          onEdit={handleEditSave}
                        />
                        <button
                          className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-gray-600 transition-colors"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                          onClick={() => handleEditProduct(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed hover:bg-gray-200"
                  : "bg-green-500"
              } text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed hover:bg-gray-200"
                  : "bg-green-500"
              } text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors`}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
