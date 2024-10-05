import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, [page, limit, searchQuery]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/lists", {
        params: { searchQuery, page, limit },
      });
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category._id === categoryId
    );
    setEditingCategory(categoryToEdit);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleEditSave = async () => {
    try {
      console.log("Category ID:", editingCategory._id);
      console.log("Category Image:", editingCategory.categoryImage);

      const formData = new FormData();
      formData.append("categoryName", editingCategory.categoryName);

      if (editingCategory.image) {
        formData.append("image", editingCategory.image);
      }

      console.log("FormData content:", [...formData.entries()]);

      const response = await axios.patch(
        `/api/category/${editingCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Successfully updated category!", response.data);

      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingCategory((prevCategory) => ({
      ...prevCategory,
      image: file,
    }));
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/category/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 h-auto px-4 pb-6 pt-2 border rounded-lg shadow-lg mx-auto my-2">
        <div className="w-full mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            All Categories
          </h2>
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search categories"
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
          {categories.length === 0 ? (
            <p className="text-center text-gray-600">No categories found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-2 border-b text-left">No</th>
                  <th className="py-2 px-2 border-b text-left">
                    Category Name
                  </th>
                  <th className="py-2 px-2 border-b text-left">
                    Category Images
                  </th>
                  <th className="py-2 px-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category._id}>
                    <td className="py-2 px-2 border-b text-left">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b text-left">
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <input
                          type="text"
                          value={editingCategory.categoryName}
                          onChange={(e) =>
                            setEditingCategory({
                              ...editingCategory,
                              categoryName: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <span>{category.categoryName}</span>
                      )}
                    </td>
                    <td className="py-2 px-2 border-b text-left">
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <input
                          type="file"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="w-full"
                        />
                      ) : (
                        <img
                          key={category._id}
                          src={`${apiUrl}/uploads/category/${category.categoryImage}`}
                          alt={category.categoryName}
                          className="max-h-24 max-w-24"
                        />
                      )}
                    </td>
                    <td className="py-2 px-2 border-b text-left">
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <>
                          <button
                            className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                            onClick={handleEditSave}
                          >
                            Save
                          </button>
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
                            onClick={() => handleEditCategory(category._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-red-600 transition-colors"
                            onClick={() => handleDeleteCategory(category._id)}
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
          )}
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

export default CategoryList;
