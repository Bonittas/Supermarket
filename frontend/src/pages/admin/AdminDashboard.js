import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryCreate";
import CategoryList from "./CategoryList";
import ProductForm from "./ProductCreate";
import ProductList from "./ProductList";
import ViewOrders from "./ViewOrders";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import {
  FaListAlt,
  FaServicestack,
  FaUser,
  FaUserCog,
  FaTags,
  FaHome,
  FaWrench,
  FaBars,
  FaRegQuestionCircle,
  FaCross,
  FaOpencart,
} from "react-icons/fa";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DrawerComponent = ({ open, onClose, onSelectSection }) => {
  const handleDrawerToggle = () => onClose(!open);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-700 transition-all duration-200 ease-in-out transform ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col justify-between h-full py-4 pr-4 pl-2">
        <div>
          <button
            className="text-white text-xl px-4 py-2 text-left hover:text-green-500 transition-all duration-200 ease-in-out"
            onClick={handleDrawerToggle}
          >
            {open ? <FontAwesomeIcon
                      icon={faClose}
                      className=" text-gray-200 font-thin text-2xl hover:text-red-500 text-center cursor-pointer focus:outline-none"
                    /> : <FaBars />}
          </button>
          <nav className="flex flex-col justify-between mt-8">
            {[
              {
                text: "Product List",
                icon: <FaListAlt />,
                section: "productList",
              },
              {
                text: "Create Product",
                icon: <FaWrench />,
                section: "createProduct",
              },
              {
                text: "Category List",
                icon: <FaTags />,
                section: "categoryList",
              },
              {
                text: "Create Category",
                icon: <FaTags />,
                section: "createCategory",
              },
              {
                text: "View Orders",
                icon: <FaOpencart />,
                section: "ViewOrders",
              },
              {
                text: "Feedback",
                icon: <FaServicestack />,
                section: "Feedback",
              },
            ].map((item, index) => (
              <button
                key={index}
                className={`block px-4 py-2 text-gray-200 hover:bg-green-700 hover:rounded-lg w-full text-left text-lg`}
                onClick={() => onSelectSection(item.section)}
                title={open ? "" : item.text}
              >
                <span className="inline-block mr-2">{item.icon}</span>
                {open && item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [currentSection, setCurrentSection] = useState("productList");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSelectSection = (section) => {
    setCurrentSection(section);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const renderAdminSection = () => {
    switch (currentSection) {
      case "createCategory":
        return <CategoryForm />;
      case "createProduct":
        return <ProductForm />;
      case "categoryList":
        return <CategoryList />;
      case "ViewOrders":
        return <ViewOrders />;
      case "Feedback":
        return <Feedback />;
      case "productList":
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="flex flex-col justify-between space-y-16">
      <header
        className={`bg-gray-700 py-4 fixed top-0 right-0 h-16 px-4 shadow-md ${
          openDrawer
            ? "left-64 transition-all duration-200"
            : "left-20 transition-all duration-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <div>
        <DrawerComponent
          open={openDrawer}
          onClose={setOpenDrawer}
          onSelectSection={handleSelectSection}
        />
        <main
          className={`transition-all duration-200 ease-in-out ${
            openDrawer
              ? "ml-64 transition-all duration-200"
              : "ml-20 transition-all duration-200"
          }`}
        >
          {renderAdminSection()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
