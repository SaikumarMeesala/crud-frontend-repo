import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        productID: "",
        productName: "",
        productPrice: "",
        productQuantity: "",
    });
    const [updatedProduct,setUpdatedProduct]=useState({
        productID: "",
        productName: "",
        productPrice: "",
        productQuantity: "",
    });
    const [showCreateForm,setShowCreateForm]=useState(false)
    const fetchProducts = async () => {
        try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
        } catch (error) {
        console.error("Error fetching products", error);
        }
    };
    const handleDelete = async (id) => {
        try {
        await ProductService.deleteProduct(id);
        alert("Product deleted successfully!");
        fetchProducts();
        } catch (error) {
        alert("Error deleting product.");
        console.error(error);
        }
    };
    const handleEdit=(product)=>{
        setEditingProduct(product.productID);
        setUpdatedProduct({ ...product });
    };
    const handleUpdateChange=(e)=>{
        const{name,value}=e.target;
        setUpdatedProduct({...updatedProduct,[name]:value});
    };
    const handleUpdate=async (e)=>{
        e.preventDefault();
        try{
            await ProductService.updateProduct(updatedProduct.productID, updatedProduct);
            alert("Product updated successfully!");
            setEditingProduct(null); // Exit editing mode
            fetchProducts();
        }catch(error) {
            alert("Error updating product.");
            console.error(error);
        }  
    }; 
    const handleCancel=()=>{
        setEditingProduct(null);
        setUpdatedProduct({
            productID: "",
            productName: "",
            productPrice: "",
            productQuantity: "",
        });
    };
    const handleCreateChange=(e)=>{
        const {name,value}=e.target;
        setNewProduct({...newProduct,[name]:value});
    };
    const handleCreate=async (e)=>{
        e.preventDefault(e);
        try{
            await ProductService.addProduct(newProduct);
            alert("Product added successfully!");
            setShowCreateForm(false);
            setNewProduct({
                productID: "",
                productName: "",
                productPrice: "",
                productQuantity: "",
            });
            fetchProducts();
        }catch(error){
            alert("Error adding product.");
            console.error(error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="updating">
        <h2>Product List</h2>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "Add New Product"}</button>
        {showCreateForm &&(
            <form onSubmit={handleCreate}>
                <div>
                <label>Product Name:</label>
                <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={handleCreateChange}
                required
                />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                    value={newProduct.productPrice}
                    onChange={handleCreateChange}
                    required
                    />
                </div>
                <div>
                    <label>Product Quantity:</label>
                    <input
                    type="number"
                    name="productQuantity"
                    placeholder="Product Quantity"
                    value={newProduct.productQuantity}
                    onChange={handleCreateChange}
                    required
                    />
                </div>
                <div className="center-container">
                <button type="submit">Add New Product</button>
                </div>
            </form>
        )}
        <table border="1">
            <thead>
            <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                editingProduct===product.productID ?(
                    <tr key={product.productID}>
                        <td>{product.productID}</td>
                        <td>
                            <input
                            type="text"
                            name="productName"
                            value={updatedProduct.productName}
                            onChange={handleUpdateChange}
                            />
                        </td>
                        <td>
                            <input
                            type="number"
                            name="productPrice"
                            value={updatedProduct.productPrice}
                            onChange={handleUpdateChange}
                            />
                        </td>
                        <td>
                            <input
                            type="number"
                            name="productQuantity"
                            value={updatedProduct.productQuantity}
                            onChange={handleUpdateChange}
                            />
                        </td>
                        <td>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </td>
                    </tr>
                ):(
                    <tr key={product.productID}>
                        <td>{product.productID}</td>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td>{product.productQuantity}</td>
                        <td>
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.productID)}>Delete</button>
                        </td>
                    </tr>
                )   
            ))}
            </tbody>
        </table>
        </div>
    );
};
export default ProductTable;
