import React from "react";

export default function Thumb({ grad, Icon, size = 22, radius = 16, style }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <Icon size={size} color="#fff" strokeWidth={1.7} />
    </div>
  );
}
