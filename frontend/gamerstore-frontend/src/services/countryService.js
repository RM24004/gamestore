import { fetchWithAuth } from "./api";

export async function getCountries() {
    const data = await fetchWithAuth("http://localhost:8080/countries");
    return data;
}
export async function createCountry(country) {
console.log("Enviando:", JSON.stringify(country));
  return await fetchWithAuth("http://localhost:8080/countries", {
        method: "POST",
        body: JSON.stringify(country)
    });     
}

export async function deleteCountry(id) {
    return await fetchWithAuth(`http://localhost:8080/countries/${id}`, {
        method: "DELETE"
    });
}