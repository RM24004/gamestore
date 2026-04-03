import { fetchWithAuth } from "./api";

export async function getSuppliers() {
    const data = await fetchWithAuth("http://localhost:8080/suppliers");
    return data;
}
export async function createSupplier(supplier) {
console.log("Enviando:", JSON.stringify(supplier));
  return await fetchWithAuth("http://localhost:8080/suppliers", {
        method: "POST",
        body: JSON.stringify(supplier)
    });     
}

export async function deleteSupplier(id) {
    return await fetchWithAuth(`http://localhost:8080/suppliers/${id}`, {
        method: "DELETE"
    });
}