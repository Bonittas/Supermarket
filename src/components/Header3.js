import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

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
    <header className="shadow-lg sticky top-0 flex justify-between items-center z-20 bg-green-700 lg:h-24 md:h-24 sm:h-32 ">
      <div className="absolute top-1 p-2 lg:left-3 md:left-3 sm:left-1  border-1 border-green-300 rounded-full w-20  ">
        <p className="text-xl text-center  text-white font-cursive">
          <FontAwesomeIcon icon={faCartShopping} className="w-12 h-12" />
          iShop
        </p>
      </div>
      <div className="flex items-center ml-auto space-x-4 z-20">
        <nav className="z-20 hidden sm:flex space-x-4 text-sm absolute top-10 right-72">
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
            <div className="absolute top-2 right-8">
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
              )}
            </div>
          </button>
        </div>
       
        <div className="hidden sm:flex items-center space-x-4 absolute top-10 right-24">
        <button className="bg-green-700 hover:bg-white w-20 h-7 text-bold text-white font-bold hover:text-green-900  px-4 pb-4 text-sm rounded-sm">
            <Link to="/signup">Signup</Link>
          </button>
          <button className=" bg-green-900 w-20 h-7 font-bold text-bold text-white  px-4 py-1 text-sm rounded-sm">
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
              <button className="bg-green-700 hover:bg-green-700 text-whitepx-3 py-2 rounded">
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