import { fetchWithAuth } from "./api";

export async function getReasons() {
    const data = await fetchWithAuth("http://localhost:8080/reasons");
    return data;
}

export async function createReason(reason) {
console.log("Enviando:", JSON.stringify(reason));
  return await fetchWithAuth("http://localhost:8080/reasons", {
        method: "POST",
        body: JSON.stringify(reason)
    });     
}

export async function deleteReason(id) {
    return await fetchWithAuth(`http://localhost:8080/reasons/${id}`, {
        method: "DELETE"
    });
}