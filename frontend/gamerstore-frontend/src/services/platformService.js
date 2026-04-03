import { fetchWithAuth } from "./api";

export async function getPlatforms() {
    const data = await fetchWithAuth("http://localhost:8080/platforms");
    return data;
}
export async function createPlatform(platform) {
console.log("Enviando:", JSON.stringify(platform));
  return await fetchWithAuth("http://localhost:8080/platforms", {
        method: "POST",
        body: JSON.stringify(platform)
    });     
}

export async function deletePlatform(id) {
    return await fetchWithAuth(`http://localhost:8080/platforms/${id}`, {
        method: "DELETE"
    });
}