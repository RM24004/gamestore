import { fetchWithAuth } from "./api";

export async function getSuppliers() {
    const response = await fetchWithAuth("http://localhost:8080/suppliers");
    return await response.json();
}