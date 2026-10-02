// Shared Google service-account auth for the scripts in this folder.
// Zero dependencies: signs a JWT with node:crypto and exchanges it for a token.

import { readFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";
import { join } from "node:path";

export const KEY_PATH =
  process.env.GOOGLE_SA_KEY ?? join(homedir(), ".gsc-service-account.json");

export const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
].join(" ");

export function loadKey() {
  if (!existsSync(KEY_PATH)) {
    console.error(`Service account key not found at ${KEY_PATH}`);
    console.error("Create one in Google Cloud Console and save it there (outside the repo).");
    process.exit(1);
  }
  return JSON.parse(readFileSync(KEY_PATH, "utf8"));
}

const b64url = (v) =>
  Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

export async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = key.token_uri ?? "https://oauth2.googleapis.com/token";
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const claim = b64url({
    iss: key.client_email,
    scope: SCOPES,
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  });
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claim}`)
    .sign(key.private_key, "base64url");

  const res = await fetch(tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}
