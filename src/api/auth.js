import { apiFetch, setToken } from "./client";

// Endpoint yang perlu kamu sediakan di Laravel (routes/api.php), pakai Sanctum:
//   POST /api/register  { name, email, password, password_confirmation }
//   POST /api/login      { email, password }
//   POST /api/logout     (auth:sanctum)
//   GET  /api/user        (auth:sanctum)  -> user yang sedang login
//
// Response login/register yang diharapkan frontend:
//   { user: { id, name, email, role }, token: "..." }
// `role` disarankan berupa kolom baru di tabel users (mis. enum: 'admin' | 'store_owner' | 'customer').

export async function login(email, password) {
  const data = await apiFetch("/login", { method: "POST", body: { email, password }, auth: false });
  setToken(data.token);
  return data.user;
}

export async function register(name, email, password) {
  const data = await apiFetch("/register", {
    method: "POST",
    body: { name, email, password, password_confirmation: password },
    auth: false,
  });
  setToken(data.token);
  return data.user;
}

export async function logout() {
  try {
    await apiFetch("/logout", { method: "POST" });
  } finally {
    setToken(null);
  }
}

export async function fetchCurrentUser() {
  return apiFetch("/user");
}
