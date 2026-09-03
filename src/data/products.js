import { Smartphone, Shirt, UtensilsCrossed, HeartPulse, Dumbbell, Baby, Sofa } from "lucide-react";
import { GRADIENTS } from "./categories";

export const PRODUCTS = [
  { id: 101, storeId: 3, name: "Earphone TWS ProSound X2", category: "elektronik", icon: Smartphone, price: 249000, discount: 15, rating: 4.8, sold: 3200, stock: 120, weight: 60, desc: "Earphone nirkabel dengan noise cancelling aktif, baterai tahan 30 jam, dan konektivitas Bluetooth 5.3." },
  { id: 102, storeId: 3, name: "Power Bank 20000mAh Fast Charge", category: "elektronik", icon: Smartphone, price: 189000, discount: 0, rating: 4.6, sold: 1890, stock: 75, weight: 350, desc: "Kapasitas besar dengan dukungan fast charging 22.5W untuk semua perangkat." },
  { id: 103, storeId: 3, name: "Smartwatch FitTrack S3", category: "elektronik", icon: Smartphone, price: 459000, discount: 20, rating: 4.7, sold: 980, stock: 40, weight: 45, desc: "Pelacak kebugaran dengan monitor detak jantung, SpO2, dan tahan air IP68." },
  { id: 104, storeId: 3, name: "Kabel Data USB-C Braided 2m", category: "elektronik", icon: Smartphone, price: 39000, discount: 0, rating: 4.5, sold: 4100, stock: 400, weight: 50, desc: "Kabel data tahan lama dengan lapisan nylon braided, mendukung fast charging." },
  { id: 201, storeId: 4, name: "Batik Tulis Motif Parang Klasik", category: "fashion-wanita", icon: Shirt, price: 385000, discount: 10, rating: 4.9, sold: 640, stock: 25, weight: 250, desc: "Kain batik tulis asli dengan pewarna alami, motif parang klasik khas Solo." },
  { id: 202, storeId: 4, name: "Dress Batik Kombinasi Modern", category: "fashion-wanita", icon: Shirt, price: 275000, discount: 0, rating: 4.8, sold: 512, stock: 30, weight: 300, desc: "Dress batik dengan potongan modern, nyaman dipakai untuk acara formal maupun santai." },
  { id: 301, storeId: 7, name: "Kaos Distro Graphic Tee Edisi Lokal", category: "fashion-pria", icon: Shirt, price: 129000, discount: 25, rating: 4.5, sold: 2100, stock: 200, weight: 180, desc: "Kaos katun combed 24s dengan sablon plastisol tahan lama, desain eksklusif." },
  { id: 302, storeId: 7, name: "Jaket Bomber Streetwear", category: "fashion-pria", icon: Shirt, price: 320000, discount: 0, rating: 4.6, sold: 780, stock: 60, weight: 450, desc: "Jaket bomber unisex dengan bahan tebal, cocok untuk gaya kasual harian." },
  { id: 401, storeId: 1, name: "Biji Kopi Arabika Gayo 250g", category: "makanan", icon: UtensilsCrossed, price: 68000, discount: 0, rating: 4.9, sold: 5400, stock: 300, weight: 250, desc: "Biji kopi arabika single origin dari Gayo, disangrai medium untuk rasa seimbang." },
  { id: 402, storeId: 1, name: "Paket Kopi Nusantara 4 Varian", category: "makanan", icon: UtensilsCrossed, price: 145000, discount: 12, rating: 4.8, sold: 1230, stock: 90, weight: 500, desc: "Kumpulan 4 varian kopi terbaik dari berbagai daerah, cocok untuk hadiah." },
  { id: 403, storeId: 1, name: "Teh Herbal Rempah Nusantara", category: "makanan", icon: UtensilsCrossed, price: 42000, discount: 0, rating: 4.6, sold: 2900, stock: 210, weight: 100, desc: "Racikan teh herbal dari rempah pilihan, cocok diminum hangat setiap hari." },
  { id: 501, storeId: 8, name: "Serum Vitamin C Brightening 30ml", category: "kesehatan", icon: HeartPulse, price: 95000, discount: 30, rating: 4.7, sold: 8900, stock: 150, weight: 80, desc: "Serum wajah dengan Vitamin C 20% untuk kulit cerah merata, sudah BPOM." },
  { id: 502, storeId: 8, name: "Sunscreen Gel SPF 50 PA+++", category: "kesehatan", icon: HeartPulse, price: 78000, discount: 0, rating: 4.8, sold: 6700, stock: 200, weight: 60, desc: "Tabir surya ringan tanpa whitecast, cocok untuk semua jenis kulit." },
  { id: 601, storeId: 5, name: "Sepatu Lari UltraRun Pro", category: "olahraga", icon: Dumbbell, price: 549000, discount: 18, rating: 4.6, sold: 1450, stock: 55, weight: 700, desc: "Sepatu lari dengan sol responsif dan bantalan empuk untuk jarak jauh." },
  { id: 602, storeId: 5, name: "Matras Yoga Anti Slip 8mm", category: "olahraga", icon: Dumbbell, price: 115000, discount: 0, rating: 4.7, sold: 2340, stock: 130, weight: 900, desc: "Matras yoga tebal dengan permukaan anti selip, dilengkapi tali jinjing." },
  { id: 701, storeId: 6, name: "Mainan Edukasi Balok Kayu Susun", category: "anak-bayi", icon: Baby, price: 89000, discount: 5, rating: 4.9, sold: 1670, stock: 80, weight: 400, desc: "Mainan edukasi dari kayu solid, aman dan membantu motorik anak sejak dini." },
  { id: 702, storeId: 6, name: "Baby Carrier Ergonomis 4in1", category: "anak-bayi", icon: Baby, price: 210000, discount: 0, rating: 4.8, sold: 940, stock: 45, weight: 600, desc: "Gendongan bayi ergonomis dengan 4 posisi, nyaman untuk orang tua dan bayi." },
  { id: 801, storeId: 2, name: "Kursi Ukir Jati Klasik", category: "furnitur", icon: Sofa, price: 1250000, discount: 8, rating: 4.9, sold: 210, stock: 12, weight: 8000, desc: "Kursi ukir kayu jati solid dengan detail klasik, tahan puluhan tahun." },
  { id: 802, storeId: 2, name: "Rak Dinding Minimalis Kayu", category: "furnitur", icon: Sofa, price: 315000, discount: 0, rating: 4.7, sold: 560, stock: 34, weight: 2500, desc: "Rak dinding kayu jati dengan desain minimalis, mudah dipasang." },
];

export function gradFor(product) {
  return product.grad || GRADIENTS[product.id % GRADIENTS.length];
}

export function priceAfterDiscount(p) {
  return Math.round(p.price * (1 - p.discount / 100));
}
