
// lib/arcjet.js
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    tokenBucket({
      mode: "LIVE", // Change to "DRY_RUN" for testing
      refillRate: 5,    // 5 tokens per minute
      interval: 60,     // 60 seconds
      capacity: 5,      // Max 5 requests
    }),
  ],
});

export default aj;