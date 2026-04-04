import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../services/categoryServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar categorías");
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta categoría?")) {
            return;
        }
        try {
            await deleteCategory(id);
            alert("Categoría eliminada");
            setCategories(categories.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar categoría");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Categorías del Inventario</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-category")}
                    >
                        + Nueva Categoría
                    </button>
                </div>

                {categories.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay categorías registradas
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {categories.map(c => (
                            <div key={c.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{c.name}</h5>
                                        <p className="card-text">
                                            {c.description || "Sin descripción"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => navigate(`/categories/edit/${c.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm flex-grow-1"
                                                onClick={() => handleDelete(c.id)}
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

export default Categories;
