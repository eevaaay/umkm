import React from "react";
import { useNavigate } from "react-router-dom";
import { Store, MapPin, BadgeCheck } from "lucide-react";
import Thumb from "./Thumb";
import { RatingStars } from "./Badge";
import { C } from "../../theme";
import { gradForId } from "../../utils/visuals";

export default function StoreCard({ store, t }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/toko/${store.id}`)}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 18,
        padding: 18,
        cursor: "pointer",
        minWidth: 230,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 52, height: 52, flexShrink: 0 }}>
          <Thumb grad={gradForId(store.id)} Icon={Store} size={22} radius={14} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontWeight: 700, fontSize: 14.5, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {store.name}
            </span>
            {store.verified && <BadgeCheck size={15} color={C.secondary} fill={C.secondarySoftLight} />}
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
            <MapPin size={11} /> {store.location}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: t.textMuted }}>
        <RatingStars rating={store.rating} />
        <span>{(store.sold ?? 0).toLocaleString("id-ID")} terjual</span>
      </div>
    </div>
  );
}
