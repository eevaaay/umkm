import React from "react";
import { C } from "../../theme";

export function PrimaryButton({ children, onClick, full, style, disabled, icon: Icon, size = "md" }) {
  const pad = size === "sm" ? "9px 16px" : "13px 22px";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#C9C2B4" : C.primary,
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: pad,
        fontWeight: 700,
        fontSize: size === "sm" ? 13.5 : 15,
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "Inter, sans-serif",
        transition: "transform .12s ease, background .15s ease",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, full, style, icon: Icon, t }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: t.text,
        border: `1.5px solid ${t.borderStrong}`,
        borderRadius: 12,
        padding: "12px 20px",
        fontWeight: 700,
        fontSize: 14.5,
        cursor: "pointer",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "Inter, sans-serif",
        ...style,
      }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
