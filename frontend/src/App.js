import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FruitsPage from './pages/categories/Fruit';
import VegetablesPage from './pages/categories/Vegetable';
import Dairy from './pages/categories/Dairy';
import Drink from './pages/categories/Drinks';
import Sanitizers from './pages/categories/Sanitzers';
import Snacks from './pages/categories/Snacks';
import Meat from './pages/categories/Meat and Seafoods';
import Cart from './pages/Cart';
import Footer from './components/Footer'
import About from './pages/About';
import Contact from './pages/Contact'; 
import Login from './pages/Login'
import Signup from './pages/Signup'
import Purchase from './pages/Purchase'
import Admin from './pages/admin/product'
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <div>
       

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/fruits"
            element={<FruitsPage cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/vegetables"
            element={<VegetablesPage cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/snacks"
            element={<Snacks cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/dairy"
            element={<Dairy cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/drinks"
            element={<Drink cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/sanitizers"
            element={<Sanitizers cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/meat"
            element={<Meat cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />}
          />
        </Routes>

        <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
        <Footer/>
      </div>
    </Router>
  );
};

export default App;