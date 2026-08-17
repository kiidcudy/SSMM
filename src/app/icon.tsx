import { ImageResponse } from "next/og";

// Browser tab + Google Search favicon (multiples of 48px recommended).
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0b1628 0%, #121a2b 55%, #0a1220 100%)",
          borderRadius: 22,
          border: "3px solid #22d3ee",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 800,
            color: "#22d3ee",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          S
        </div>
        {/* Growth bars — SMM / social lift mark */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 14,
            bottom: 16,
            alignItems: "flex-end",
            gap: 3,
          }}
        >
          <div style={{ display: "flex", width: 6, height: 12, borderRadius: 2, background: "#22d3ee", opacity: 0.55 }} />
          <div style={{ display: "flex", width: 6, height: 18, borderRadius: 2, background: "#22d3ee", opacity: 0.8 }} />
          <div style={{ display: "flex", width: 6, height: 26, borderRadius: 2, background: "#67e8f9" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
