import { fetchWithAuth } from "./api";

export async function getBrands() {
    const data = await fetchWithAuth("http://localhost:8080/brands");
    return data;
}

export async function createBrand(brand) {
console.log("Enviando:", JSON.stringify(brand));
  return await fetchWithAuth("http://localhost:8080/brands", {
        method: "POST",
        body: JSON.stringify(brand)
    });     
}

export async function deleteBrand(id) {
    return await fetchWithAuth(`http://localhost:8080/brands/${id}`, {
        method: "DELETE"
    });
}