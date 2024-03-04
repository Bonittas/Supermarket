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
  const handleEditSave = async () => {
    try {
      console.log('Category ID:', editingCategory._id);
      console.log('Category Image:', editingCategory.categoryImage); 
  
      const formData = new FormData();
      formData.append('categoryName', editingCategory.categoryName);
  
      if (editingCategory.image) {
        formData.append('image', editingCategory.image);
      }
  
      console.log('FormData content:', [...formData.entries()]);
  
      const response = await axios.patch(`/api/category/${editingCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Successfully updated category!', response.data);
  
      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
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
      <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
        <div className="w-full mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">All Categories</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Category Name</th>
                <th className="py-2 px-4 border-b">Images</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {editingCategory && editingCategory._id === category._id ? (
                      <input
                        type="text"
                        value={editingCategory.categoryName}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            categoryName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span>{category.categoryName}</span>
                    )}
                  </td>
                  <td className="py-2 pl-48 border-b">
                    {editingCategory && editingCategory._id === category._id ? (
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    ) : (
                      <img
                        key={category._id}
                        src={`/uploads/category/${category.categoryImage}`}
                        alt={category.categoryName}
                        className="max-h-20 max-w-20"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {editingCategory && editingCategory._id === category._id ? (
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
        </div>
      </div>
    </>
  );
};

export default CategoryList;
