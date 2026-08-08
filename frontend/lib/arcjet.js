import arcjet, { tokenBucket } from "@arcjet/next";

// Base Arcjet instance
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [],
});

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = aj.withRule(
  tokenBucket({
    mode: "DRY_RUN",
    characteristics: ["userId"],
    refillRate: 10,
    interval: "30d",
    capacity: 10,
  })
);

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
  tokenBucket({
    mode: "DRY_RUN",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  })
);

// Pro tier - effectively unlimited
export const proTierLimit = aj.withRule(
  tokenBucket({
    mode: "DRY_RUN",
    characteristics: ["userId"],
    refillRate: 1000,
    interval: "1d",
    capacity: 1000,
  })
);