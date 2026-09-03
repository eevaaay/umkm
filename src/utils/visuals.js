import { Package } from "lucide-react";
import { CATEGORIES } from "../data/categories";
import { GRADIENTS } from "../data/categories";

// Backend tidak (dan tidak perlu) menyimpan "komponen ikon" atau "gradient warna" —
// itu murni hiasan tampilan. Kita turunkan otomatis dari data asli (category, id)
// supaya field yang dikirim API tetap sederhana.

export function iconForCategory(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.icon || Package;
}

export function gradForId(id) {
  const n = Number(id) || 0;
  return GRADIENTS[n % GRADIENTS.length];
}
