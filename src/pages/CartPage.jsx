import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Store, Trash2, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatIDR } from "../data/format";
import { gradForId, iconForCategory } from "../utils/visuals";
import Thumb from "../components/ui/Thumb";
import { PrimaryButton } from "../components/ui/Buttons";
import { BackLink, EmptyState, qtyBtnStyle } from "../components/ui/Misc";

export default function CartPage() {
  const { t, cart, updateQty, removeItem, cartTotal } = useApp();
  const navigate = useNavigate();

  // Setiap item keranjang sudah membawa objek `product` lengkap (ditempel saat
  // addToCart dipanggil dari halaman produk/beranda), jadi di sini tidak perlu
  // lookup ke array statis lagi — cocok dipakai begitu produk datang dari API.
  const grouped = useMemo(() => {
    const byStore = {};
    cart.forEach((item) => {
      const storeId = item.product?.store?.id ?? item.product?.storeId ?? "lainnya";
      const storeName = item.product?.store?.name ?? "Toko";
      if (!byStore[storeId]) byStore[storeId] = { storeId, storeName, items: [] };
      byStore[storeId].items.push(item);
    });
    return Object.values(byStore);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 20px" }}>
        <EmptyState
          t={t}
          icon={ShoppingCart}
          title="Keranjang kamu masih kosong"
          desc="Yuk mulai jelajahi produk-produk dari lapak lokal favoritmu."
          action={<div style={{ marginTop: 18 }}><PrimaryButton onClick={() => navigate("/")}>Mulai belanja</PrimaryButton></div>}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 90px" }}>
      <BackLink t={t} onClick={() => navigate("/")} label="Lanjut belanja" />
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: t.text, margin: "18px 0 24px" }}>
        Keranjang belanja
      </h2>

      {grouped.map((group) => (
        <div key={group.storeId} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, cursor: group.storeId !== "lainnya" ? "pointer" : "default" }}
            onClick={() => group.storeId !== "lainnya" && navigate(`/toko/${group.storeId}`)}
          >
            <Store size={16} color={t.textMuted} />
            <span style={{ fontWeight: 700, fontSize: 14, color: t.text }}>{group.storeName}</span>
          </div>
          {group.items.map((item) => (
            <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: `1px solid ${t.border}` }}>
              <div style={{ width: 56, height: 56, flexShrink: 0 }}>
                <Thumb grad={gradForId(item.productId)} Icon={iconForCategory(item.product?.category)} size={22} radius={10} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: t.text, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.product?.name}
                </div>
                <div style={{ fontWeight: 800, fontSize: 14, color: t.text }}>{formatIDR(item.unitPrice ?? item.product?.price ?? 0)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${t.border}`, borderRadius: 10 }}>
                <button onClick={() => updateQty(item.productId, item.qty - 1)} style={qtyBtnStyle(t)}><Minus size={13} /></button>
                <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: 13, color: t.text }}>{item.qty}</span>
                <button onClick={() => updateQty(item.productId, item.qty + 1)} style={qtyBtnStyle(t)}><Plus size={13} /></button>
              </div>
              <button onClick={() => removeItem(item.productId)} style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", padding: 6 }}>
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      ))}

      <div style={{ position: "sticky", bottom: 16, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20, boxShadow: t.shadowLg, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 12.5, color: t.textMuted }}>Total belanja</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text }}>{formatIDR(cartTotal)}</div>
        </div>
        <PrimaryButton onClick={() => navigate("/checkout")}>Checkout sekarang</PrimaryButton>
      </div>
    </div>
  );
}
