import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar productos");
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que desea eliminar este producto?")) {
            return;
        }
        try {
            await deleteProduct(id);
            alert("Producto eliminado");
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar producto");
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())||
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())||
        p.platformName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Productos en el Inventario</h2>
                    <button 
                        className="btn btn-success"
                        onClick={() => navigate("/create-product")}
                    >
                        + Nuevo Producto
                    </button>
                </div>

                <div className="mb-4">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => setSearchTerm("")}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="alert alert-info text-center">
                        {searchTerm ? "No se encontraron productos" : "No hay productos registrados"}
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredProducts.map(p => (
                            <div key={p.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    {p.image_url ? (
                                        <div 
                                            className="position-relative"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setSelectedImage({ url: p.image_url, name: p.name })}
                                        >
                                            <img 
                                                src={p.image_url} 
                                                className="card-img-top" 
                                                alt={p.name}
                                                style={{ height: "180px", objectFit: "cover" }}
                                            />
                                            <span 
                                                className="position-absolute top-0 end-0 bg-dark bg-opacity-50 text-white p-1 rounded-circle m-2"
                                                style={{ fontSize: "12px" }}
                                            >
                                                <i className="bi bi-zoom-in"></i>
                                            </span>
                                        </div>
                                    ) : (
                                        <div 
                                            className="card-img-top d-flex align-items-center justify-content-center bg-secondary"
                                            style={{ height: "180px" }}
                                        >
                                            <i className="bi bi-image text-white" style={{ fontSize: "48px" }}></i>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            <strong>Precio:</strong> ${p.price}<br />
                                            <strong>Stock:</strong> {p.current_stock}<br />
                                            <strong>Categoría:</strong> {p.categoryName || "N/A"}<br />
                                            <strong>Marca:</strong> {p.brandName || "N/A"}<br />
                                            <strong>Plataforma:</strong> {p.platformName || "N/A"}<br />
                                            <strong>Proveedor:</strong> {p.supplierName || "N/A"}
                                        </p>
                                        {p.description && (
                                            <p className="card-text">
                                                <small className="text-muted">{p.description}</small>
                                            </p>
                                        )}
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => navigate(`/products/edit/${p.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm flex-grow-1"
                                                onClick={() => handleDelete(p.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div 
                    className="modal show d-block" 
                    style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content bg-transparent border-0">
                            <div className="modal-body p-0 position-relative">
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                                    onClick={() => setSelectedImage(null)}
                                ></button>
                                <img 
                                    src={selectedImage.url} 
                                    alt={selectedImage.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "80vh", objectFit: "contain" }}
                                />
                                <h5 className="text-white text-center mt-3">{selectedImage.name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Products;
