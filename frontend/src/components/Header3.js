import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faUser,faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Header({ handleMenuToggle, isMenuOpen }) {
  const [activePage, setActivePage] = useState('');
  const location = useLocation();

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const currentPath = location.pathname;
  React.useEffect(() => {
    setActivePage(currentPath);
  }, [currentPath]);
  return (
    <header className=" shadow-lg sticky top-0 flex justify-between items-center z-20 bg-green-700 h-24 ">
     

        <div className="absolute top-1 p-2 left-3  border-1 border-green-300 rounded-full w-20  ">
          <p className="text-xl text-center  text-white font-cursive"><FontAwesomeIcon icon={faCartShopping} className="w-12 h-12" />
iShop</p>
        </div>
        <div className="flex items-center ml-auto space-x-4 z-20">
          <nav className="z-20 hidden sm:flex space-x-4 text-sm absolute top-10 right-64">
            <Link
              to="/"
              onClick={() => handlePageChange('/')}
              className={`text-white hover:bg-green-500 hover:bg-opacity-10 px-2 rounded-full ${
                activePage === '/' ? 'active' : ''
              }`}
              style={activePage === '/' ? { textUnderlineOffset: 'rgb(110, 20, 180)' } : null}
            >
              Products
            </Link>
           
            <Link
              to="/about"
              onClick={() => handlePageChange('/about')}
              className={`text-white hover:bg-green-500 hover:bg-opacity-10 px-2 rounded-full ${
                activePage === '/about' ? 'active' : ''
              }`}
              style={activePage === '/about' ? { textUnderlineOffset: 'rgb(110, 20, 180)' } : null}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => handlePageChange('/contact')}
              className={`text-white hover:bg-green-500 hover:bg-opacity-10 px-2 rounded-full ${
                activePage === '/contact' ? 'active' : ''
              }`}
              style={activePage === '/contact' ? { backgroundColor: '' } : null}
            >
              Contact
            </Link>
          </nav>
          <div className="sm:hidden">
            <button className="text-white hover:text-white focus:outline-none" onClick={handleMenuToggle}>
              <div className="absolute top-8 right-8">
                {isMenuOpen ? (
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
                )}
              </div>
            </button>
          </div>
          <div className="hidden sm:flex items-center space-x-4 absolute top-8 right-20">

            <button className="bg-green-700 hover:bg-green-800  border-gray-500 border-r-2 text-sm text-white px-4 py-2 rounded-l-full relative left-4">
              <Link to="/signup">Sign Up</Link>
 </button>
            <button className="bg-green-700 hover:bg-green-800  text-bold text-white px-4 py-2 text-sm rounded-r-full">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-green-600 absolute top-16 right-8 bg-opacity-10">
            <nav className="px-2 pt-2 pb-2space-y-1 z-20">
              <Link to="/" className="block text-white hover:text-white">
               Products
              </Link>
             
              <Link to="/about" className="block text-white hover:text-white">
                About
              </Link>
              <Link to="/contact" className="block text-white hover:text-white">
                Contact
              </Link>
              <div className="flex items-center mt-1">
                <button className="bg-green-700 hover:bg-green-700 text-white px-3 py-2 rounded">
                  <Link to="/signup" className="block text-white hover:text-white">
                    Sign Up
                  </Link>
                </button>
                <button className="bg-green-700 hover:bg-green-700 text-white px-3 py-2 rounded ml-2">
                  <Link to="/login" className="block text-white hover:text-white">
                    Sign In
                  </Link>
                </button>
              </div>
            </nav>
          </div>
        )}
    </header>
  );
}

export default Header;