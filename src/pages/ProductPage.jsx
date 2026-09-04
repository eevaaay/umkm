import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart, MapPin, ChevronRight, Store as StoreIcon, BadgeCheck, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getProduct, getProducts } from "../api/products";
import { CATEGORIES } from "../data/categories";
import { formatIDR } from "../data/format";
import { priceAfterDiscount } from "../utils/pricing";
import { iconForCategory, gradForId } from "../utils/visuals";
import Thumb from "../components/ui/Thumb";
import { Badge, RatingStars } from "../components/ui/Badge";
import { PrimaryButton, GhostButton } from "../components/ui/Buttons";
import { BackLink, SpecRow, SectionHeader, qtyBtnStyle, LoadingState, ErrorState } from "../components/ui/Misc";
import ProductCard from "../components/ui/ProductCard";
import { C } from "../theme";

export default function ProductPage() {
  const { t, addToCart } = useApp();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    setQty(1);
    getProduct(id)
      .then((p) => {
        setProduct(p);
        return getProducts({ category: p.category }).then((list) =>
          setRelated(list.filter((x) => x.id !== p.id).slice(0, 4))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  if (loading) return <LoadingState t={t} label="Memuat produk..." />;
  if (error) return <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}><ErrorState t={t} message={error} onRetry={load} /></div>;
  if (!product) return null;

  const final = priceAfterDiscount(product);
  const Icon = iconForCategory(product.category);
  const grad = gradForId(product.id);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 20px 70px" }}>
      <BackLink t={t} onClick={() => navigate("/")} label="Kembali ke beranda" />
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginTop: 18 }}>
        <div style={{ flex: "1 1 340px", maxWidth: 420 }}>
          <div style={{ aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", border: `1px solid ${t.border}` }}>
            <Thumb grad={grad} Icon={Icon} size={90} radius={0} />
          </div>
        </div>

        <div style={{ flex: "1 1 380px" }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 25, fontWeight: 800, color: t.text, margin: "0 0 10px", lineHeight: 1.3 }}>
            {product.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, fontSize: 13.5, color: t.textMuted }}>
            <RatingStars rating={product.rating} size={14} />
            <span>·</span>
            <span>{(product.sold ?? 0).toLocaleString("id-ID")} terjual</span>
          </div>

          <div style={{ background: t.surfaceAlt, borderRadius: 16, padding: "16px 18px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: C.primaryDark }}>
                {formatIDR(final)}
              </span>
              {product.discount > 0 && (
                <>
                  <span style={{ fontSize: 15, color: t.textFaint, textDecoration: "line-through" }}>{formatIDR(product.price)}</span>
                  <Badge bg={C.dangerSoftLight} fg="#8A4038">-{product.discount}%</Badge>
                </>
              )}
            </div>
          </div>

          {product.store && (
            <div
              onClick={() => navigate(`/toko/${product.store.id}`)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `1px solid ${t.border}`, borderRadius: 14, cursor: "pointer", marginBottom: 22 }}
            >
              <div style={{ width: 42, height: 42, flexShrink: 0 }}>
                <Thumb grad={gradForId(product.store.id)} Icon={StoreIcon} size={18} radius={12} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: t.text }}>{product.store.name}</span>
                  {product.store.verified && <BadgeCheck size={14} color={C.secondary} />}
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={11} /> {product.store.location}
                </div>
              </div>
              <ChevronRight size={17} color={t.textFaint} />
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text, marginBottom: 10 }}>Jumlah</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${t.border}`, borderRadius: 10 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={qtyBtnStyle(t)}><Minus size={14} /></button>
                <span style={{ width: 42, textAlign: "center", fontWeight: 700, color: t.text }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock ?? 99, qty + 1))} style={qtyBtnStyle(t)}><Plus size={14} /></button>
              </div>
              <span style={{ fontSize: 12.5, color: t.textMuted }}>Stok: {product.stock}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <GhostButton t={t} full icon={ShoppingCart} onClick={() => addToCart(product, qty, final)}>
              Tambah ke keranjang
            </GhostButton>
            <PrimaryButton full onClick={() => { addToCart(product, qty, final); navigate("/checkout"); }}>
              Beli sekarang
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 50, display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div style={{ flex: "2 1 400px" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 12 }}>Deskripsi produk</h3>
          <p style={{ color: t.textMuted, lineHeight: 1.7, fontSize: 14 }}>{product.desc}</p>
        </div>
        <div style={{ flex: "1 1 260px" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 12 }}>Spesifikasi</h3>
          <SpecRow t={t} label="Kategori" value={CATEGORIES.find((c) => c.id === product.category)?.label} />
          <SpecRow t={t} label="Berat" value={`${product.weight} gram`} />
          <SpecRow t={t} label="Stok tersedia" value={product.stock} />
          <SpecRow t={t} label="Terjual" value={(product.sold ?? 0).toLocaleString("id-ID")} />
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 50 }}>
          <SectionHeader title="Produk serupa" t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {related.map((p) => <ProductCard key={p.id} product={p} t={t} onAdd={addToCart} />)}
          </div>
        </div>
      )}
    </div>
  );
}
