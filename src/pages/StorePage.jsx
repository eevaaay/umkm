import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store, MapPin, Star, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getStore, getStoreProducts } from "../api/stores";
import Thumb from "../components/ui/Thumb";
import { Badge } from "../components/ui/Badge";
import { BackLink, SpecRow, LoadingState, ErrorState } from "../components/ui/Misc";
import ProductCard from "../components/ui/ProductCard";
import { gradForId } from "../utils/visuals";

export default function StorePage() {
  const { t, addToCart } = useApp();
  const navigate = useNavigate();
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("produk");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([getStore(id), getStoreProducts(id)])
      .then(([storeData, productData]) => {
        setStore(storeData);
        setProducts(productData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  if (loading) return <LoadingState t={t} label="Memuat toko..." />;
  if (error) return <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}><ErrorState t={t} message={error} onRetry={load} /></div>;
  if (!store) return null;

  return (
    <div>
      <div style={{ background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, padding: "40px 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 84, height: 84, flexShrink: 0 }}>
            <Thumb grad={gradForId(store.id)} Icon={Store} size={38} radius={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 25, fontWeight: 800, color: t.text, margin: 0 }}>{store.name}</h1>
              {store.verified && (
                <Badge bg={t.surface} fg={t.textMuted} style={{ border: `1px solid ${t.border}` }}><ShieldCheck size={12} /> Toko Terverifikasi</Badge>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: t.textMuted, fontSize: 13, marginTop: 8, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} /> {store.location}</span>
              <span>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={13} /> {store.rating}</span>
              <span>·</span>
              <span>{(store.followers ?? 0).toLocaleString("id-ID")} pengikut</span>
              <span>·</span>
              <span>Bergabung {store.joined}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 70px" }}>
        <BackLink t={t} onClick={() => navigate("/")} label="Kembali ke beranda" />

        <div style={{ display: "flex", gap: 8, margin: "22px 0 24px", borderBottom: `1px solid ${t.border}` }}>
          {[["produk", "Semua Produk"], ["tentang", "Tentang Toko"]].map(([id2, label]) => (
            <button
              key={id2}
              onClick={() => setTab(id2)}
              style={{
                background: "none", border: "none", padding: "10px 4px", marginRight: 24, cursor: "pointer",
                fontWeight: 700, fontSize: 14, color: tab === id2 ? t.text : t.textMuted,
                borderBottom: tab === id2 ? `2.5px solid ${t.text}` : "2.5px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "produk" ? (
          products.length === 0 ? (
            <p style={{ color: t.textMuted, fontSize: 13.5 }}>Toko ini belum punya produk.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {products.map((p) => <ProductCard key={p.id} product={p} t={t} onAdd={addToCart} />)}
            </div>
          )
        ) : (
          <div style={{ maxWidth: 640 }}>
            <p style={{ color: t.textMuted, lineHeight: 1.7, fontSize: 14.5 }}>{store.desc}</p>
            <div style={{ marginTop: 20 }}>
              <SpecRow t={t} label="Kategori toko" value={store.category} />
              <SpecRow t={t} label="Lokasi" value={store.location} />
              <SpecRow t={t} label="Bergabung sejak" value={store.joined} />
              <SpecRow t={t} label="Total produk terjual" value={(store.sold ?? 0).toLocaleString("id-ID")} />
              <SpecRow t={t} label="Status" value={store.verified ? "Terverifikasi" : "Belum terverifikasi"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
