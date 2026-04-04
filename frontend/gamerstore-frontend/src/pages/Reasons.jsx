import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { deleteReason, getReasons } from "../services/reasonService";

function Reasons(){
    const navigate = useNavigate();
    const [reasons, setReasons]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }
       async function fetchData(){
            try {
                const data = await getReasons();
                setReasons(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar motivos");
            }
        }
        fetchData();
    }, []);
      
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

     const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este motivo?")){
            return;
        }
        try {
            await deleteReason(id);
            alert("Motivo Eliminada");
            //refrescar la lista
            const data = await getReasons();
            setReasons(data);
            }       
            catch (error) {
                console.error(error);
                alert("Error al eliminar el motivo");
            }
        }
        return(
<>
        <Navbar />
        <div>
            <h1>Motivos del Inventario
            </h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {reasons.length === 0 ? (
                    <p>No hay motivos registradas</p>
                ) : (
             reasons.map(p => (
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
                     <button onClick={() => navigate(`/reasons/edit/${p.id}`)}>
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
export default Reasons