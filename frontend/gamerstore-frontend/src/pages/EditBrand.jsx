import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../services/api";

function EditBrand() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const brand = await fetchWithAuth(`http://localhost:8080/brands/${id}`);
                setName(brand.name);
                setDescription(brand.description || "");
            } catch (error) {
                console.error(error);
                alert("Error al cargar la marca");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const brandData = {
                name,
                description
            };

            await fetchWithAuth(`http://localhost:8080/brands/${id}`, {
                method: "PUT",
                body: JSON.stringify(brandData)
            });

            alert("Marca actualizada");
            navigate("/brands");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar marca");
        }
    };

    return (
        <>
            <Navbar />
            <h2>Editar Marca</h2>
            
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
                <button type="button" onClick={() => navigate("/brands")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditBrand;