import React, { useState, useEffect } from "react";
import Header from "../../components/Header3";
import axios from "axios";

// EditProductForm component for editing product details
const EditProductForm = ({ product, onEdit }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEditChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update product details
      const response = await axios.patch(`/api/product/${product._id}`, editedProduct);

      // Notify the parent component about the edited product
      onEdit(response.data);

      // Reset form after successful edit
      setEditedProduct({ ...product });
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
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
          className="form-input mt-1 block w-full"
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
          className="form-input mt-1 block w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="editCategoryName" className="block text-gray-700 font-bold">
          Category Name
        </label>
        <input
          type="text"
          id="editCategoryName"
          name="categoryName"
          value={editedProduct.categoryName}
          onChange={handleEditChange}
          className="form-input mt-1 block w-full"
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
          className="form-input mt-1 block w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEditProduct = (productId) => {
    // Set the product being edited
    const productToEdit = products.find((product) => product._id === productId);
    setEditingProduct(productToEdit);
  };

  const handleCancelEdit = () => {
    // Cancel the edit mode
    setEditingProduct(null);
  };

  const handleEditSave = (editedProduct) => {
    // Update the products list with the edited product
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );

    // Cancel the edit mode
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
        <div className="w-full mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.categoryName}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {editingProduct && editingProduct._id === product._id ? (
                      <>
                        <EditProductForm product={editingProduct} onEdit={handleEditSave} />
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
        </div>
      </div>
    </>
  );
};

export default ProductList;
