import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../services/api";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [brandId, setBrandId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [platformId, setPlatformId] = useState("");
    const [supplierId, setSupplierId] = useState("");
    
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargar catálogos
                const [product, brandsData, categoriesData, platformsData, suppliersData] = await Promise.all([
                    fetchWithAuth(`http://localhost:8080/products/${id}`),
                    fetchWithAuth("http://localhost:8080/brands"),
                    fetchWithAuth("http://localhost:8080/categories"),
                    fetchWithAuth("http://localhost:8080/platforms"),
                    fetchWithAuth("http://localhost:8080/suppliers")
                ]);

                // Llenar catálogos
                setBrands(brandsData);
                setCategories(categoriesData);
                setPlatforms(platformsData);
                setSuppliers(suppliersData);

                // Llenar formulario
                setName(product.name);
                setDescription(product.description || "");
                setPrice(product.price);
                setStock(product.current_stock);
                setImageUrl(product.image_url || "");
                
                // Buscar IDs de las relaciones (necesitas extraerlos del response)
                setBrandId(product.brandId || "");
                setCategoryId(product.categoryId || "");
                setPlatformId(product.platformId || "");
                setSupplierId(product.supplierId || "");
                
            } catch (error) {
                console.error(error);
                alert("Error al cargar el producto");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const productData = {
                name,
                description,
                price: Number(price),
                current_stock: Number(stock),
                image_url: imageUrl || null,
                brand_id: Number(brandId),
                category_id: Number(categoryId),
                platform_id: Number(platformId),
                supplier_id: Number(supplierId)
            };

            await fetchWithAuth(`http://localhost:8080/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(productData)
            });

            alert("Producto actualizado");
            navigate("/products");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar producto");
        }
    };

    return (
        <>
            <Navbar />
            <h2>Editar Producto</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label>Stock:</label>
                    <input 
                        type="number" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label>URL Imagen:</label>
                    <input 
                        type="text" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label>Marca:</label>
                    <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                        <option value="">Seleccionar Marca</option>
                        {brands.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Categoría:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Seleccionar Categoría</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Plataforma:</label>
                    <select value={platformId} onChange={(e) => setPlatformId(e.target.value)}>
                        <option value="">Seleccionar Plataforma</option>
                        {platforms.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Proveedor:</label>
                    <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                        <option value="">Seleccionar Proveedor</option>
                        {suppliers.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => navigate("/products")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditProduct;