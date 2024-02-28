import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find((category) => category._id === categoryId);
    setEditingCategory(categoryToEdit);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleEditSave = async (editedCategory) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", editedCategory.categoryName);
      formData.append("image", editedCategory.image);

      const response = await axios.put(`/api/category/${editedCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Successfully updated category!", response.data);

      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
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
    <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
      <div className="w-full mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="py-2 px-4 border-b">{category.categoryName}</td>
                <td className="py-2 px-4 border-b">
                  <img src={`../../../../backend/uploads/category${category.categoryName}/${category.image}`} alt={category.name} />
                  </td>
                <td className="py-2 px-4 border-b">
                  {editingCategory && editingCategory._id === category._id ? (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                        onClick={() => handleEditSave(editingCategory)}
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
      </div>
    </div>
  );
};

export default CategoryList;
