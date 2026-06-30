import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs = [],
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden bg-brand-950 pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/85 to-brand-950/60" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className={`container-lux relative ${center ? "mx-auto text-center" : ""}`}>
        <nav className={`flex flex-wrap items-center gap-1.5 text-xs text-mist-300 ${center ? "justify-center" : ""}`}>
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-mist-500" />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">{c.label}</Link>
              ) : (
                <span className="text-copper-300">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className={`mt-5 ${center ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
          {eyebrow && (
            <div className={center ? "flex justify-center" : ""}>
              <Eyebrow light>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {description && (
            <p className={`mt-5 text-pretty text-lg text-mist-200 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
