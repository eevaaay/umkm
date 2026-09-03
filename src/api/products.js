import { apiFetch } from "./client";

// GET /api/products?category=&q=&store_id=  -> daftar produk (bisa difilter)
// GET /api/products/{id}                     -> detail 1 produk
//
// Field yang diharapkan frontend per produk (gabungan tabel `products` +
// `product_details` di ERD-mu). Sertakan juga relasi `store` (eager load
// ->with('store') di Laravel) supaya kartu produk & halaman detail bisa
// langsung menampilkan info toko tanpa request tambahan:
//   {
//     id, name, category, price, discount, rating, sold, stock, weight, desc,
//     store: { id, name, location, verified }
//   }
// `icon` dan `grad` (warna) TIDAK perlu dikirim backend — itu dihitung otomatis
// di frontend dari `category` dan `id` (lihat src/utils/visuals.js).

export function getProducts(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== null))
  ).toString();
  return apiFetch(`/products${query ? `?${query}` : ""}`, { auth: false });
}

export function getProduct(id) {
  return apiFetch(`/products/${id}`, { auth: false });
}
