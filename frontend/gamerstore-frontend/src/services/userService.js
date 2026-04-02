import { fetchWithAuth } from "./api";

export async function getUsers() {
    const response = await fetchWithAuth("http://localhost:8080/users");
    return await response.json();
}