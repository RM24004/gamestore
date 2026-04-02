import { fetchWithAuth } from "./api";

export async function getCountries() {
    const response = await fetchWithAuth("http://localhost:8080/countries");
    return await response.json();
}