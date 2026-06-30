export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const ink = variant === "light" ? "#ffffff" : "#0f255f";
  const accent = variant === "light" ? "#ffffff" : "#4b7df7";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect x="1" y="1" width="38" height="38" rx="9" stroke={ink} strokeOpacity="0.18" />
        <path
          d="M9 30V12.5L20 7l11 5.5V30"
          stroke={ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 30v-7.5h11V30"
          stroke={accent}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="14.5" r="2.1" fill={accent} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.15rem] font-extrabold tracking-tight"
          style={{ color: ink }}
        >
          CROSS<span style={{ color: accent }}>GLOBE</span>
        </span>
      </span>
    </span>
  );
}
