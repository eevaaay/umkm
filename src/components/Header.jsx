import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react";
import { PrimaryButton } from "./ui/Buttons";
import { useApp } from "../context/AppContext";
import { C } from "../theme";

export default function Header() {
  const navigate = useNavigate();
  const { t, dark, setDark, cartCount, user, logout } = useApp();
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    if (query.trim()) navigate(`/cari?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, background: t.navbar, borderBottom: `1px solid ${t.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: 18 }}>
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 10, background: t.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingCart size={18} color={t.bg} />
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 21, color: t.text, letterSpacing: -0.5 }}>
            Lapak<span style={{ color: C.primary }}>.in</span>
          </span>
        </div>

        <div style={{ flex: 1, position: "relative", maxWidth: 560 }}>
          <Search size={17} style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: t.textFaint }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="Cari produk, toko, atau kategori..."
            style={{
              width: "100%",
              padding: "11px 16px 11px 42px",
              borderRadius: 12,
              border: `1.5px solid ${t.border}`,
              background: t.surfaceSunken,
              color: t.text,
              fontSize: 14,
              outline: "none",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Ganti tema"
            style={{
              width: 40, height: 40, borderRadius: 10, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: t.text,
            }}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => navigate("/keranjang")}
            aria-label="Keranjang"
            style={{
              width: 40, height: 40, borderRadius: 10, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: t.text, position: "relative",
            }}
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6, background: C.primary, color: "#fff",
                fontSize: 10.5, fontWeight: 700, borderRadius: 20, minWidth: 18, height: 18,
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, background: t.surfaceAlt,
                    border: `1px solid ${t.border}`, borderRadius: 10, padding: "9px 14px",
                    color: t.text, cursor: "pointer", fontSize: 13.5, fontWeight: 600,
                  }}
                >
                  <LayoutDashboard size={15} /> <span className="lp-hide-sm">Admin</span>
                </button>
              )}
              <button
                onClick={() => { logout(); navigate("/"); }}
                title="Keluar"
                style={{
                  width: 40, height: 40, borderRadius: 10, border: `1px solid ${t.border}`,
                  background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: t.text,
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <PrimaryButton size="sm" onClick={() => navigate("/masuk")}>
              Masuk
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
