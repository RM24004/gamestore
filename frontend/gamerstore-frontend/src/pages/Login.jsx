import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
        const data = await login(email, password);
        const decoded = jwtDecode(data.token);
        
        console.log("Decodificado:", decoded);
        console.log("Keys:", Object.keys(decoded));
        console.log(decoded);
        console.log("TOKEN: ",data.token)

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", decoded.sub);
        localStorage.setItem("userId", decoded.userId);
        localStorage.setItem("role", decoded.role);
        alert("Login exitoso")
        navigate("/products")
    } catch (error) {
        console.error(error)
        alert("Error en login")
        
    }
  };
  return (
    <div>
        <h2>Login</h2>
        <input 
        type="text"
        placeholder="Correo"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}  
        />
        <br />
        <input 
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}  
        />
        <br />
        <button onClick={handleLogin}>Iniciar Session</button>
        <button onClick={() => navigate("/register")}>Crear Cuenta</button>
        </div>  
  )
}
export default Login;