// Monoline avatar in the same drawing style as the service illustrations —
// no photo, recolours with the theme via currentColor.
export function Avatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="54" className="text-brand" />
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="currentColor"
        stroke="none"
        opacity="0.08"
      />
      <path d="M60 30a15 15 0 1 0 0 30 15 15 0 0 0 0-30Z" />
      <path d="M32 92a28 28 0 0 1 56 0" />
    </svg>
  );
}
