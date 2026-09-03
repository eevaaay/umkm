// Base URL diambil dari environment variable, diatur di file .env
// (lihat .env.example). Saat development biasanya http://localhost:8000/api
// (default Laravel `php artisan serve`), saat production ganti ke domain API-mu.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const TOKEN_KEY = "lapakin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// Wrapper fetch: otomatis menempelkan header JSON + Bearer token (kalau ada),
// dan melempar ApiError yang rapi kalau response-nya bukan 2xx supaya gampang
// ditangkap dengan try/catch di pemanggilnya.
export async function apiFetch(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };
  if (body !== undefined) finalHeaders["Content-Type"] = "application/json";

  const token = auth ? getToken() : null;
  if (token) finalHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message = payload?.message || `Permintaan gagal (${res.status})`;
    throw new ApiError(message, res.status, payload);
  }

  return payload;
}

export { ApiError, BASE_URL };
