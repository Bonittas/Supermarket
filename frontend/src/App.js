import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FruitsPage from "./pages/categories/Fruit";
import VegetablesPage from "./pages/categories/Vegetable";
import Dairy from "./pages/categories/Dairy";
import Drink from "./pages/categories/Drinks";
import Sanitizers from "./pages/categories/Sanitzers";
import Snacks from "./pages/categories/Snacks";
import Meat from "./pages/categories/Meat and Seafoods";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/SignIn";
import Signup from "./pages/Signup";
import Purchase from "./pages/Purchase";
import Admin from "./pages/admin/AdminDashboard";
import ProductListByCategory from "./pages/admin/ProductListByCategory";
import FruitDetail from "./pages/admin/productDetail";
import { categories } from "./pages/categories/Category";
import Fruit from "./pages/categories/Fruit";
import Feedbacks from "./pages/admin/Feedback";
import Services from "./pages/Ourservice";
import NotFound from "./pages/404Page"; // Import the NotFound component

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/list");
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
          <Route
            path="/purchase"
            element={
              <Purchase
                cartItems={cartItems}
                setCartItems={setCartItems}
                onDeleteItem={handleDeleteItem}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/feedback" element={<Feedbacks />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/fruits"
            element={
              <FruitsPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/vegetables"
            element={
              <VegetablesPage
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/snacks"
            element={
              <Snacks cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/dairy"
            element={
              <Dairy cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/drinks"
            element={
              <Drink cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/sanitizers"
            element={
              <Sanitizers cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/fruits/:fruitId"
            element={<FruitDetail />}
          />
          <Route
            path="/meat"
            element={<Meat cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
            }
          />
          {categories.map((category) => (
            <Route
              key={category.name}
              path={`/${category.name}`}
              element={
                <Fruit cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
          ))}

          {/* Route for handling 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
