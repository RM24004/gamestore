import { fetchWithAuth } from "./api";

export async function getUsers() {
    const data = await fetchWithAuth("http://localhost:8080/users");
    return data;
}

export async function createUser(user) {
console.log("Enviando:", JSON.stringify(user));
  return await fetchWithAuth("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify(user)
    });     
}

export async function deleteUser(id) {
    return await fetchWithAuth(`http://localhost:8080/users/${id}`, {
        method: "DELETE"
    });
}