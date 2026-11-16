"use client";

import FadeInSection from "../general/fadeIn";
import VideoWithPlaceholder from "../general/placeholderVideo";

const portfolioTechnologies = [
  "Next.js",
  "Tailwind CSS",
  "Typescript",
  "Supabase",
  "PostgreSQL",
  "RLS",
  "Authentication",
  "Vercel",
];

const featuredVideos = [
  { src: "/addAlbum.mp4", caption: "Example of inserting data" },
  { src: "/removeAlbum.mp4", caption: "Example of removing data" },
  { src: "/authEx.mp4", caption: "Example of authentication" },
  { src: "/updateEx.mp4", caption: "Example of updating data" },
];

interface ProjectInfo {
  title: string;
  description: string;
  technologies: string[];
  video: string;
  fallbackSrc?: string;
  link?: string;
  linkLabel?: string;
}

const projects: ProjectInfo[] = [
  {
    title: "Soul Boy",
    description:
      "Lead a team in developing a 2.5 dimensional platform using Unreal Engine 5 and Blueprints.",
    technologies: ["UE5", "Blueprints", "Creativity", "Design", "Leadership"],
    video: "/soul_boy_ex.mp4",
    fallbackSrc: "/soul_boy_ex.gif",
    link: "https://github.com/Zax-boop/SoulBoy",
    linkLabel: "README",
  },
  {
    title: "Idle Animation",
    description: "Developed an idle animation for a character using Aseprite.",
    technologies: ["Aseprite", "Creativity", "Design", "Animation"],
    video: "/IdleAnimation.mp4",
  },
];

export default function ProjectSection() {
  const renderTechnologies = (technologies: string[]) => (
    <div className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <span
          key={technology}
          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/75 sm:text-sm"
        >
          {technology}
        </span>
      ))}
    </div>
  );

  const renderPreview = (src: string, className = "", fallbackSrc?: string) => (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-black/30 ${className}`}>
      <VideoWithPlaceholder className="w-full object-cover" src={src} fallbackSrc={fallbackSrc} />
    </div>
  );

  return (
    <section className="mt-16 space-y-6" aria-labelledby="projects-heading">
      <div>
        <FadeInSection className="w-full text-center text-2xl sm:text-4xl xl:text-5xl">
          <h2 id="projects-heading">Projects</h2>
        </FadeInSection>
        <div aria-hidden="true" className="mt-3 h-px w-full bg-white/30" />
      </div>

      <FadeInSection className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8 lg:p-8">
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                Featured project
              </p>
              <h3 className="text-xl font-semibold sm:text-2xl">Portfolio Website</h3>
              <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                This is the website you are currently on! The website is developed with Next.js and
                Tailwind CSS. The data is stored in Supabase, a BaaS PostgreSQL database.
                Authentication was implemented using Supabase, complete with RLS (Row Level
                Security). Various data structures can be selected, inserted, deleted, and updated
                all by using the website. Project deployed on Vercel.
              </p>
            </div>
            {renderTechnologies(portfolioTechnologies)}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredVideos.map(({ src, caption }) => (
              <figure className="min-w-0" key={src}>
                {renderPreview(src)}
                <figcaption className="mt-2 text-xs text-white/55 sm:text-sm">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </FadeInSection>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <FadeInSection
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
            key={project.title}
          >
            <div>
              <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65 sm:text-base">
                {project.description}
              </p>
              {project.link && (
                <a
                  className="mt-3 inline-flex font-medium text-white/85 transition-colors hover:text-white"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.linkLabel}
                  <span className="ml-1" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
            <div className="mt-4">{renderTechnologies(project.technologies)}</div>
            <div className="mt-auto pt-5">
              {renderPreview(project.video, "", project.fallbackSrc)}
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
