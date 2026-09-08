import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin } from "lucide-react";
import Thumb from "./Thumb";
import { Badge, RatingStars } from "./Badge";
import { C } from "../../theme";
import { iconForCategory, gradForId } from "../../utils/visuals";
import { priceAfterDiscount } from "../../utils/pricing";
import { formatIDR } from "../../data/format";

export default function ProductCard({ product, t, onAdd }) {
  const navigate = useNavigate();
  const final = priceAfterDiscount(product);
  const Icon = iconForCategory(product.category);
  const grad = gradForId(product.id);

  return (
    <div
      onClick={() => navigate(`/produk/${product.id}`)}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "border-color .15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.primary)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.border)}
    >
      <div
  style={{
    position: "relative",
    width: "100%",
    height: 210,
    overflow: "hidden",
  }}
>
        
        {product.image ? (
          <img
  src={`http://127.0.0.1:8000/storage/${product.image}`}
  alt={product.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  }}
/>
        ) : (
          <Thumb
  grad={grad}
  Icon={Icon}
  size={40}
  radius={0}
/>
        )}

        {product.discount > 0 && (
          <Badge
            bg={C.danger}
            fg="#fff"
            style={{ position: "absolute", top: 18, left: 18 }}
          >
            -{product.discount}%
          </Badge>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          aria-label="Tambah ke keranjang"
          style={{
            position: "absolute",
            bottom: 18,
            right: 18,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "none",
            background: C.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: t.shadowLg,
          }}
        >
          <Plus size={17} />
        </button>
      </div>

      <div style={{ padding: "0 14px 14px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: 6,
            height: 37,
            overflow: "hidden",
            color: t.text,
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 7,
            marginBottom: 6,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 16, color: t.text }}>
            {formatIDR(final)}
          </span>

          {product.discount > 0 && (
            <span
              style={{
                fontSize: 12,
                color: t.textFaint,
                textDecoration: "line-through",
              }}
            >
              {formatIDR(product.price)}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            color: t.textMuted,
          }}
        >
          <RatingStars rating={product.rating} />
          <span>Terjual {(product.sold ?? 0).toLocaleString("id-ID")}</span>
        </div>

        {product.store?.location && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 7,
              fontSize: 11.5,
              color: t.textFaint,
            }}
          >
            <MapPin size={11} />
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.store.location}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}