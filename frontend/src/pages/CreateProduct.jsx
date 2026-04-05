import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    
    const [brandId, setBrandId] = useState("");
    const [brands, setBrands] = useState([]);
    
    const [platformId, setPlatformId] = useState("");
    const [platforms, setPlatforms] = useState([]);

    const [supplierId, setSupplierId] = useState("");
    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetchWithAuth("http://localhost:8080/categories"),
            fetchWithAuth("http://localhost:8080/brands"),
            fetchWithAuth("http://localhost:8080/platforms"),
            fetchWithAuth("http://localhost:8080/suppliers")
        ]).then(([categoriesData, brandsData, platformsData, suppliersData]) => {
            setCategories(categoriesData);
            setBrands(brandsData);
            setPlatforms(platformsData);
            setSuppliers(suppliersData);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock || !categoryId || !brandId || !platformId || !supplierId) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        setLoading(true);
        try {
            const product = {
                name,
                price: Number(price),
                current_stock: Number(stock),
                brand_id: Number(brandId),
                category_id: Number(categoryId),
                platform_id: Number(platformId),
                supplier_id: Number(supplierId),
                description,
                image_url: imageUrl || null
            };

            await createProduct(product);
            alert("Producto creado correctamente");
            navigate("/products");
        } catch (error) {
            console.error(error);
            alert("Error al crear producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white py-3">
                                <h4 className="mb-0 text-center">Crear Producto</h4>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Nombre del Producto *</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Nombre del producto"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Precio *</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="0.00"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        step="0.01"
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Descripción del producto"
                                            rows="2"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Marca *</label>
                                                <select
                                                    className="form-select"
                                                    value={brandId}
                                                    onChange={(e) => setBrandId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Seleccione marca</option>
                                                    {brands.map(b => (
                                                        <option key={b.id} value={b.id}>{b.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Categoría *</label>
                                                <select
                                                    className="form-select"
                                                    value={categoryId}
                                                    onChange={(e) => setCategoryId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Seleccione categoría</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Plataforma *</label>
                                                <select
                                                    className="form-select"
                                                    value={platformId}
                                                    onChange={(e) => setPlatformId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Seleccione plataforma</option>
                                                    {platforms.map(p => (
                                                        <option key={p.id} value={p.id}>{p.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Proveedor *</label>
                                                <select
                                                    className="form-select"
                                                    value={supplierId}
                                                    onChange={(e) => setSupplierId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Seleccione proveedor</option>
                                                    {suppliers.map(s => (
                                                        <option key={s.id} value={s.id}>{s.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Stock Inicial *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Cantidad"
                                                    value={stock}
                                                    onChange={(e) => setStock(e.target.value)}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">URL de Imagen</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    placeholder="https://ejemplo.com/imagen.jpg"
                                                    value={imageUrl}
                                                    onChange={(e) => setImageUrl(e.target.value)}
                                                />
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
                                                    Guardando...
                                                </>
                                            ) : (
                                                "Crear Producto"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate("/products")}
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

export default CreateProduct;
