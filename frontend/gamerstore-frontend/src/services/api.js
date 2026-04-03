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

  //manejo centralizado
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/";
    throw new Error("Sesión expirada");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${response.status}`);
  }
  return response.json();
}