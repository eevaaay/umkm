import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PrimaryButton } from "../components/ui/Buttons";
import { C } from "../theme";

export default function OrderSuccessPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "90px 20px", textAlign: "center" }}>
      <div style={{ width: 76, height: 76, borderRadius: "50%", background: C.secondarySoftLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
        <CheckCircle2 size={38} color={C.secondary} />
      </div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 23, fontWeight: 800, color: t.text, marginBottom: 10 }}>
        Pesanan berhasil dibuat!
      </h2>
      <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
        Terima kasih sudah belanja di Lapak.in. Penjual akan segera memproses pesananmu. Kamu bisa memantau status pesanan kapan saja.
      </p>
      <PrimaryButton full onClick={() => navigate("/")}>Kembali ke beranda</PrimaryButton>
    </div>
  );
}
