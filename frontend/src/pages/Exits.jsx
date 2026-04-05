import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getExits } from "../services/exitService";
import { useNavigate } from "react-router-dom";

function Exits() {
    const navigate = useNavigate();
    const [exits, setExits] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getExits();
                setExits(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar salidas");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Salidas de Productos</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-exits")}
                    >
                        + Nueva Salida
                    </button>
                </div>

                {exits.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay salidas registradas
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Fecha</th>
                                    <th>Razón</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exits.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.productName || "N/A"}</td>
                                        <td>
                                            <span className="badge bg-danger">{e.quantity}</span>
                                        </td>
                                        <td>{e.exit_date}</td>
                                        <td>{e.reasonName || "N/A"}</td>
                                        <td>{e.username || "N/A"}</td>
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

export default Exits;