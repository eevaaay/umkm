import React from "react";
import { Star } from "lucide-react";
import { C } from "../../theme";

export function Badge({ children, bg, fg, style }) {
  return (
    <span
      style={{
        background: bg,
        color: fg,
        fontSize: 11.5,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        letterSpacing: 0.1,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function RatingStars({ rating, size = 12 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={size} color={C.gold} fill={C.gold} />
      <span style={{ fontWeight: 700, fontSize: size + 1 }}>{rating}</span>
    </span>
  );
}
