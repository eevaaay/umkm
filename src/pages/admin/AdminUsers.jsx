import React from "react";
import { Badge } from "../../components/ui/Badge";
import AdminTable, { AdminHeading } from "./AdminTable";
import { C } from "../../theme";

export default function AdminUsers({ t, users }) {
  return (
    <div>
      <AdminHeading t={t} title="Kelola pengguna" subtitle={`${users.length} akun terdaftar`} />
      <AdminTable
        t={t}
        columns={["Nama", "Email", "Peran", "Bergabung"]}
        rows={users.map((u) => [
          <span style={{ fontWeight: 600 }}>{u.name}</span>,
          u.email,
          <Badge bg={u.role === "store_owner" ? C.secondarySoftLight : t.surfaceAlt} fg={u.role === "store_owner" ? "#2F5C4E" : t.textMuted}>{u.role}</Badge>,
          u.joined,
        ])}
      />
    </div>
  );
}
