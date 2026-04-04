import { useState } from "react";
import Navbar from "../components/Navbar";
import { createReason } from "../services/reasonService";
import { useNavigate } from "react-router-dom";

function CreateReason(){
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const navigate = useNavigate();

const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const reason = {
            name: String(name),
            description: String(description),
            };

            await createReason(reason);
            alert("Motivo creado correctamente");
            navigate("/reasons");
            }
        
            catch(error){
            console.error(error);
            alert("Error al crear motivo")
            }
        };
        return (
        <>
        <Navbar />
        <h1>Crear Motivo</h1>
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
export default CreateReason