import React from "react";
import "./Sidebar.css";
const Sidebar = ({ selectedIndex, selectIndex }) => {
  let headings = ["All Products", "Orders", "Add Product", "Your Account"];

  return (
    <div>
      {headings.map((heading, index) => (
        <div
          className={`card ${selectedIndex === index ? "selected-card" : ""}`}
          key={index}
          onClick={() => selectIndex(index)}
        >
          <p>{heading}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
