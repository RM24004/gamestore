import { useState } from "react";
import Navbar from "../components/Navbar";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function CreateProduct(){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image_url, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const product = {
            name,
            price: Number(price),
            current_stock: Number (stock),
            brand_id: 1,
            category_id: 1,
            platform_id: 1,
            supplier_id: 1,
            image_url: "https://via.placeholder.com/150"
        };

        await createProduct(product);
        alert("Producto creado correctamente");
        navigate("/products");
    }
    catch(error){
        console.error(error);
        alert("Error al crear producto")
    }
};

    return(
        <>
        <Navbar />
        <h1>Crear Producto</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />

            <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="URL Imagen (opcional)" 
            value={image_url} 
            onChange={(e) => setImageUrl(e.target.value)} 
            />

            <button type="submit">Crear</button>
        </form> 
        </>
    )
}
export default CreateProduct