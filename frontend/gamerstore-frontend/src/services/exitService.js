import { fetchWithAuth } from "./api";

export async function getExits() {
    const data = await fetchWithAuth("http://localhost:8080/exits");
    return data;
}
export async function createExit(exit){
console.log("Enviando:", JSON.stringify(exit));
  return await fetchWithAuth("http://localhost:8080/exits", {
        method: "POST",
        body: JSON.stringify(exit)
    });     
}