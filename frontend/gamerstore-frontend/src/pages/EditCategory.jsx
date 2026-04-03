import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../services/api";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const category = await fetchWithAuth(`http://localhost:8080/categories/${id}`);
                setName(category.name);
                setDescription(category.description || "");
            } catch (error) {
                console.error(error);
                alert("Error al cargar la categoria");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const categoryData = {
                name,
                description
            };

            await fetchWithAuth(`http://localhost:8080/categories/${id}`, {
                method: "PUT",
                body: JSON.stringify(categoryData)
            });

            alert("Categoria Actualizada");
            navigate("/categories");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar categoria");
        }
    };

    return (
        <>
            <Navbar />
            <h2>Editar categoria</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => navigate("/categories")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditCategory;