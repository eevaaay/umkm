import {
  Smartphone, Shirt, UtensilsCrossed, HeartPulse, Home as HomeIcon,
  Dumbbell, Baby, Sofa,
} from "lucide-react";

export const CATEGORIES = [
  { id: "elektronik", label: "Elektronik", icon: Smartphone },
  { id: "fashion-pria", label: "Fashion Pria", icon: Shirt },
  { id: "fashion-wanita", label: "Fashion Wanita", icon: Shirt },
  { id: "makanan", label: "Makanan & Minuman", icon: UtensilsCrossed },
  { id: "kesehatan", label: "Kesehatan & Kecantikan", icon: HeartPulse },
  { id: "rumah-tangga", label: "Rumah Tangga", icon: HomeIcon },
  { id: "olahraga", label: "Olahraga", icon: Dumbbell },
  { id: "anak-bayi", label: "Anak & Bayi", icon: Baby },
  { id: "furnitur", label: "Furnitur & Dekor", icon: Sofa },
];

// Pasangan gradien lembut untuk thumbnail produk/toko (pengganti foto asli).
export const GRADIENTS = [
  ["#C57A52", "#E3B79A"],
  ["#4C7A6C", "#8FB6A6"],
  ["#8B7FB8", "#BBB2DC"],
  ["#B98F2C", "#E0C471"],
  ["#B15A4E", "#DD9C8F"],
  ["#5C84AE", "#A2C0DD"],
  ["#4B8B80", "#94C6B9"],
  ["#A5678E", "#D6A9C1"],
];
