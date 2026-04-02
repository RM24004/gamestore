import { fetchWithAuth } from "./api";

export async function getReasons() {
    const response = await fetchWithAuth("http://localhost:8080/reasons");
    return await response.json();
}