import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getStores } from "../api/stores";
import StoreCard from "../components/ui/StoreCard";
import { BackLink, LoadingState, ErrorState } from "../components/ui/Misc";

export default function StoresListPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getStores()
      .then(setStores)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 20px 70px" }}>
      <BackLink t={t} onClick={() => navigate("/")} label="Kembali ke beranda" />
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: t.text, margin: "18px 0 24px" }}>
        Semua toko di Lapak.in
      </h2>
      {loading && <LoadingState t={t} />}
      {!loading && error && <ErrorState t={t} message={error} onRetry={load} />}
      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
          {stores.map((s) => <StoreCard key={s.id} store={s} t={t} />)}
        </div>
      )}
    </div>
  );
}
