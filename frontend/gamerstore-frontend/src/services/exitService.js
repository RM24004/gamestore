import { fetchWithAuth } from "./api";

export async function getExits() {
    const response = await fetchWithAuth("http://localhost:8080/exits");
    return await response.json();
}