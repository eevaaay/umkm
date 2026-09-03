import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Shirt, UtensilsCrossed, Sofa, Flame, Clock, LayoutGrid } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CATEGORIES } from "../data/categories";
import { getProducts } from "../api/products";
import { getStores } from "../api/stores";
import ProductCard from "../components/ui/ProductCard";
import StoreCard from "../components/ui/StoreCard";
import { SectionHeader, CategoryChip, LoadingState, ErrorState } from "../components/ui/Misc";
import { Badge } from "../components/ui/Badge";
import { PrimaryButton, GhostButton } from "../components/ui/Buttons";
import { C } from "../theme";

function useCountdown(hours) {
  const [secs, setSecs] = useState(hours * 3600);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : hours * 3600)), 1000);
    return () => clearInterval(id);
  }, [hours]);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function HomePage() {
  const { t, addToCart } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("semua");
  const timer = useCountdown(3);

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      getProducts(activeCategory !== "semua" ? { category: activeCategory } : {}),
      getStores(),
    ])
      .then(([productData, storeData]) => {
        setProducts(productData);
        setStores(storeData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [activeCategory]);

  const flashSale = products.filter((p) => p.discount >= 15);

  return (
    <div>
      <div style={{ background: t.surfaceAlt, padding: "0 20px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "52px 0 56px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 380px" }}>
            <Badge bg={t.surface} fg={t.textMuted} style={{ border: `1px solid ${t.border}` }}>
              Ribuan lapak lokal, satu tempat belanja
            </Badge>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, lineHeight: 1.15, fontWeight: 800, color: t.text, margin: "16px 0 14px", maxWidth: 480 }}>
              Belanja langsung dari pemilik lapak di seluruh Indonesia
            </h1>
            <p style={{ color: t.textMuted, fontSize: 15.5, maxWidth: 440, marginBottom: 26, lineHeight: 1.6 }}>
              Dari kopi Gayo sampai batik Solo — temukan produk asli dari toko kecil dan pengrajin lokal, dengan harga langsung dari penjualnya.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <PrimaryButton onClick={() => document.getElementById("kategori-section")?.scrollIntoView({ behavior: "smooth" })}>
                Mulai belanja
              </PrimaryButton>
              <GhostButton t={t} onClick={() => navigate("/toko")}>
                Jelajahi toko
              </GhostButton>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", gap: 14 }}>
            {[Smartphone, Shirt, UtensilsCrossed, Sofa].map((Ic, i) => (
              <div key={i} style={{
                width: 84, height: 84, borderRadius: 20, background: t.surface, border: `1px solid ${t.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: i % 2 === 0 ? 0 : 34,
              }}>
                <Ic size={34} color={C.primary} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 20px 70px" }}>
        <div id="kategori-section" style={{ marginBottom: 44 }}>
          <SectionHeader title="Kategori pilihan" t={t} />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 }}>
            <CategoryChip label="Semua" active={activeCategory === "semua"} onClick={() => setActiveCategory("semua")} t={t} Icon={LayoutGrid} />
            {CATEGORIES.map((c) => (
              <CategoryChip key={c.id} label={c.label} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)} t={t} Icon={c.icon} />
            ))}
          </div>
        </div>

        {loading && <LoadingState t={t} label="Memuat produk dan toko..." />}
        {!loading && error && <ErrorState t={t} message={error} onRetry={load} />}

        {!loading && !error && (
          <>
            {flashSale.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Flame size={22} color={C.danger} />
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>
                      Flash Sale
                    </h2>
                    <Badge bg={C.dangerSoftLight} fg="#8A4038"><Clock size={11} /> Berakhir {timer}</Badge>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
                  {flashSale.map((p) => <ProductCard key={p.id} product={p} t={t} onAdd={addToCart} />)}
                </div>
              </div>
            )}

            {stores.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <SectionHeader title="Toko pilihan" subtitle="Lapak-lapak dengan rating dan penjualan terbaik" t={t} action="Lihat semua toko" onAction={() => navigate("/toko")} />
                <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 6 }}>
                  {stores.map((s) => <StoreCard key={s.id} store={s} t={t} />)}
                </div>
              </div>
            )}

            <div>
              <SectionHeader
                title={activeCategory === "semua" ? "Semua produk" : CATEGORIES.find((c) => c.id === activeCategory)?.label}
                subtitle={`${products.length} produk ditemukan`}
                t={t}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
                {products.map((p) => <ProductCard key={p.id} product={p} t={t} onAdd={addToCart} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
