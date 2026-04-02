import { fetchWithAuth } from "./api";

export async function getEntries() {
    const response = await fetchWithAuth("http://localhost:8080/entries");
    return await response.json();
}