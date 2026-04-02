import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Products (){
    const navigate = useNavigate();
    const [products, setProducts]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar productos");
            }
        }
        fetchData();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
return (
    <>
        <Navbar />
        <div>
            <h1>Productos en el inventario</h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {products.length === 0 ? (
                    <p>No hay salidas registradas</p>
                ) : (
             products.map(p => (
                <div key={p.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <p>{p.name}</p>
                    <p>Precio: ${p.price}</p>
                    <p>Stock: {p.current_stock}</p>
                    <p>Categoría: {p.categoryName}</p>
                    <p>Marca: {p.brandName}</p>
                    <p>Plataforma: {p.platform_id}</p>
                    <p>Proveedor: {p.supplier_id}</p>
                </div>)
            ))}
            </div>
        </div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </>
    );
}
export default Products;