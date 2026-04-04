import { useState } from "react";
import Navbar from "../components/Navbar";
import { createCountry } from "../services/countryService";
import { useNavigate } from "react-router-dom";

function CreateCountry() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const country = {
                name,
                description
            };

            await createCountry(country);
            alert("País creado correctamente");
            navigate("/countries");
        } catch (error) {
            console.error(error);
            alert("Error al crear país");
        }
    };

    return (
        <>
            <Navbar />
            <h1>Crear País</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Crear</button>
            </form>
        </>
    );
}

export default CreateCountry;