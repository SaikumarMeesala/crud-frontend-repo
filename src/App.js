import React from "react";
import "./styles.css";
import ProductTable from "./components/ProductTable";
const App = () => {
  return (
    <div className="app-container">
      <h1>Product Management</h1>
      <ProductTable/>
      
    </div>
  );
};
export default App;
