import { fetchWithAuth } from "./api";

export async function getCategories() {
    const response = await fetchWithAuth("http://localhost:8080/categories");
    return await response.json();
}