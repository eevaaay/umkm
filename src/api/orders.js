import { apiFetch } from "./client";

// POST /api/orders  (auth:sanctum)
//   body: { address, payment_method, items: [{ product_id, qty }] }
//   -> di Laravel: buat 1 baris `orders` + banyak baris `order_details` (per item)
//      + 1 baris `payments` (method, amount, status awal)
//
// GET /api/orders  (auth:sanctum) -> daftar pesanan milik user yang sedang login

export function createOrder({ address, paymentMethod, items }) {
  return apiFetch("/orders", {
    method: "POST",
    body: { address, payment_method: paymentMethod, items },
  });
}

export function getMyOrders() {
  return apiFetch("/orders");
}
