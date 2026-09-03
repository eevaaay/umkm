import React from "react";
import { ORDER_STATUSES, STATUS_COLOR } from "../../data/orders";
import { formatIDR } from "../../data/format";
import AdminTable, { AdminHeading } from "./AdminTable";

export default function AdminOrders({ t, orders, onChangeStatus }) {
  return (
    <div>
      <AdminHeading t={t} title="Kelola pesanan" subtitle={`${orders.length} transaksi tercatat`} />
      <AdminTable
        t={t}
        columns={["ID Pesanan", "Pembeli", "Toko", "Total", "Tanggal", "Status"]}
        rows={orders.map((o) => [
          <span style={{ fontWeight: 700 }}>{o.id}</span>,
          o.buyer,
          o.storeName ?? o.store?.name ?? "-",
          formatIDR(o.total),
          o.date,
          <select
            value={o.status}
            onChange={(e) => onChangeStatus(o.id, e.target.value)}
            style={{
              padding: "6px 10px", borderRadius: 8, border: `1px solid ${t.border}`,
              background: STATUS_COLOR[o.status]?.bg, color: STATUS_COLOR[o.status]?.fg,
              fontWeight: 700, fontSize: 12.5, cursor: "pointer",
            }}
          >
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>,
        ])}
      />
    </div>
  );
}
