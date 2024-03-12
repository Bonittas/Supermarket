import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryCreate";
import CategoryList from "./CategoryList";
import ProductForm from "./ProductCreate";
import ProductList from "./ProductList";
import ViewOrders from "./ViewOrders";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FaProductHunt,
  FaPlus,
  FaList,
  FaBoxOpen,
  FaRegComment,
} from "react-icons/fa";

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
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        // ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("productList")}
            className="cursor-pointer"
          >
            <ListItemIcon>
              <FaProductHunt />
            </ListItemIcon>
            <ListItemText primary="Product List" />
          </ListItem>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("createProduct")}
            className="cursor-pointer"
          >
            <ListItemIcon>
              <FaPlus />
            </ListItemIcon>
            <ListItemText primary="Create Product" />
          </ListItem>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("categoryList")}
            className="cursor-pointer"
          >
            <ListItemIcon>
              <FaList />
            </ListItemIcon>
            <ListItemText primary="Category List" />
          </ListItem>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("createCategory")}
            className="cursor-pointer"
          >
            <ListItemIcon>
              <FaPlus />
            </ListItemIcon>
            <ListItemText primary="Create Category" />
          </ListItem>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("ViewOrders")}
            className="cursor-pointer"
          >
            <ListItemIcon>
              <FaBoxOpen />
            </ListItemIcon>
            <ListItemText primary="View Orders" />
          </ListItem>
          <ListItem
            ListItemButton
            onClick={() => onSelectSection("Feedback")}
            className="cursor-pointer"
          >
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
      <div className="bg-green-50 h-auto px-4 py-2 w-full">
        <DrawerComponent onSelectSection={handleSelectSection} />
        <h2 className="text-3xl font-bold mx-4 my-2">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4 absolute top-10 right-10"
        >
          Logout
        </button>
        <div className="mx-4 my-2 h-auto">{renderAdminSection()}</div>
      </div>
    </>
  );
};

export default Admin;
