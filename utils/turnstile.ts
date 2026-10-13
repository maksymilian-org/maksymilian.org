// Loads Cloudflare's Turnstile script once, on demand (replaces next/script).
export function loadTurnstile(explicit = false) {
  if (typeof document === "undefined") return;
  if (document.querySelector("script[data-turnstile]")) return;
  const s = document.createElement("script");
  s.src = `https://challenges.cloudflare.com/turnstile/v0/api.js${explicit ? "?render=explicit" : ""}`;
  s.async = true;
  s.defer = true;
  s.dataset.turnstile = "";
  document.head.appendChild(s);
}
