import { fetchWithAuth } from "./api";

export async function getProducts() {
    const data = await fetchWithAuth("http://localhost:8080/products");
    return data;
}

export async function createProduct(product) {
console.log("Enviando:", JSON.stringify(product));
  return await fetchWithAuth("http://localhost:8080/products", {
        method: "POST",
        body: JSON.stringify(product)
    });     
}

export async function deleteProducts(id) {
    return await fetchWithAuth(`http://localhost:8080/products/${id}`, {
        method: "DELETE"
    });
}