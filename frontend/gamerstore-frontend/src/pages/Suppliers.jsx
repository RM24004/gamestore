import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Suppliers (){
    const navigate = useNavigate();
    const [suppliers, setSuppliers]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getSuppliers();
                setSuppliers(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar proveedores");
            }
        }
        fetchData();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este proveedor?")){
            return;
        }
try {
    await deleteSupplier(id);
    alert("Proveedor Eliminado");
    //refrescar la lista
    const data = await getSuppliers();
    setSuppliers(data);
    }       
    catch (error) {
        console.error(error);
        alert("Error al eliminar proveedor");
    }
}
return (
    <>
        <Navbar />
        <div>
            <h1>Provedores del Inventario</h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {suppliers.length === 0 ? (
                    <p>No hay salidas registradas</p>
                ) : (
                suppliers.map(p => (
                <div key={p.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <p>Nombre: {p.name}</p>
                    <p>Contacto: {p.contact}</p>
                    <p>Telefono: {p.phone}</p>
                    <p>E-mail: {p.email}</p>
                    <p>Direccion: {p.address}</p>
                    <p>Pais: {p.countryName}</p>
                    <button onClick={() => handleDelete(p.id)}>
                        Eliminar
                    </button>
                     <button onClick={() => navigate(`/suppliers/edit/${p.id}`)}>
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
export default Suppliers