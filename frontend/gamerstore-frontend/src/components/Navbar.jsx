import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div style={{
            background: "#222",
            color: "#fff",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span>Bienvenido, {email}</span>
                <span style={{ cursor: "pointer" }} onClick={() => navigate("/products")}>
                    Productos
                </span>
                <span style={{ cursor: "pointer" }} onClick={() => navigate("/entries")}>
                    Entradas
                </span>
                <span style={{ cursor: "pointer" }} onClick={() => navigate("/exits")}>
                    Salidas
                </span>
                {role === "ADMIN" && (
                    <span style={{ cursor: "pointer" }} onClick={() => navigate("/users")}>
                        Usuarios
                    </span>
                )}
            </div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Navbar;