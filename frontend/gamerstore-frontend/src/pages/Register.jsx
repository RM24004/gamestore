import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/roles")
            .then(response => response.json())
            .then(data => setRoles(data))
            .catch(error => console.error("Error al cargar roles:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !phone || !roleId) {
            alert("Por favor complete todos los campos");
            return;
        }

        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg">
                            <div className="row g-0">
                                {/* Imagen */}
                                <div className="col-md-5 bg-primary d-flex align-items-center justify-content-center p-4">
                                    <div className="text-center text-white">
                                        <img 
                                            src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=400" 
                                            alt="Inventario" 
                                            className="img-fluid rounded"
                                        />
                                        <h3 className="mt-3 fw-bold">Únete al Sistema</h3>
                                        <p>Crea tu cuenta para comenzar</p>
                                    </div>
                                </div>

                                {/* Formulario */}
                                <div className="col-md-7">
                                    <div className="card-body p-5">
                                        <h2 className="text-center mb-4 text-primary fw-bold">Crear Cuenta</h2>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Nombre Completo</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Tu nombre"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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
                                                <label className="form-label fw-semibold">Rol</label>
                                                <select
                                                    className="form-select"
                                                    value={roleId}
                                                    onChange={(e) => setRoleId(e.target.value)}
                                                >
                                                    <option value="">Seleccione un rol</option>
                                                    {roles.map(r => (
                                                        <option key={r.id} value={r.id}>
                                                            {r.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Correo Electrónico</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="correo@ejemplo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold">Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Registrando..." : "Crear Cuenta"}
                                                </button>
                                            </div>
                                        </form>

                                        <div className="text-center mt-4">
                                            <p className="text-muted">
                                                ¿Ya tienes cuenta?{' '}
                                                <span 
                                                    onClick={() => navigate("/")}
                                                    style={{ cursor: "pointer", color: "#0d6efd", fontWeight: "600" }}
                                                >
                                                    Inicia sesión aquí
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
