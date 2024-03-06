import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryCreate";
import CategoryList from "./CategoryList";
import ProductForm from "./ProductCreate";
import ProductList from "./ProductList";
import ViewOrders from "./ViewOrders";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import {
  FaProductHunt,
  FaPlus,
  FaList,
  FaBoxOpen,
  FaRegComment,
} from "react-icons/fa";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  List,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Drawer Component
const DrawerComponent = ({ onSelectSection }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open}>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon />
        </IconButton>
        <List>
          <ListItem button onClick={() => onSelectSection("productList")}>
            <ListItemIcon>
              <FaProductHunt />
            </ListItemIcon>
            <ListItemText primary="Product List" />
          </ListItem>
          <ListItem button onClick={() => onSelectSection("createProduct")}>
            <ListItemIcon>
              <FaPlus />
            </ListItemIcon>
            <ListItemText primary="Create Product" />
          </ListItem>
          <ListItem button onClick={() => onSelectSection("categoryList")}>
            <ListItemIcon>
              <FaList />
            </ListItemIcon>
            <ListItemText primary="Category List" />
          </ListItem>
          <ListItem button onClick={() => onSelectSection("createCategory")}>
            <ListItemIcon>
              <FaPlus />
            </ListItemIcon>
            <ListItemText primary="Create Category" />
          </ListItem>
          <ListItem button onClick={() => onSelectSection("ViewOrders")}>
            <ListItemIcon>
              <FaBoxOpen />
            </ListItemIcon>
            <ListItemText primary="View Orders" />
          </ListItem>
          <ListItem button onClick={() => onSelectSection("Feedback")}>
            <ListItemIcon>
              <FaRegComment />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Admin Component
const Admin = () => {
  const navigate = useNavigate();
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
    <>
        <DrawerComponent onSelectSection={handleSelectSection} />
        <div className="bg-green-50 h-auto px-4 py-2 w-full">
          <h2 className="text-3xl font-bold mx-4 my-2">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4"
          >
            Logout
          </button>
          <div className="mx-4 my-2 h-screen">{renderAdminSection()}</div>
        </div>
    </>
  );
};

export default Admin;
