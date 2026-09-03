import { apiFetch } from "./client";

// Semua endpoint di bawah butuh auth:sanctum + middleware "admin" (cek role user
// di tabel users). Ini yang dipakai panel /admin.
//
// GET   /api/admin/stats                    -> { totalRevenue, totalOrders, totalStores, totalUsers }
// GET   /api/admin/stores                   -> daftar toko (sama seperti /stores tapi tanpa filter publik)
// PATCH /api/admin/stores/{id}/verify       -> toggle status verified, body: { verified: true|false }
// GET   /api/admin/products                 -> daftar semua produk semua toko
// GET   /api/admin/orders                   -> daftar semua pesanan semua toko
// PATCH /api/admin/orders/{id}              -> ubah status, body: { status: "Diproses" | ... }
// GET   /api/admin/users                    -> daftar semua pengguna

export function getAdminStats() {
  return apiFetch("/admin/stats");
}

export function getAdminStores() {
  return apiFetch("/admin/stores");
}

export function setStoreVerified(id, verified) {
  return apiFetch(`/admin/stores/${id}/verify`, { method: "PATCH", body: { verified } });
}

export function getAdminProducts() {
  return apiFetch("/admin/products");
}

export function getAdminOrders() {
  return apiFetch("/admin/orders");
}

export function setOrderStatus(id, status) {
  return apiFetch(`/admin/orders/${id}`, { method: "PATCH", body: { status } });
}

export function getAdminUsers() {
  return apiFetch("/admin/users");
}
