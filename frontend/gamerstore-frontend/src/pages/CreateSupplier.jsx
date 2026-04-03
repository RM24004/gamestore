import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateSupplier(){
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [countryId, setCountryId] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

     useEffect(() => {
        fetchWithAuth("http://localhost:8080/countries").then(setCountries);
    }, []);

    const handleSubmit= async (e) => {
            e.preventDefault();
            try {
                const supplier = {
                name:String(name),
                contact: String(contact),
                phone: String(phone),
                email: String(email),
                address: String(address),
                id_country: Number(countryId),
            };
    
            await createSupplier(supplier);
            alert("Proveedor creado correctamente ");
            navigate("/suppliers");
        }
        catch(error){
            console.error(error);
            alert("Error al crear proveedor")
        }
    };
    return(
        <>
        <Navbar />
        <h1>Crear Proveedor</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            type="text"
            placeholder="Contacto"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            />

            <input
            type="text"
            placeholder="Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />

            <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
            type="text"
            placeholder="Direccion"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />

            <select onChange={(e) => setCountryId(e.target.value)}>
            <option value="">Seleccione Pais</option>
            {countries.map(c => (
             <option key={c.id} value={c.id}>
            {c.name}
            </option>
            ))}
            </select>

    <button type="submit">Crear</button>
        </form> 
        </>
    )
}
export default CreateSupplier