import { apiFetch } from "./client";

// GET /api/stores                -> daftar semua toko
// GET /api/stores/{id}           -> detail 1 toko
// GET /api/stores/{id}/products  -> produk milik toko itu
//
// Field yang diharapkan frontend per toko (sesuaikan tabel `stores` di migration,
// bisa tambah kolom baru: rating, sold, followers, verified, joined, description, category):
//   { id, name, category, rating, sold, followers, location, verified, joined, desc }

export function getStores() {
  return apiFetch("/stores", { auth: false });
}

export function getStore(id) {
  return apiFetch(`/stores/${id}`, { auth: false });
}

export function getStoreProducts(id) {
  return apiFetch(`/stores/${id}/products`, { auth: false });
}
