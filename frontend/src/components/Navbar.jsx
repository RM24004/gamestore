import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand fw-bold">
                    Bienvenido, {email}
                </a>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span 
                                className="nav-link" 
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/products")}
                            >
                                Productos
                            </span>
                        </li>
                        <li className="nav-item">
                            <span 
                                className="nav-link" 
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/entries")}
                            >
                                Entradas
                            </span>
                        </li>
                        <li className="nav-item">
                            <span 
                                className="nav-link" 
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/exits")}
                            >
                                Salidas
                            </span>
                        </li>

                        {role === "ADMIN" && (
                            <>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/brands")}
                                    >
                                        Marcas
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/categories")}
                                    >
                                        Categorías
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/platforms")}
                                    >
                                        Plataformas
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/suppliers")}
                                    >
                                        Proveedores
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/reasons")}
                                    >
                                        Motivos
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/countries")}
                                    >
                                        Paises
                                    </span>
                                </li>
                                 <li className="nav-item">
                                    <span 
                                        className="nav-link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/users")}
                                    >
                                        Usuarios
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex">
                        <button 
                            className="btn btn-outline-light"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
