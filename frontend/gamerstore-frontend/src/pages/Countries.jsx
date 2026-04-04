import { useEffect, useState } from "react";
import { getCountries, deleteCountry } from "../services/countryService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Countries(){
    const navigate = useNavigate();
    const [countries, setCountries]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar paises");
            }
        }
        fetchData();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este pais?")){
            return;
        }
        try {
            await deleteCountry(id);
            alert("Pais Eliminado");
            //refrescar la lista
            const data = await getCountries();
            setCountries(data);
            }       
            catch (error) {
                console.error(error);
                alert("Error al eliminar pais");
            }
        }
        return (
        <>
        <Navbar />
        <div>
            <h1>Paises del Inventario
            </h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {countries.length === 0 ? (
                    <p>No hay marcas registradas</p>
                ) : (
             countries.map(p => (
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
export default Countries