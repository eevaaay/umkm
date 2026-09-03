import { GRADIENTS } from "./categories";

export const STORES = [
  { id: 1, name: "Rumah Kopi Nusantara", category: "Makanan & Minuman", rating: 4.9, sold: 15200, followers: 8400, location: "Yogyakarta", verified: true, joined: "2019", grad: GRADIENTS[0], desc: "Menjual biji kopi pilihan dari petani lokal di seluruh Nusantara, disangrai segar setiap minggu." },
  { id: 2, name: "Kriya Kayu Jepara", category: "Furnitur & Dekor", rating: 4.8, sold: 3100, followers: 2200, location: "Jepara", verified: true, joined: "2018", grad: GRADIENTS[7], desc: "Furnitur ukir kayu jati asli Jepara, dibuat oleh pengrajin turun-temurun." },
  { id: 3, name: "Tokoh Elektronik Jaya", category: "Elektronik", rating: 4.7, sold: 42500, followers: 19800, location: "Jakarta", verified: true, joined: "2016", grad: GRADIENTS[5], desc: "Distributor resmi gadget dan aksesoris elektronik dengan garansi nasional." },
  { id: 4, name: "Batik Sekar Ayu", category: "Fashion Wanita", rating: 4.9, sold: 9800, followers: 6100, location: "Solo", verified: true, joined: "2020", grad: GRADIENTS[3], desc: "Batik tulis dan cap otentik langsung dari pengrajin Solo." },
  { id: 5, name: "Sportindo Gear", category: "Olahraga", rating: 4.6, sold: 21300, followers: 11400, location: "Bandung", verified: false, joined: "2021", grad: GRADIENTS[6], desc: "Perlengkapan olahraga lari, gym, dan outdoor untuk semua level." },
  { id: 6, name: "Kids Corner Store", category: "Anak & Bayi", rating: 4.8, sold: 7600, followers: 4300, location: "Surabaya", verified: true, joined: "2019", grad: GRADIENTS[4], desc: "Perlengkapan bayi dan mainan edukasi anak yang aman dan berkualitas." },
  { id: 7, name: "Kang Distro Jaya", category: "Fashion Pria", rating: 4.5, sold: 13400, followers: 7700, location: "Bandung", verified: false, joined: "2022", grad: GRADIENTS[1], desc: "Streetwear dan kaos distro lokal dengan desain eksklusif." },
  { id: 8, name: "Klinik Cantik Alami", category: "Kesehatan & Kecantikan", rating: 4.7, sold: 26700, followers: 15600, location: "Jakarta", verified: true, joined: "2020", grad: GRADIENTS[2], desc: "Skincare dan kosmetik BPOM dengan bahan alami pilihan." },
];

export function storeOf(storeId) {
  return STORES.find((s) => s.id === storeId);
}
