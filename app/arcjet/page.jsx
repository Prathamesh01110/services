"use client";

import { useState } from "react";
import { protectedAction } from "./actions";

export default function ArcjetPage() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  

  async function handleClick() {
    const result = await protectedAction();
    
    if (result.success) {
      setCount(prev => prev + 1);
      setMessage(result.message);
    } else {
      setMessage(result.error);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛡️ Arcjet Rate Limit Test</h1>
      <p>Click 5+ times quickly to test rate limiting</p>
      
      <button 
        onClick={handleClick}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Click Me ({count})
      </button>

      {message && (
        <p style={{
          marginTop: "1rem",
          padding: "12px",
          backgroundColor: message.includes("❌") || message.includes("Rate limit") ? "#fee" : "#efe",
          borderRadius: "6px"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}