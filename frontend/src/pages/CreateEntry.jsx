import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createEntry } from "../services/entryService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateEntry() {
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [unitCost, setUnitCost] = useState("");
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchWithAuth("http://localhost:8080/products").then(setProducts);
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("No se encontró el usuario. Inicia sesión.");
            return;
        }

        if (!productId || !quantity || !unitCost) {
            alert("Por favor complete todos los campos");
            return;
        }

        setLoading(true);
        try {
            const entry = {
                entry_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                unit_cost: Number(unitCost),
                id_product: Number(productId),
                id_user: Number(userId)
            };
    
            await createEntry(entry);
            alert("Entrada registrada correctamente");
            navigate("/entries");
        } catch (error) {
            console.error(error);
            alert("Error al registrar entrada");
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
                                <h4 className="mb-0 text-center">Registrar Entrada</h4>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userEmail || ""}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Producto *</label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione un producto</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Cantidad *</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-lg"
                                                    placeholder="Cantidad"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Costo Unitario *</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-lg"
                                                        placeholder="0.00"
                                                        value={unitCost}
                                                        onChange={(e) => setUnitCost(e.target.value)}
                                                        min="0"
                                                        step="0.01"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Registrando...
                                                </>
                                            ) : (
                                                "Registrar Entrada"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate("/entries")}
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

export default CreateEntry;
