import React from "react";
import "./Main.css";
import Sidebar from "../../component/Sidebar/Sidebar.jsx";
import AddProduct from "../AddProduct/AddProduct.jsx";
import AllProducts from "../AllProducts/AllProducts.jsx";
import MyAccount from "../MyAccount/MyAccount.jsx";
import { useState, useEffect } from "react";
import Orders from "../Orders/Orders.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const Main = () => {
  const [selectedIndex, setIndex] = useState(-1);
  const navigate = useNavigate();

  // Use useLocation to get the current path
  const location = useLocation();

  const handleSidebarClick = (index) => {
    switch (index) {
      case 0:
        navigate("/allproducts");
        break;
      case 1:
        navigate("orders");
        break;
      case 2:
        navigate("/addproduct");
        break;
      case 3:
        navigate("/myaccount");
        break;
      default:
        navigate("/");
    }
  };

  useEffect(() => {
    // Update the selectedIndex based on the current route
    switch (location.pathname) {
      case "/allproducts":
        setIndex(0);
        break;
      case "/orders":
        setIndex(1);
        break;
      case "/addproduct":
        setIndex(2);
        break;
      case "/myaccount":
        setIndex(3);
        break;
      default:
        setIndex(0);
    }
  }, [location.pathname]);
  return (
    <div className="main-page-div">
      <div className="side-bar-main">
        <Sidebar
          selectedIndex={selectedIndex}
          selectIndex={handleSidebarClick}
        />
      </div>
      <div className="divider"></div>
      <div className="side-content">
        <Routes>
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
