import { apiFetch } from "./client";

export function createOrder({ items }) {
  return apiFetch("/orders", {
    method: "POST",
    body: {
      items,
    },
  });
}

export function getMyOrders() {
  return apiFetch("/orders");
}