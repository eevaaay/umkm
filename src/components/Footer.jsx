import React from "react";
import { ShoppingCart } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();
  return (
    <div style={{ borderTop: `1px solid ${t.border}`, background: t.surfaceAlt, padding: "36px 20px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: t.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingCart size={14} color={t.bg} />
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: t.text }}>Lapak.in</span>
          </div>
          <p style={{ color: t.textMuted, fontSize: 12.5, maxWidth: 260 }}>Tempat belanja langsung dari ribuan lapak lokal di seluruh Indonesia.</p>
        </div>
        <p style={{ color: t.textFaint, fontSize: 12 }}>© 2026 Lapak.in — prototipe demo, bukan situs asli.</p>
      </div>
    </div>
  );
}
