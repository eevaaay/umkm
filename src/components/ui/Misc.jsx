import React from "react";
import { ArrowLeft, ChevronRight, Package, LoaderCircle, AlertTriangle } from "lucide-react";
import { C } from "../../theme";

export function LoadingState({ t, label = "Memuat data..." }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "60px 20px", color: t.textMuted }}>
      <LoaderCircle size={22} className="lp-spin" />
      <span style={{ fontSize: 13.5 }}>{label}</span>
    </div>
  );
}

export function ErrorState({ t, message, onRetry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "60px 20px", textAlign: "center" }}>
      <AlertTriangle size={22} color={C.danger} />
      <span style={{ fontSize: 13.5, color: t.textMuted, maxWidth: 360 }}>
        {message || "Gagal memuat data dari server. Pastikan backend-mu aktif dan VITE_API_URL sudah benar."}
      </span>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 10, padding: "8px 16px", color: t.text, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
          Coba lagi
        </button>
      )}
    </div>
  );
}

export function EmptyState({ t, title, desc, icon: Icon = Package, action }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: t.textMuted }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <Icon size={26} color={t.textFaint} />
      </div>
      <h3 style={{ color: t.text, fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 13.5, maxWidth: 320, margin: "0 auto" }}>{desc}</p>
      {action}
    </div>
  );
}

export function BackLink({ t, onClick, label }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: t.textMuted, fontSize: 13.5, fontWeight: 600, cursor: "pointer", padding: 0 }}>
      <ArrowLeft size={16} /> {label}
    </button>
  );
}

export function SpecRow({ t, label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${t.border}`, fontSize: 13.5 }}>
      <span style={{ color: t.textMuted }}>{label}</span>
      <span style={{ color: t.text, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export function RowKV({ t, k, v, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: bold ? 15 : 13.5 }}>
      <span style={{ color: bold ? t.text : t.textMuted, fontWeight: bold ? 700 : 400 }}>{k}</span>
      <span style={{ color: t.text, fontWeight: bold ? 800 : 600 }}>{v}</span>
    </div>
  );
}

export function SectionHeader({ title, subtitle, t, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
      <div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>
          {title}
        </h2>
        {subtitle && <p style={{ color: t.textMuted, fontSize: 13.5, margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction} style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
          {action} <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

export function CategoryChip({ label, active, onClick, t, Icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
        padding: "10px 16px", borderRadius: 30,
        border: `1.5px solid ${active ? C.primary : t.border}`,
        background: active ? C.primarySoftLight : t.surface,
        color: active ? C.primaryDark : t.text,
        fontWeight: 600, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap",
      }}
    >
      <Icon size={15} /> {label}
    </button>
  );
}

export function qtyBtnStyle(t) {
  return { width: 34, height: 34, background: "none", border: "none", color: t.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
}
