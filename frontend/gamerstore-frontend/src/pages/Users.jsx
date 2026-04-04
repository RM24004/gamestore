import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
            try {
                const data = await getUsers();
                const filteredUsers = data.filter(user => user.roleName === "USER");
                setUsers(filteredUsers);
            } catch (error) {
                console.error(error);
                alert("Error al cargar usuarios");
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este usuario?")) {
            return;
        }
        try {
            await deleteUser(id);
            alert("Usuario eliminado");
            setUsers(users.filter(u => u.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar usuario");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-primary mb-4">Usuarios del Inventario</h2>

                {users.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay usuarios registrados
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.phone || "N/A"}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className="badge bg-primary">
                                                {u.roleName}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(u.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Users;
