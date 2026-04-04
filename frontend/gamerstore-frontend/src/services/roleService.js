import { fetchWithAuth } from "./api";

export async function getRoles() {
    const data = await fetchWithAuth("http://localhost:8080/roles");
    return data;
}

export async function createRole(role) {
console.log("Enviando:", JSON.stringify(role));
  return await fetchWithAuth("http://localhost:8080/roles", {
        method: "POST",
        body: JSON.stringify(role)
    });     
}

export async function deleteRole(id) {
    return await fetchWithAuth(`http://localhost:8080/roles/${id}`, {
        method: "DELETE"
    });
}