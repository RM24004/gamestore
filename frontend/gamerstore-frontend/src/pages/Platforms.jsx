import { useEffect, useState } from "react";
import { getPlatforms, deletePlatform } from "../services/platformService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Platforms() {
    const navigate = useNavigate();
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
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

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta plataforma?")) {
            return;
        }
        try {
            await deletePlatform(id);
            alert("Plataforma eliminada");
            setPlatforms(platforms.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar plataforma");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Plataformas del Inventario</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-platform")}
                    >
                        + Nueva Plataforma
                    </button>
                </div>

                {platforms.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay plataformas registradas
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {platforms.map(p => (
                            <div key={p.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description || "Sin descripción"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => navigate(`/platforms/edit/${p.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm flex-grow-1"
                                                onClick={() => handleDelete(p.id)}
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

export default Platforms;
