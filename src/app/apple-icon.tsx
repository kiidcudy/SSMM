import { ImageResponse } from "next/og";

// Apple touch + high-res home screen / Google crawler favicon candidate.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          border: "5px solid #22d3ee",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            color: "#22d3ee",
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          S
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 28,
            bottom: 32,
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          <div style={{ display: "flex", width: 12, height: 22, borderRadius: 3, background: "#22d3ee", opacity: 0.55 }} />
          <div style={{ display: "flex", width: 12, height: 34, borderRadius: 3, background: "#22d3ee", opacity: 0.8 }} />
          <div style={{ display: "flex", width: 12, height: 48, borderRadius: 3, background: "#67e8f9" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
