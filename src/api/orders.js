import { apiFetch } from "./client";

export function createOrder({ items, payment_method }) {
  return apiFetch("/orders", {
    method: "POST",
    body: {
      items,
      payment_method,
    },
  });
}

export function getMyOrders() {
  return apiFetch("/orders");
}