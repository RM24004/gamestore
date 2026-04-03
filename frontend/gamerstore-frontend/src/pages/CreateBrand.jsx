import { useState } from "react";
import Navbar from "../components/Navbar";
import { createBrand } from "../services/brandService";
import { useNavigate } from "react-router-dom";

function CreateBrand(){
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const navigate = useNavigate();

const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const brand = {
            name: String(name),
            description: String(description),
            };

            await createBrand(brand);
            alert("Marca creada correctamente");
            navigate("/brands");
            }
        
            catch(error){
            console.error(error);
            alert("Error al crear producto")
            }
        };

    return (
        <>
        <Navbar />
        <h1>Crear Marca</h1>
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
export default CreateBrand