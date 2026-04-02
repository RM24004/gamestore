import { fetchWithAuth } from "./api";

export async function getBrands() {
    const response = await fetchWithAuth("http://localhost:8080/brands");
    return await response.json();
}