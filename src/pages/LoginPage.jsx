import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PrimaryButton } from "../components/ui/Buttons";
import { BackLink } from "../components/ui/Misc";
import { C } from "../theme";

function FormField({ t, label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12.5, fontWeight: 700, color: t.text, marginBottom: 6, display: "block" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.surfaceSunken, color: t.text, fontSize: 14, fontFamily: "Inter, sans-serif" }}
      />
    </div>
  );
}

export default function LoginPage() {
  const { t, login, register, toast } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Isi email dan kata sandi terlebih dahulu.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Isi nama lengkap terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const u = mode === "login" ? await login(email.trim(), password) : await register(name.trim(), email.trim(), password);
      toast(u.role === "admin" ? "Masuk sebagai admin" : "Berhasil masuk");
      navigate(u.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message || "Gagal masuk. Periksa email dan kata sandi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "50px 20px 90px" }}>
      <BackLink t={t} onClick={() => navigate("/")} label="Kembali ke beranda" />
      <div style={{ marginTop: 24, marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 25, fontWeight: 800, color: t.text, marginBottom: 8 }}>
          {mode === "login" ? "Masuk ke Lapak.in" : "Buat akun baru"}
        </h2>
        <p style={{ color: t.textMuted, fontSize: 13.5 }}>
          {mode === "login" ? "Masuk untuk berbelanja dan memantau pesananmu." : "Daftar untuk mulai belanja di ribuan lapak lokal."}
        </p>
      </div>

      {mode === "register" && (
        <FormField t={t} label="Nama lengkap" value={name} onChange={setName} placeholder="Nama kamu" />
      )}
      <FormField t={t} label="Email" value={email} onChange={setEmail} placeholder="nama@email.com" type="email" />
      <div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: t.text, marginBottom: 6, display: "block" }}>Kata sandi</label>
        <div style={{ position: "relative", marginBottom: 6 }}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            style={{ width: "100%", padding: "12px 42px 12px 14px", borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.surfaceSunken, color: t.text, fontSize: 14, fontFamily: "Inter, sans-serif" }}
          />
          <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: t.textFaint, cursor: "pointer" }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && <div style={{ color: C.danger, fontSize: 12.5, marginBottom: 10 }}>{error}</div>}

      <PrimaryButton full disabled={submitting} onClick={submit} style={{ marginTop: 10 }}>
        {submitting ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
      </PrimaryButton>

      <p style={{ textAlign: "center", fontSize: 13, color: t.textMuted, marginTop: 18 }}>
        {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
        <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
          {mode === "login" ? "Daftar sekarang" : "Masuk di sini"}
        </button>
      </p>
      <p style={{ textAlign: "center", fontSize: 11.5, color: t.textFaint, marginTop: 20 }}>
        Akun dengan kolom <code>role = "admin"</code> di database akan otomatis diarahkan ke panel admin setelah masuk.
      </p>
    </div>
  );
}
