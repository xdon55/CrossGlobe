import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
              light ? "text-copper-300" : "text-copper-600"
            }`}
          >
            <span className="h-px w-7 bg-copper-500/70" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`mt-4 text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.85rem] ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
              light ? "text-mist-300" : "text-mist-500"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-copper-300" : "text-copper-600"
      }`}
    >
      <span className="h-px w-7 bg-copper-500/70" />
      {children}
    </span>
  );
}
