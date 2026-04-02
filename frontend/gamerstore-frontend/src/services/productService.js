import { fetchWithAuth } from "./api";

export async function getProducts() {
    const response = await fetchWithAuth("http://localhost:8080/products");
    return await response.json();
}