import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[phone, setPhone] = useState("");
    
    const [roleId, setRoleId] = useState([]);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    
        useEffect(() => {
       fetch("http://localhost:8080/roles")
        .then(response => response.json())
        .then(data => setRoles(data))
        .catch(error => console.error("Error al cargar roles:", error));
        }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

       try {
          const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone,
                roleId: Number(roleId)
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Error al registrar");
        }
            alert("Usuario registrado correctamente");
           navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Error al registrar");
        }
    };

    return (
        <>
            <h2>Registro</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <select onChange={(e) => setRoleId(e.target.value)}>
                    <option value="">Seleccione Rol</option>
                    {roles.map(r => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Registrarse</button>
            </form>
        </>
    );
}

export default Register;