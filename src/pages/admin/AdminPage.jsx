import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LayoutDashboard, Store, Package, ClipboardList, Users, ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";
import * as adminApi from "../../api/admin";
import { C } from "../../theme";
import { LoadingState, ErrorState } from "../../components/ui/Misc";
import AdminDashboard from "./AdminDashboard";
import AdminStores from "./AdminStores";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";

export default function AdminPage() {
  const { t, user, authLoading } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");

  const [stats, setStats] = useState(null);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      adminApi.getAdminStats(),
      adminApi.getAdminStores(),
      adminApi.getAdminProducts(),
      adminApi.getAdminOrders(),
      adminApi.getAdminUsers(),
    ])
      .then(([s, st, p, o, u]) => {
        setStats(s);
        setStores(st);
        setProducts(p);
        setOrders(o);
        setUsers(u);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.role === "admin") load();
  }, [user]);

  if (authLoading) return <LoadingState t={t} label="Memeriksa sesi..." />;
  if (!user || user.role !== "admin") return <Navigate to="/masuk" replace />;

  const toggleVerify = async (id, current) => {
    const next = !current;
    setStores((prev) => prev.map((s) => (s.id === id ? { ...s, verified: next } : s)));
    try {
      await adminApi.setStoreVerified(id, next);
    } catch {
      setStores((prev) => prev.map((s) => (s.id === id ? { ...s, verified: current } : s))); // rollback kalau gagal
    }
  };

  const changeOrderStatus = async (id, status) => {
    const prevStatus = orders.find((o) => o.id === id)?.status;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await adminApi.setOrderStatus(id, status);
    } catch {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: prevStatus } : o))); // rollback kalau gagal
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "stores", label: "Kelola Toko", icon: Store },
    { id: "products", label: "Kelola Produk", icon: Package },
    { id: "orders", label: "Kelola Pesanan", icon: ClipboardList },
    { id: "users", label: "Kelola Pengguna", icon: Users },
  ];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 90px", display: "flex", gap: 26 }}>
      <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }} className="lp-admin-nav">
        <div style={{ fontSize: 11.5, fontWeight: 800, color: t.textFaint, letterSpacing: 0.5, marginBottom: 10, paddingLeft: 4 }}>
          PANEL ADMIN
        </div>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 11,
              border: "none", cursor: "pointer", textAlign: "left", fontSize: 13.8, fontWeight: 600,
              background: tab === n.id ? C.primarySoftLight : "transparent",
              color: tab === n.id ? C.primaryDark : t.text,
            }}
          >
            <n.icon size={16} /> {n.label}
          </button>
        ))}
        <div style={{ height: 1, background: t.border, margin: "10px 0" }} />
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 11, border: "none", cursor: "pointer", textAlign: "left", fontSize: 13.8, fontWeight: 600, background: "transparent", color: t.textMuted }}>
          <ArrowLeft size={16} /> Kembali ke toko
        </button>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {loading && <LoadingState t={t} label="Memuat data admin..." />}
        {!loading && error && <ErrorState t={t} message={error} onRetry={load} />}
        {!loading && !error && (
          <>
            {tab === "dashboard" && <AdminDashboard t={t} stats={stats} stores={stores} />}
            {tab === "stores" && <AdminStores t={t} stores={stores} onToggleVerify={toggleVerify} />}
            {tab === "products" && <AdminProducts t={t} products={products} />}
            {tab === "orders" && <AdminOrders t={t} orders={orders} onChangeStatus={changeOrderStatus} />}
            {tab === "users" && <AdminUsers t={t} users={users} />}
          </>
        )}
      </div>
    </div>
  );
}
