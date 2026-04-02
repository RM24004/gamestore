export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  // 🔥 manejo centralizado
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response;
}