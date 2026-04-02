import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getEntries } from "../services/entryService";

function Entries(){
    const [entries, setEntries] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            try{
                const data = await getEntries();
                setEntries(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[]);
    return (
        <>
        <Navbar />
            <h1>Entradas de Productos</h1>
            <div style={{ 
                display: "grid",
                gridTemplateColumns:"repeat(3, 1fr)",
                gap: "15px",
                padding: "10px"
            }}> 
                {entries.length === 0 ? (
                    <p>No hay entradas registradas</p>
                ) : (
                    entries.map(e => (
                        <div key={e.id} style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px"}}>
                            <h3>{e.productName}</h3>
                            <p>Cantidad: {e.quantity}</p>
                            <p>Fecha: {e.entry_date}</p>
                            <p>Usuario: {e.username}</p></div>
                            ))
                        )}
            </div>
        </>
    );
}
export default Entries;