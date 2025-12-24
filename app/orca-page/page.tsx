"use client";
import React from "react";

export default function OrcaPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        height: "100vh",
        width: "100vw",
        background: "#fff",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="/Convai%20Page/index.html?content=orca"
        title="Convai Page"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          margin: 0,
          padding: 0,
          display: "block",
        }}
        allowFullScreen
      />
    </main>
  );
}
