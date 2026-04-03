import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Users (){
    const navigate = useNavigate();
    const [users, setUsers]=useState([]);

    useEffect(()=>{
         const token = localStorage.getItem("token");
    if (!token) {
        navigate("/");
        return;
    }

    async function fetchData() {
        try {
            const data = await getUsers();
            // Filtrar solo usuarios con rol USER
            const filteredUsers = data.filter(user => user.roleName === "USER");
            setUsers(filteredUsers);
        } catch (error) {
            console.error(error);
            alert("Error al cargar usuarios");
        }
    }
    fetchData();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

   const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que desea eliminar este usuario?")) {
        return;
    }
    try {
        await deleteUser(id);
        alert("Usuario eliminado");
        // Filtrar localmente en vez de recargar
        setUsers(users.filter(user => user.id !== id));
    } catch (error) {
        console.error(error);
        alert("Error al eliminar usuario");
    }
}
return (
    <>
        <Navbar />
        <div>
            <h1>Usuarios del Inventario</h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {users.length === 0 ? (
                    <p>No hay salidas registradas</p>
                ) : (
                users.map(p => (
                <div key={p.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                }}>

                    <p>Nombre: {p.name}</p>
                    <p>Telefono: {p.phone}</p>
                    <p>E-mail: {p.email}</p>
                    <p>Role: {p.roleName}</p>
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
export default Users