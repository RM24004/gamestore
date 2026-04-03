import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateProduct(){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    
    const [categoryId, setCategoryId] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [brandId, setBrandId] = useState([]);
    const [brands, setBrands] = useState([]);
    
    const [platformId, setPlatformId]=useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [suppliersId, setSupplierId]=useState([]);
    const [suppliers, setSuppliers] = useState([]);
    
   

    const [image_url, setImageUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchWithAuth("http://localhost:8080/categories").then(setCategories);
        fetchWithAuth("http://localhost:8080/brands").then(setBrands);
        fetchWithAuth("http://localhost:8080/platforms").then(setPlatforms);
        fetchWithAuth("http://localhost:8080/suppliers").then(setSuppliers);
    }, []);
    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const product = {
            name,
            price: Number(price),
            current_stock: Number (stock),
            brand_id: Number(brandId),
            category_id: Number(categoryId),
            platform_id: Number(platformId),
            supplier_id: Number(suppliersId),
            description: String(description),
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

            <select onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Seleccione Categoría</option>
            {categories.map(c => (
             <option key={c.id} value={c.id}>
            {c.name}
            </option>
            ))}
            </select>
            
            <select onChange={(e) => setBrandId(e.target.value)}>
            <option value="">Seleccione Marca</option>
            {brands.map(c => (
             <option key={c.id} value={c.id}>
            {c.name}
            </option>
            ))}
            </select>
            
            <select onChange={(e) => setPlatformId(e.target.value)}>
            <option value="">Seleccione Plataforma</option>
            {platforms.map(c => (
             <option key={c.id} value={c.id}>
            {c.name}
            </option>
            ))}
            </select>

            <select onChange={(e) => setSupplierId(e.target.value)}>
            <option value="">Seleccione Proveedor</option>
            {suppliers.map(c => (
             <option key={c.id} value={c.id}>
            {c.name}
            </option>
            ))}
            </select>
            
            <input 
            type="text" 
            placeholder="Descripción" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
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