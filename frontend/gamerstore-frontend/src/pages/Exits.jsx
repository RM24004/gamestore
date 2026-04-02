import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getExits } from "../services/exitService";

function Entries(){
    const [exits, setExits] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            try{
                const data = await getExits();
                setExits(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[]);
    return (
        <>
        <Navbar />
            <h1>Salidas de Productos</h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}>
                 {exits.length === 0 ? (
                    <p>No hay salidas registradas</p>
                ) : (
                    exits.map(e => (
                        <div key={e.id} style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px"}}>
                            <h3>{e.productName}</h3>
                            <p>Cantidad: {e.quantity}</p>
                            <p>Fecha: {e.exit_date}</p>
                            <p>Razon: {e.reasonName}</p>
                            <p>Usuario: {e.userName}</p></div>
                            ))
                        )}
            </div>
        </>
    );
}

export default Entries;