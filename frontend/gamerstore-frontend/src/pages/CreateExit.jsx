import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createExit } from "../services/exitService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateExit(){
    const [quantity, setQuantity] = useState("");
    
    const userId=localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [reasonId, setReasonId] = useState("");
    const [reasons, setReasons] = useState([]);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchWithAuth("http://localhost:8080/products").then(setProducts);
        fetchWithAuth("http://localhost:8080/reasons").then(setReasons);
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const exit = {
                exit_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                id_product: Number(productId),
                id_user: Number(userId),
                id_reason: Number(reasonId)
            };
            console.log("Enviando", JSON.stringify(exit));
                    await createExit(exit);
                    alert("Salida de producto correctamente");
                    navigate("/exits")}
            
                catch(error){
                console.error(error);
                alert("Error al registrar una entrada");
            }
        };
        return(
              <>
            <Navbar />
            <h2>Registrar Salida</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Usuario: </label>
                    <input 
                        type="text" 
                        value={userEmail || ""} 
                        disabled 
                        style={{ backgroundColor: "#eee" }}
                    />
                </div>

                <select onChange={(e) => setProductId(e.target.value)}>
                <option value="">Seleccione Producto</option>
                {products.map(c => (
                <option key={c.id} value={c.id}>
                {c.name}
                </option>
                ))}

                </select>
                <select onChange={(e) => setReasonId(e.target.value)}>
                <option value="">Seleccione Motivo</option>
                {reasons.map(c => (
                <option key={c.id} value={c.id}>
                {c.name}
                </option>
                ))}
                </select>

                <input
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
            </>
    );
}
export default CreateExit