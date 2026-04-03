import { useState } from "react";
import Navbar from "../components/Navbar";
import { createEntry } from "../services/entryService";
import { useNavigate } from "react-router-dom";

function CreateEntry() {
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitCost, setUnitCost] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const entry = {
                entry_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                unit_cost: Number(unitCost),
                id_product: Number(productId),
                id_user: 1
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
                <input
                    type="number"
                    placeholder="ID Producto"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />

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