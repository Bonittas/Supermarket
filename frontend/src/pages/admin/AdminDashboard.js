// Import necessary modules and components
import React, { useState } from "react";
import CategoryForm from "./CategoryCreate";
import CategoryList from "./CategoryList";
import ProductForm from "./ProductCreate";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
import ViewOrders from "./ViewOrders";
// Category Navigation Component
const CategoryNavigation = ({ onSelectSection }) => {
  return (
    <div className="lg:w-1/4 md:w-1/5 sm:w-1/5 my-2 bg-white p-4 shadow-md rounded-md">
      <ul className="space-y-1">
        <li
          className="cursor-pointer text-green-600 hover:text-green-800 font-semibold transition duration-300"
          onClick={() => onSelectSection("productList")}
        >
          Product List
        </li>
        <li
          className="cursor-pointer text-green-600 hover:text-green-800 font-semibold transition duration-300"
          onClick={() => onSelectSection("createProduct")}
        >
          Create Product
        </li>
        <li
          className="cursor-pointer text-green-600 hover:text-green-800 font-semibold transition duration-300"
          onClick={() => onSelectSection("categoryList")}
        >
          Category List
        </li>
        <li
          className="cursor-pointer text-green-600 hover:text-green-800 font-semibold transition duration-300"
          onClick={() => onSelectSection("createCategory")}
        >
          Create Category
        </li>
        <li
          className="cursor-pointer text-green-600 hover:text-green-800 font-semibold transition duration-300"
        >
                    <Link to ='/vieworders'>View Orders</Link>

        </li>
      </ul>
    </div>
  );
};

// Admin Component
const Admin = () => {
  const [currentSection, setCurrentSection] = useState("productList");

  const renderAdminSection = () => {
    switch (currentSection) {
      case "createCategory":
        return <CategoryForm />;
      case "createProduct":
        return <ProductForm />;
      case "categoryList":
        return <CategoryList />;
      case "productList":
      default:
        return <ProductList />;
    }
  };

  const handleSelectSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <>
      <div className="flex justify-between min-h-screen bg-green-50 p-4">
        <CategoryNavigation onSelectSection={handleSelectSection} />
        <div className="bg-green-50 min-h-screen w-full p-8">
          <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
          <div>{renderAdminSection()}</div>
        </div>
      </div>
    </>
  );
};

export default Admin;