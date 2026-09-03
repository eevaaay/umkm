import React from "react";
import { Store, ShieldCheck } from "lucide-react";
import { gradForId } from "../../utils/visuals";
import Thumb from "../../components/ui/Thumb";
import { RatingStars, Badge } from "../../components/ui/Badge";
import AdminTable, { AdminHeading, miniBtnStyle } from "./AdminTable";
import { C } from "../../theme";

export default function AdminStores({ t, stores, onToggleVerify }) {
  return (
    <div>
      <AdminHeading t={t} title="Kelola toko" subtitle={`${stores.length} toko terdaftar di marketplace`} />
      <AdminTable
        t={t}
        columns={["Toko", "Kategori", "Lokasi", "Rating", "Status", "Aksi"]}
        rows={stores.map((s) => [
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 30, height: 30 }}><Thumb grad={gradForId(s.id)} Icon={Store} size={13} radius={8} /></div><span style={{ fontWeight: 600 }}>{s.name}</span></div>,
          s.category,
          s.location,
          <RatingStars rating={s.rating} />,
          s.verified ? <Badge bg={C.secondarySoftLight} fg="#2F5C4E"><ShieldCheck size={11} /> Terverifikasi</Badge> : <Badge bg={t.surfaceAlt} fg={t.textMuted}>Belum verifikasi</Badge>,
          <button onClick={() => onToggleVerify(s.id, s.verified)} style={miniBtnStyle(t)}>{s.verified ? "Cabut verifikasi" : "Verifikasi"}</button>,
        ])}
      />
    </div>
  );
}
