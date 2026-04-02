import { fetchWithAuth } from "./api";

export async function getRoles() {
    const response = await fetchWithAuth("http://localhost:8080/roles");
    return await response.json();
}