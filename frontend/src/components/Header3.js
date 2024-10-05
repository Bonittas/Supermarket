import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCartShopping,
  faChevronDown,
  faUser, // Import the faUser icon
} from "@fortawesome/free-solid-svg-icons";

function Header({ handleMenuToggle, isMenuOpen }) {
  const [activePage, setActivePage] = useState("");
  const [scrollPos, setScrollPos] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const currentPath = location.pathname;
  useEffect(() => {
    setActivePage(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const onScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className={`sticky top-0 flex justify-between items-center h-24 z-20 px-14 ${
        scrollPos > 50
          ? "bg-green-50 shadow h-24"
          : "bg-gradient-to-r from-yellow-50 to-green-200"
      } ${
        scrollPos > 50
          ? "text-green-600 font-bold"
          : "text-yellow-600 font-bold"
      }`}
    >
      <div className="">
        <Link to="/">
          <p className="flex flex-col text-xl text-center font-cursive">
            <FontAwesomeIcon icon={faCartShopping} className="w-10 h-10" />
            <span className=""></span>Dalas
          </p>
        </Link>
      </div>
      <div className="flex items-center ml-auto space-x-4 z-20">
        <nav className="z-20 hidden sm:flex sm:justify-between space-x-4 text-sm">
          {["/", "/about", "/contact"].map((page) => (
            <Link
              key={page}
              to={page}
              onClick={() => handlePageChange(page)}
              className={`hover:bg-green-500 hover:bg-opacity-10 px-2 rounded-full ${
                activePage === page ? "active" : ""
              }`}
              style={
                activePage === page
                  ? { textUnderlineOffset: "rgb(110, 20, 180)" }
                  : null
              }
            >
              {page === "/"
                ? "Home"
                : page.slice(1).charAt(0).toUpperCase() + page.slice(2)}
            </Link>
          ))}

          {/* Products dropdown */}
          <div className="relative inline-block text-sm">
            <span className="cursor-pointer" onClick={toggleDropdown}>
              <Link to="/" className="block text-yellow hover:text-green-400">
                Products
              </Link>
            </span>
            {isDropdownOpen && (
              <div className="absolute bg-white w-40 h-20 mt-2 px-3 space-y-2">
                {/* Add your dropdown links here */}
              </div>
            )}
          </div>

          {/* Our Services */}
          <Link
            to="/services"
            onClick={() => handlePageChange("/services")}
            className={`hover:bg-green-500 hover:bg-opacity-10 px-2 rounded-full ${
              activePage === "/services" ? "active" : ""
            }`}
            style={
              activePage === "/services"
                ? { textUnderlineOffset: "rgb(110, 20, 180)" }
                : null
            }
          >
            Our Services
          </Link>
        </nav>

   

        <div className="sm:hidden">
          <button
            className="hover:text-white focus:outline-none"
            onClick={handleMenuToggle}
          >
            <div className="absolute top-8 right-8">
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
              )}
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-green-600 fixed inset-0 z-50 bg-opacity-10">
          <div className="flex justify-end p-4">
            <button
              className="text-white focus:outline-none"
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
          <nav className="px-4 py-2 space-y-4">
            {["/", "/about", "/contact"].map((page) => (
              <Link
                key={page}
                to={page}
                onClick={() => {
                  handlePageChange(page);
                  handleMenuToggle();
                }}
                className="block text-white hover:text-white"
              >
                {page === "/"
                  ? "Home"
                  : page.slice(1).charAt(0).toUpperCase() + page.slice(2)}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative text-white">
              <span className="cursor-pointer">Products</span>
              <div className="hidden absolute bg-green-600 w-40 mt-2 space-y-2">
                <Link
                  to="/products"
                  className="block text-white hover:text-white"
                >
                  Featured Product
                </Link>
                <Link
                  to="/products"
                  className="block text-white hover:text-white"
                >
                  New Offers
                </Link>
              </div>
            </div>

            {/* Our Services */}
            <Link
              to="/services"
              onClick={() => {
                handlePageChange("/services");
                handleMenuToggle();
              }}
              className="block text-white hover:text-white"
            >
              Our Services
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
