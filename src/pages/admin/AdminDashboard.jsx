import React from "react";
import { TrendingUp, ClipboardList, Store, Users } from "lucide-react";
import { formatIDR } from "../../data/format";
import { gradForId } from "../../utils/visuals";
import Thumb from "../../components/ui/Thumb";
import { AdminHeading } from "./AdminTable";
import { C } from "../../theme";

function StatCard({ t, label, value, icon: Icon, tint }) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, flex: "1 1 200px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} color="#fff" />
        </div>
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 21, fontWeight: 800, color: t.text }}>{value}</div>
    </div>
  );
}

// `stats` datang dari GET /api/admin/stats: { totalRevenue, totalOrders, totalStores, totalUsers }
// `stores` dari GET /api/admin/stores, dipakai untuk daftar "penjualan tertinggi".
export default function AdminDashboard({ t, stats, stores }) {
  const top = [...stores].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 5);
  return (
    <div>
      <AdminHeading t={t} title="Dashboard" subtitle="Ringkasan performa marketplace Lapak.in" />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
        <StatCard t={t} label="Pendapatan (selesai)" value={formatIDR(stats?.totalRevenue ?? 0)} icon={TrendingUp} tint={C.primary} />
        <StatCard t={t} label="Total pesanan" value={stats?.totalOrders ?? 0} icon={ClipboardList} tint={C.secondary} />
        <StatCard t={t} label="Total toko" value={stats?.totalStores ?? stores.length} icon={Store} tint="#8B7FB8" />
        <StatCard t={t} label="Total pengguna" value={stats?.totalUsers ?? 0} icon={Users} tint={C.gold} />
      </div>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: t.text, marginBottom: 16 }}>Toko dengan penjualan tertinggi</div>
        {top.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${t.border}` : "none" }}>
            <span style={{ width: 20, fontSize: 12.5, color: t.textFaint, fontWeight: 700 }}>{i + 1}</span>
            <div style={{ width: 34, height: 34, flexShrink: 0 }}><Thumb grad={gradForId(s.id)} Icon={Store} size={15} radius={9} /></div>
            <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: t.text }}>{s.name}</div>
            <div style={{ fontSize: 13, color: t.textMuted }}>{(s.sold ?? 0).toLocaleString("id-ID")} terjual</div>
          </div>
        ))}
      </div>
    </div>
  );
}
