import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/cards";
import { CTABand } from "@/components/CTABand";
import { getAllProjects } from "@/lib/queries";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Projects — Landmark Construction Portfolio",
  description:
    "Explore landmark CrossGlobe projects across the Benelux — commercial towers, residential developments, civic buildings, healthcare, education and industrial campuses.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Projects that define the <span className="text-gradient-copper">Dutch skyline</span></>}
        description="A selection of landmark buildings where CrossGlobe systems form the engineered envelope."
        image={media.skyscraperBlue}
        crumbs={[{ label: "Projects" }]}
      />

      <section className="container-lux py-20">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand />
    </>
  );
}
