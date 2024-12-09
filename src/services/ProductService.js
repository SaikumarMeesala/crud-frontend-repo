import axios from "axios";
const API_BASE_URL = "http://localhost:8080/products";
const ProductService = {
    getAllProducts: () => axios.get(API_BASE_URL),
    getProductById: (id) => axios.get(`${API_BASE_URL}/${id}`),
    addProduct: (product) => axios.post(`${API_BASE_URL}/add`, product),
    updateProduct: (id, product) => axios.put(`${API_BASE_URL}/update/${id}`, product),
    deleteProduct: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`),
};

export default ProductService;
