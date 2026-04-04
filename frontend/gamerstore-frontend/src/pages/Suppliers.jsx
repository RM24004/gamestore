import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Suppliers() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
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

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este proveedor?")) {
            return;
        }
        try {
            await deleteSupplier(id);
            alert("Proveedor eliminado");
            setSuppliers(suppliers.filter(s => s.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar proveedor");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Proveedores del Inventario</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-supplier")}
                    >
                        + Nuevo Proveedor
                    </button>
                </div>

                {suppliers.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay proveedores registrados
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {suppliers.map(s => (
                            <div key={s.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{s.name}</h5>
                                        <p className="card-text">
                                            <strong>Contacto:</strong> {s.contact || "N/A"}<br />
                                            <strong>Teléfono:</strong> {s.phone || "N/A"}<br />
                                            <strong>Email:</strong> {s.email || "N/A"}<br />
                                            <strong>Dirección:</strong> {s.address || "N/A"}<br />
                                            <strong>País:</strong> {s.countryName || "N/A"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => navigate(`/suppliers/edit/${s.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm flex-grow-1"
                                                onClick={() => handleDelete(s.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Suppliers;
