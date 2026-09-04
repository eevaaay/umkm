import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "./Toast";
import { useApp } from "../context/AppContext";

export default function Layout() {
  const { t } = useApp();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div style={{ background: t.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif", color: t.text }}>
      <Header />
      <Outlet />
      {!isAdmin && <Footer />}
      <Toast />
    </div>
  );
}
