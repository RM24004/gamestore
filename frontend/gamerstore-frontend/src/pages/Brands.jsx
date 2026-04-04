import { useEffect, useState } from "react";
import { getBrands, deleteBrand } from "../services/brandService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Brands() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar marcas");
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta marca?")) {
            return;
        }
        try {
            await deleteBrand(id);
            alert("Marca eliminada");
            setBrands(brands.filter(b => b.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar marca");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Marcas del Inventario</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-brand")}
                    >
                        + Nueva Marca
                    </button>
                </div>

                {brands.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay marcas registradas
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {brands.map(b => (
                            <div key={b.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{b.name}</h5>
                                        <p className="card-text">
                                            {b.description || "Sin descripción"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => navigate(`/brands/edit/${b.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm flex-grow-1"
                                                onClick={() => handleDelete(b.id)}
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

export default Brands;
