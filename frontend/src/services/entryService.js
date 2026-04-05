import { fetchWithAuth } from "./api";

export async function getEntries() {
    const data = await fetchWithAuth("http://localhost:8080/entries");
    return data;
}
export async function createEntry(entry){
console.log("Enviando:", JSON.stringify(entry));
  return await fetchWithAuth("http://localhost:8080/entries", {
        method: "POST",
        body: JSON.stringify(entry)
    });     
}