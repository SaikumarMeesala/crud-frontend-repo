import React, { useState } from "react";
const ProductForm = () => {
    const [product, setProduct] = useState({
    productID: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!product.productID) {
                alert("Product ID is required.");
                return;
            }
            await ProductService.addProduct(product);
            alert("Product added successfully!");
            setProduct({
                productID: "",
                productName: "",
                productPrice: "",
                productQuantity: "",
            }); // Reset the form
            } catch (error) {
            alert("Error adding product.");
            console.error(error);
            }
        };
    return (
        <form onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <input
            type="text"
            name="productID"
            value={product.productID}
            onChange={handleChange}
            placeholder="Product ID"
            required
        />
        <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder="Product Name"
        />
        <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            placeholder="Product Price"
        />
        <input
            type="number"
            name="productQuantity"
            value={product.productQuantity}
            onChange={handleChange}
            placeholder="Product Quantity"
        />
        <button type="submit">Add Product</button>
        </form>
    );
};
export default ProductForm;
