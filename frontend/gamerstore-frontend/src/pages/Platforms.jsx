import { useEffect, useState } from "react";
import { getPlatforms, deletePlatform } from "../services/platformService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Platforms (){
    const navigate = useNavigate();
    const [platforms, setPlatforms]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getPlatforms();
                setPlatforms(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar plataformas");
            }
        }
        fetchData();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta plataforma?")){
            return;
        }
        try {
            await deletePlatform(id);
            alert("Plataforma Eliminada");
            //refrescar la lista
            const data = await getPlatforms();
            setPlatforms(data);
            }       
            catch (error) {
                console.error(error);
                alert("Error al eliminar plataforma");
            }
        }
    return (
        <>
        <Navbar />
        <div>
            <h1>Plataformas del Inventario
            </h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {platforms.length === 0 ? (
                    <p>No hay marcas registradas</p>
                ) : (
             platforms.map(p => (
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
                     <button onClick={() => navigate(`/platforms/edit/${p.id}`)}>
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
export default Platforms