import React from "react";

export function miniBtnStyle(t) {
  return { padding: "6px 12px", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.text, fontSize: 12, fontWeight: 700, cursor: "pointer" };
}

export function AdminHeading({ t, title, subtitle }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ color: t.textMuted, fontSize: 13.5, margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

export default function AdminTable({ t, columns, rows }) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} style={{ textAlign: "left", padding: "13px 16px", color: t.textMuted, fontWeight: 700, fontSize: 12, borderBottom: `1px solid ${t.border}`, whiteSpace: "nowrap" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "13px 16px", borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : "none", color: t.text, whiteSpace: "nowrap" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
