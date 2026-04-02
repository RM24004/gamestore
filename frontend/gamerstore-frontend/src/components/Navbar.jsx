import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
     const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return(
        <div style={{
            background: "#222",
            color: "#fff",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between"
            
        }}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span>Bienvenido</span>
                <span style=
                    {{
                        marginRight: "15px", cursor: "pointer"
                    }} onClick={() => navigate("/products")}>
                    Productos
                </span>
                 <span style=
                    {{
                        marginRight: "15px", cursor: "pointer"
                    }} onClick={() => navigate("/entries")}>
                    Entradas
                </span>
                 <span style=
                    {{
                        marginRight: "15px", cursor: "pointer"
                    }} onClick={() => navigate("/exits")}>
                    Salidas
                </span>
            </div>
            <button onClick={handleLogout}></button>
        </div>
    )
}
export default Navbar;