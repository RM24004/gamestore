import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../services/api";

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [countryId, setCountryId] = useState("");
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [supplierData, countryData] = await Promise.all([
                    fetchWithAuth(`http://localhost:8080/suppliers/${id}`),
                    fetchWithAuth("http://localhost:8080/countries")
                ]);
                
                setCountries(countryData);
                setName(supplierData.name);
                setContact(supplierData.contact || "");
                setPhone(supplierData.phone || "");
                setEmail(supplierData.email || "");
                setAddress(supplierData.address || "");
                setCountryId(supplierData.countryId || "");
                
            } catch (error) {
                console.error(error);
                alert("Error al cargar el proveedor");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const supplierData = {
                name,
                contact,
                phone,
                email,
                address,
                id_country: Number(countryId)
            };
            
            await fetchWithAuth(`http://localhost:8080/suppliers/${id}`, {
                method: "PUT",
                body: JSON.stringify(supplierData)
            });
            
            alert("Proveedor actualizado");
            navigate("/suppliers");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar proveedor");
        }
    };

    return (
        <>
            <Navbar />
            <h2>Editar Proveedor</h2>
            
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
                    <label>Contacto:</label>
                    <input 
                        type="text" 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
                    />
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div>
                    <label>Dirección:</label>
                    <textarea 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>

                <div>
                    <label>País:</label>
                    <select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
                        <option value="">Seleccionar País</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => navigate("/suppliers")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditSupplier;