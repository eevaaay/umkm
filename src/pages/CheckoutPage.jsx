import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Building2, Wallet, Truck, CreditCard, ClipboardList, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { createOrder } from "../api/orders";
import { formatIDR } from "../data/format";
import { PrimaryButton } from "../components/ui/Buttons";
import { BackLink, EmptyState, RowKV } from "../components/ui/Misc";
import { C } from "../theme";

export default function CheckoutPage() {
  const { t, user, cart, cartTotal, clearCart, toast } = useApp();
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState("transfer");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const shipping = cart.length > 0 ? 15000 : 0;

  if (cart.length === 0 && !placing) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 20px" }}>
        <EmptyState t={t} icon={ClipboardList} title="Tidak ada pesanan" desc="Tambahkan produk ke keranjang sebelum checkout." action={<div style={{ marginTop: 18 }}><PrimaryButton onClick={() => navigate("/")}>Ke halaman utama</PrimaryButton></div>} />
      </div>
    );
  }

  const methods = [
    { id: "transfer", label: "Transfer Bank", icon: Building2, desc: "BCA, BNI, Mandiri, BRI" },
    { id: "ewallet", label: "E-Wallet", icon: Wallet, desc: "GoPay, OVO, DANA, ShopeePay" },
    { id: "cod", label: "Bayar di Tempat (COD)", icon: Truck, desc: "Bayar saat barang tiba" },
    { id: "kartu", label: "Kartu Kredit/Debit", icon: CreditCard, desc: "Visa, Mastercard" },
  ];

  const handlePlace = async () => {
    if (!user) {
      toast("Masuk dulu sebelum checkout ya");
      navigate("/masuk");
      return;
    }
    if (!address.trim()) {
      setError("Isi alamat pengiriman terlebih dahulu.");
      return;
    }
    setError(null);
    setPlacing(true);
    try {
      // Backend yang membuat baris `orders` + banyak `order_details` (per item)
      // + `payments`, lalu mengembalikan order yang baru dibuat.
      await createOrder({
        address,
        paymentMethod: payMethod,
        items: cart.map((i) => ({ product_id: i.productId, qty: i.qty })),
      });
      clearCart();
      toast("Pesanan berhasil dibuat!");
      navigate("/checkout/sukses");
    } catch (err) {
      setError(err.message || "Gagal membuat pesanan. Coba lagi.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 90px" }}>
      <BackLink t={t} onClick={() => navigate("/keranjang")} label="Kembali ke keranjang" />
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: t.text, margin: "18px 0 24px" }}>
        Checkout
      </h2>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: t.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 7 }}>
          <MapPin size={16} /> Alamat pengiriman
        </div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={2}
          placeholder="Nama jalan, kota, kode pos..."
          style={{ width: "100%", padding: 12, borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.surfaceSunken, color: t.text, fontSize: 13.5, fontFamily: "Inter, sans-serif", resize: "vertical" }}
        />
      </div>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: t.text, marginBottom: 14 }}>Metode pembayaran</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {methods.map((m) => (
            <div
              key={m.id}
              onClick={() => setPayMethod(m.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                border: `1.5px solid ${payMethod === m.id ? C.primary : t.border}`,
                background: payMethod === m.id ? t.surfaceAlt : "transparent",
              }}
            >
              <m.icon size={20} color={payMethod === m.id ? C.primary : t.textMuted} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text }}>{m.label}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: t.text, marginBottom: 14 }}>Ringkasan pesanan</div>
        <RowKV t={t} k="Subtotal produk" v={formatIDR(cartTotal)} />
        <RowKV t={t} k="Ongkos kirim" v={formatIDR(shipping)} />
        <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 10, paddingTop: 10 }}>
          <RowKV t={t} k="Total pembayaran" v={formatIDR(cartTotal + shipping)} bold />
        </div>
      </div>

      {error && <div style={{ color: C.danger, fontSize: 13, marginBottom: 14 }}>{error}</div>}

      <PrimaryButton full disabled={placing} onClick={handlePlace} icon={CheckCircle2}>
        {placing ? "Memproses pesanan..." : `Buat pesanan · ${formatIDR(cartTotal + shipping)}`}
      </PrimaryButton>
    </div>
  );
}
