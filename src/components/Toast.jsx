import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { t, toastMsg } = useApp();
  if (!toastMsg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100,
      background: t.text, color: t.bg, padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 8, boxShadow: t.shadowLg,
    }}>
      <CheckCircle2 size={16} /> {toastMsg}
    </div>
  );
}
