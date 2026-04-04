import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getEntries } from "../services/entryService";
import { useNavigate } from "react-router-dom";

function Entries() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getEntries();
                setEntries(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar entradas");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Entradas de Productos</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-entries")}
                    >
                        + Nueva Entrada
                    </button>
                </div>

                {entries.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay entradas registradas
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Costo Unitario</th>
                                    <th>Fecha</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.productName || "N/A"}</td>
                                        <td>
                                            <span className="badge bg-success">{e.quantity}</span>
                                        </td>
                                        <td>${e.unit_cost || "0.00"}</td>
                                        <td>{e.entry_date}</td>
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

export default Entries;
