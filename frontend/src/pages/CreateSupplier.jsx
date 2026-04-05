import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateSupplier() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [countryId, setCountryId] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWithAuth("http://localhost:8080/countries").then(setCountries);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !countryId) {
            alert("Por favor complete los campos obligatorios");
            return;
        }

        setLoading(true);
        try {
            const supplier = {
                name,
                contact,
                phone,
                email,
                address,
                id_country: Number(countryId)
            };

            await createSupplier(supplier);
            alert("Proveedor creado correctamente");
            navigate("/suppliers");
        } catch (error) {
            console.error(error);
            alert("Error al crear proveedor");
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
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Crear Proveedor</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Nombre *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del proveedor"
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
                                            placeholder="Nombre del contacto"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="12345678"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="email@ejemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Dirección</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Dirección completa"
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
                                            <option value="">Seleccione un país</option>
                                            {countries.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Guardando..." : "Crear Proveedor"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
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

export default CreateSupplier;
