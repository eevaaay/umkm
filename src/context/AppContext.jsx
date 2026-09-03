import React, { createContext, useContext, useState, useEffect } from "react";
import { THEME } from "../theme";
import * as authApi from "../api/auth";
import { getToken, setToken } from "../api/client";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dark, setDark] = useState(false);
  const t = dark ? THEME.dark : THEME.light;

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2200);
  };

  // Saat pertama kali load, kalau ada token tersimpan, coba ambil data user
  // dari backend supaya sesi tetap login setelah refresh halaman.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthLoading(false);
      return;
    }
    authApi
      .fetchCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setToken(null))
      .finally(() => setAuthLoading(false));
  }, []);

  const addToCart = (product, qty = 1, priceOverride) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId: product.id, qty, product, unitPrice: priceOverride }];
    });
    toast("Ditambahkan ke keranjang");
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
    }
  };

  const removeItem = (productId) => setCart((prev) => prev.filter((i) => i.productId !== productId));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.unitPrice ?? item.product?.price ?? 0) * item.qty, 0);

  const login = async (email, password) => {
    const u = await authApi.login(email, password);
    setUser(u);
    return u;
  };

  const register = async (name, email, password) => {
    const u = await authApi.register(name, email, password);
    setUser(u);
    return u;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // token mungkin sudah kedaluwarsa di server, tetap bersihkan sisi client
    }
    setUser(null);
    toast("Berhasil keluar");
  };

  const value = {
    dark, setDark, t,
    cart, addToCart, updateQty, removeItem, clearCart, cartCount, cartTotal,
    user, authLoading, login, register, logout,
    toastMsg, toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam <AppProvider>");
  return ctx;
}
