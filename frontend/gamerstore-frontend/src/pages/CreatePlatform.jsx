import { useState } from "react";
import Navbar from "../components/Navbar";
import { createPlatform } from "../services/platformService";
import { useNavigate } from "react-router-dom";

function CreatePlatform(){
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const navigate = useNavigate();

const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const brand = {
            name,
            description,
            };

            await createPlatform(brand);
            alert("Plataforma creada correctamente");
            navigate("/platforms");
            }
        
            catch(error){
            console.error(error);
            alert("Error al crear plataforma")
            }
        };

    return (
        <>
        <Navbar />
        <h1>Crear Plataforma</h1>
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
export default CreatePlatform