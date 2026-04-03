import { fetchWithAuth } from "./api";

export async function getCategories() {
    const data = await fetchWithAuth("http://localhost:8080/categories");
    return data;
}

export async function createCategory(category) {
console.log("Enviando:", JSON.stringify(category));
  return await fetchWithAuth("http://localhost:8080/categories", {
        method: "POST",
        body: JSON.stringify(category)
    });     
}

export async function deleteCategory(id) {
    return await fetchWithAuth(`http://localhost:8080/categories/${id}`, {
        method: "DELETE"
    });
}