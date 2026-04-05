import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createExit } from "../services/exitService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateExit() {
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [reasonId, setReasonId] = useState("");
    const [reasons, setReasons] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetchWithAuth("http://localhost:8080/products"),
            fetchWithAuth("http://localhost:8080/reasons")
        ]).then(([productsData, reasonsData]) => {
            setProducts(productsData);
            setReasons(reasonsData);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productId || !quantity || !reasonId) {
            alert("Por favor complete todos los campos");
            return;
        }

        setLoading(true);
        try {
            const exit = {
                exit_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                id_product: Number(productId),
                id_user: Number(userId),
                id_reason: Number(reasonId)
            };

            await createExit(exit);
            alert("Salida registrada correctamente");
            navigate("/exits");
        } catch (error) {
            console.error(error);
            alert("Error al registrar la salida");
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
                                <h4 className="mb-0 text-center">Registrar Salida</h4>
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

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Motivo *</label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={reasonId}
                                            onChange={(e) => setReasonId(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione un motivo</option>
                                            {reasons.map(r => (
                                                <option key={r.id} value={r.id}>
                                                    {r.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Cantidad *</label>
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            placeholder="Cantidad a retirar"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="d-grid gap-2">
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
                                                "Registrar Salida"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate("/exits")}
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

export default CreateExit;
