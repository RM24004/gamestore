import { fetchWithAuth } from "./api";

export async function getPlatforms() {
    const response = await fetchWithAuth("http://localhost:8080/platforms");
    return await response.json();
}