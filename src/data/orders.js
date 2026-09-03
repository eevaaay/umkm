export const MOCK_ORDERS = [
  { id: "ORD-8841", buyer: "Dewi Anggraini", storeId: 3, total: 508000, status: "Selesai", date: "2026-08-28" },
  { id: "ORD-8842", buyer: "Rizky Pratama", storeId: 4, total: 385000, status: "Dikirim", date: "2026-08-29" },
  { id: "ORD-8843", buyer: "Siti Nurhaliza", storeId: 1, total: 213000, status: "Diproses", date: "2026-08-30" },
  { id: "ORD-8844", buyer: "Ahmad Fauzi", storeId: 5, total: 664000, status: "Menunggu Pembayaran", date: "2026-08-31" },
  { id: "ORD-8845", buyer: "Putri Lestari", storeId: 8, total: 173000, status: "Selesai", date: "2026-08-31" },
  { id: "ORD-8846", buyer: "Bagas Wicaksono", storeId: 7, total: 129000, status: "Dibatalkan", date: "2026-09-01" },
];

export const ORDER_STATUSES = ["Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

// Warna badge status disesuaikan agar konsisten dengan palet lembut aplikasi.
export const STATUS_COLOR = {
  "Menunggu Pembayaran": { fg: "#8A6D28", bg: "#F2E7CB" },
  Diproses: { fg: "#3E5E82", bg: "#E2EAF2" },
  Dikirim: { fg: "#2F5C4E", bg: "#DEEBE4" },
  Selesai: { fg: "#3B6B4B", bg: "#E4EFE1" },
  Dibatalkan: { fg: "#8A4038", bg: "#F2E0DC" },
};
