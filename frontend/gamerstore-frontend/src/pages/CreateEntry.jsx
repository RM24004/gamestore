import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createEntry } from "../services/entryService";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../services/api";

function CreateEntry() {
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);

    const [quantity, setQuantity] = useState("");
    const [unitCost, setUnitCost] = useState("");

    const userId=localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    
    const navigate = useNavigate();
    useEffect(() => {
        fetchWithAuth("http://localhost:8080/products").then(setProducts);
    },[]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const entry = {
                entry_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                unit_cost: Number(unitCost),
                id_product: Number(productId),
                id_user: Number(userId)
            };
            console.log("Enviando", JSON.stringify(entry));
            await createEntry(entry);
            alert("Entrada de producto correctamente");
            navigate("/entries")}

            catch(error){
                console.error(error);
                alert("Error al registrar una entrada");
            }
    };
        return (
            <>
            <Navbar />
            <h2>Registrar Entrada</h2>
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

                <input
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Costo Unitario"
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
            </>
    );
}
export default CreateEntry