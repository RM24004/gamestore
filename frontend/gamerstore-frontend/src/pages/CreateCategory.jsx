import { useState } from "react";
import Navbar from "../components/Navbar";
import { createCategory } from "../services/categoryServices";
import { useNavigate } from "react-router-dom";

function CreateCategory(){
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const navigate = useNavigate();

const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const category = {
            name,
            description,
            };

            await createCategory(category);
            alert("Categoria creada correctamente");
            navigate("/categories");
            }
        
            catch(error){
            console.error(error);
            alert("Error al crear la categoria")
            }
        };

    return (
        <>
        <Navbar />
        <h1>Crear Categoria</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            type="text"
            placeholder="Descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Crear</button>
        </form> 
        </>
    )
}
export default CreateCategory