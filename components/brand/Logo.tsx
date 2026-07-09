// Rounded-square badge with a bold, smooth lowercase "m" (matching the favicon)
// centred inside it. The frame uses the brand colour, the letter uses the
// current text colour — both recolour with the theme.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="22"
        strokeWidth="7"
        className="text-brand/40"
      />
      <g strokeWidth="11">
        <path d="M34 64V44a8 8 0 0 1 16 0v20" />
        <path d="M50 44a8 8 0 0 1 16 0v20" />
      </g>
    </svg>
  );
}
