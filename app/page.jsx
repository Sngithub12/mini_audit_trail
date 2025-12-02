"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [versions, setVersions] = useState([]);

  // Save version API call
  const handleSave = async () => {
    const res = await fetch("/api/save-version", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newText: text })
    });

    await res.json();
    alert("Version saved!");
  };

  // Fetch version history
  const fetchVersions = async () => {
    const res = await fetch("/api/versions");
    const data = await res.json();
    setVersions(data);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", paddingBottom: 50 }}>

      {/* Smooth Transitions */}
      <style>
        {`
          div, textarea, button {
            transition: 0.25s ease;
          }
          button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
          }
        `}
      </style>

      {/* Navbar */}
      <div
        style={{
          padding: "15px 20px",
          background: "#0070f3",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Mini Audit Trail Generator
      </div>

      {/* Main container */}
      <div
        style={{
          maxWidth: "820px",
          margin: "30px auto",
          padding: "25px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Text editor */}
        <textarea
          style={{
            width: "100%",
            height: 170,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            resize: "vertical",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type content here..."
        />

        {/* Buttons */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 18px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Save Version
          </button>

          <button
            onClick={fetchVersions}
            style={{
              padding: "10px 18px",
              background: "#444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
              marginLeft: "12px",
            }}
          >
            Version History
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* Versions UI */}
        {versions.length > 0 && (
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
              Saved Versions
            </h2>

            {versions.map((v) => (
              <div
                key={v.id}
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  border: "1px solid #e5e5e5",
                }}
              >
                {/* Timestamp */}
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {v.timestamp}
                </div>

                {/* Added */}
                <p>
                  <b>Added:</b>{" "}
                  <span style={{ color: "green" }}>
                    {(v.addedWords || []).length > 0
                      ? v.addedWords.join(", ")
                      : "(none)"}
                  </span>
                </p>

                {/* Removed */}
                <p>
                  <b>Removed:</b>{" "}
                  <span style={{ color: "red" }}>
                    {(v.removedWords || []).length > 0
                      ? v.removedWords.join(", ")
                      : "(none)"}
                  </span>
                </p>

                {/* Counts */}
                <p>
                  <b>Old Length:</b> {v.oldLength ?? 0} &nbsp;|&nbsp;
                  <b>New Length:</b> {v.newLength ?? 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
