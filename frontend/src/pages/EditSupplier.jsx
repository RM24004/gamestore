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
    const [loading, setLoading] = useState(false);
    
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

        if (!name || !countryId) {
            alert("Por favor complete los campos obligatorios");
            return;
        }
        
        setLoading(true);
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
            
            alert("Proveedor actualizado correctamente");
            navigate("/suppliers");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar proveedor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white py-3">
                                <h4 className="mb-0 text-center">Editar Proveedor</h4>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Nombre *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Contacto</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)} 
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Teléfono</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Dirección</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)} 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">País *</label>
                                        <select 
                                            className="form-select"
                                            value={countryId}
                                            onChange={(e) => setCountryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar país</option>
                                            {countries.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? "Guardando..." : "Actualizar Proveedor"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate("/suppliers")}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditSupplier;
