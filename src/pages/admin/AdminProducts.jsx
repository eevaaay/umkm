import React from "react";
import { formatIDR } from "../../data/format";
import { priceAfterDiscount } from "../../utils/pricing";
import { iconForCategory, gradForId } from "../../utils/visuals";
import Thumb from "../../components/ui/Thumb";
import AdminTable, { AdminHeading } from "./AdminTable";

export default function AdminProducts({ t, products }) {
  return (
    <div>
      <AdminHeading t={t} title="Kelola produk" subtitle={`${products.length} produk aktif di seluruh toko`} />
      <AdminTable
        t={t}
        columns={["Produk", "Toko", "Harga", "Stok", "Terjual"]}
        rows={products.map((p) => [
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 30, height: 30 }}><Thumb grad={gradForId(p.id)} Icon={iconForCategory(p.category)} size={13} radius={8} /></div><span style={{ fontWeight: 600, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span></div>,
          p.store?.name ?? "-",
          formatIDR(priceAfterDiscount(p)),
          p.stock,
          (p.sold ?? 0).toLocaleString("id-ID"),
        ])}
      />
    </div>
  );
}
