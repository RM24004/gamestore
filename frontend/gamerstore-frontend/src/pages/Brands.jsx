import { useEffect, useState } from "react";
import { getBrands, deleteBrand } from "../services/brandService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Brands (){
    const navigate = useNavigate();
    const [brands, setBrands]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar marcas");
            }
        }
        fetchData();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta marca?")){
            return;
        }
        try {
            await deleteBrand(id);
            alert("Marca Eliminada");
            //refrescar la lista
            const data = await getBrands();
            setBrands(data);
            }       
            catch (error) {
                console.error(error);
                alert("Error al eliminar marca");
            }
        }
    return (
        <>
        <Navbar />
        <div>
            <h1>Marcas del Inventario
            </h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {brands.length === 0 ? (
                    <p>No hay marcas registradas</p>
                ) : (
             brands.map(p => (
                <div key={p.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <p>Nombre: {p.name}</p>
                    <p>Descripcion: {p.description}</p>
                    <button onClick={() => handleDelete(p.id)}>
                        Eliminar
                    </button>
                     <button onClick={() => navigate(`/brands/edit/${p.id}`)}>
                        Editar
                    </button>
                </div>)
            ))}
            </div>
        </div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </>
    );
}
export default Brands