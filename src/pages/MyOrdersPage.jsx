import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Package, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getMyOrders } from "../api/orders";
import { formatIDR } from "../data/format";
import { PrimaryButton } from "../components/ui/Buttons";
import { EmptyState } from "../components/ui/Misc";
import { C } from "../theme";

export default function MyOrdersPage() {
  const { t, user, authLoading } = useApp();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Gagal memuat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (authLoading) return;

  if (!user) {
    navigate("/masuk");
    return;
  }

  loadOrders();
}, [user, authLoading]);

if (authLoading) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ color: t.textMuted, textAlign: "center" }}>
        Memeriksa sesi...
      </div>
    </div>
  );
}

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ color: t.textMuted, textAlign: "center" }}>
          Memuat pesanan...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 90px" }}>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 24,
          fontWeight: 800,
          color: t.text,
          marginBottom: 8,
        }}
      >
        Pesanan Saya
      </h2>

      <p style={{ color: t.textMuted, fontSize: 13.5, marginBottom: 24 }}>
        Lihat dan pantau status pesananmu.
      </p>

      {error && (
        <div style={{ color: C.danger, fontSize: 13, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {!loading && orders.length === 0 ? (
        <EmptyState
          t={t}
          icon={ClipboardList}
          title="Belum ada pesanan"
          desc="Pesanan yang kamu buat akan muncul di sini."
          action={
            <div style={{ marginTop: 18 }}>
              <PrimaryButton onClick={() => navigate("/")}>
                Mulai belanja
              </PrimaryButton>
            </div>
          }
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) =>
                sum + Number(item.unit_price) * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                style={{
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        color: t.text,
                        fontSize: 15,
                      }}
                    >
                      {order.order_number}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: t.textMuted,
                        marginTop: 3,
                      }}
                    >
                      {new Date(order.created_at).toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.primary,
                      padding: "6px 10px",
                      borderRadius: 20,
                      background: t.surfaceAlt,
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${t.border}`,
                    paddingTop: 12,
                  }}
                >
                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      <div style={{ color: t.text }}>
                        <Package
                          size={14}
                          style={{
                            verticalAlign: "middle",
                            marginRight: 6,
                          }}
                        />
                        {item.product_name} × {item.quantity}
                      </div>

                      <div style={{ color: t.textMuted }}>
                        {formatIDR(Number(item.unit_price) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${t.border}`,
                    marginTop: 10,
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 800,
                    color: t.text,
                  }}
                >
                  <span>Total</span>
                  <span>{formatIDR(total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}