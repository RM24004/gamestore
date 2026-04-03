import { useState } from "react";
import Navbar from "../components/Navbar";
import { createExit } from "../services/exitService";
import { useNavigate } from "react-router-dom";

function CreateExit(){
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const exit = {
                exit_date: new Date().toISOString().split('T')[0],
                quantity: Number(quantity),
                id_product: Number(productId),
                id_user: 1,
                id_reason: 1
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
                <button type="submit">Registrar</button>
            </form>
            </>
    );
}
export default CreateExit