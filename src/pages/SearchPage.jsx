import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getProducts } from "../api/products";
import { getStores } from "../api/stores";
import ProductCard from "../components/ui/ProductCard";
import StoreCard from "../components/ui/StoreCard";
import { EmptyState, LoadingState, ErrorState } from "../components/ui/Misc";

export default function SearchPage() {
  const { t, addToCart } = useApp();
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([getProducts({ q: query }), getStores()])
      .then(([productData, storeData]) => {
        setProducts(productData);
        const q = query.trim().toLowerCase();
        setStores(storeData.filter((s) => s.name.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [query]);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 20px 70px" }}>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text }}>
        Hasil untuk "{query}"
      </h2>

      {loading && <LoadingState t={t} />}
      {!loading && error && <ErrorState t={t} message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <p style={{ color: t.textMuted, marginBottom: 26 }}>{products.length} produk, {stores.length} toko ditemukan</p>

          {stores.length > 0 && (
            <div style={{ marginBottom: 34 }}>
              <h3 style={{ color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Toko</h3>
              <div style={{ display: "flex", gap: 16, overflowX: "auto" }}>
                {stores.map((s) => <StoreCard key={s.id} store={s} t={t} />)}
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <EmptyState t={t} title="Produk tidak ditemukan" desc="Coba kata kunci lain atau jelajahi kategori yang tersedia." />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {products.map((p) => <ProductCard key={p.id} product={p} t={t} onAdd={addToCart} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
