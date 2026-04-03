import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../services/categoryServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Categories (){
    const navigate = useNavigate();
    const [categories, setCategories]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/");
            return;
        }

        async function fetchData(){
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar categorias");
            }
        }
        fetchData();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar esta categoria?")){
            return;
        }
        try {
            await deleteCategory(id);
            alert("Categoria Eliminada");
            //refrescar la lista
            const data = await getCategories();
            setCategories(data);
            }       
            catch (error) {
                console.error(error);
                alert("Error al eliminar la categoria");
            }
        }
        return (
        <>
        <Navbar />
        <div>
            <h1>Categorias del Inventario
            </h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {categories.length === 0 ? (
                    <p>No hay categorias registradas</p>
                ) : (
                categories.map(p => (
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
                     <button onClick={() => navigate(`/categories/edit/${p.id}`)}>
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
export default Categories