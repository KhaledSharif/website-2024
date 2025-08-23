import PageLayout from "@/components/page-layout";
import { defaultMetadata } from "@/components/page-metadata";
import SourceCodeButton from "@/components/source-code";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import type { StaticImageData } from "next/image";

export const metadata = defaultMetadata;

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", "projects", `${slug}.md`);
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return fileContent;
  } catch {
    return null;
  }
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const mdContent = await getMarkdownContent(params.slug);

  if (!mdContent) {
    notFound();
  }

  // Import components conditionally based on project configuration
  let children = null;
  let additionalContent = null;

  if (project.hasVideo) {
    const videoSrc = `/videos/${params.slug}.webm`;
    children = (
      <div className="flex w-full items-center justify-center pb-8">
        <video src={videoSrc} autoPlay muted loop className="w-full"/>
      </div>
    );
  }

  if (project.sourceCodeUrl) {
    additionalContent = <SourceCodeButton url={project.sourceCodeUrl} />;
  }

  if (project.hasCarousel && project.carouselItems) {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } = await import("@/components/ui/carousel");
    const { default: Image } = await import("next/image");
    
    // Import images dynamically based on slug
    let imageImports: Record<string, StaticImageData> = {};
    if (params.slug === "astrobee") {
      imageImports = {
        FeaturesElement1: (await import("@/public/images/astrobee-001.jpg")).default,
        FeaturesElement2: (await import("@/public/images/astrobee-002.webp")).default,
        FeaturesElement4: (await import("@/public/images/astrobee-004.jpg")).default,
        FeaturesElement5: (await import("@/public/images/astrobee-005.jpg")).default,
      };
    }
    
    children = (
      <div className="flex w-full items-center justify-center pb-8 px-12">
        <Carousel className="w-full md:w-5/6 flex items-center justify-center relative">
          <CarouselContent>
            {project.carouselItems.map((item, index) => {
              const imageKey = `FeaturesElement${index + 1}`;
              const ImageComponent = imageImports[imageKey];
              
              return (
                <CarouselItem key={index}>
                  <div className="flex flex-col gap-4 aspect-square items-center justify-center p-0 bg-muted rounded-3xl m-4">
                    <div className="overflow-hidden rounded-lg">
                      {ImageComponent ? (
                        <Image src={ImageComponent} className="w-full h-auto object-cover rounded-lg" alt="robots" width={500} height={500} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                      ) : (
                        <Image src={item.img} alt={item.desc} className="w-full h-auto object-cover rounded-lg" width={500} height={500} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                      )}
                    </div>
                    <div className="text-base font-medium text-center px-2">{item.desc}</div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
      </div>
    );
  }

  if (project.hasAccordion) {
    const { Accordion, AccordionContent, AccordionItem, AccordionTrigger } = await import("@/components/ui/accordion");
    children = (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Visual SLAM?</AccordionTrigger>
          <AccordionContent>
            Visual SLAM (Simultaneous Localization and Mapping) is a technique used in robotics and computer vision to construct or update a map of an unknown environment while simultaneously keeping track of an agent&apos;s location within it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            The system uses visual information from cameras to track features in the environment, estimate the camera&apos;s motion, and build a 3D map of the surroundings.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  // Note: AnimatedBeam components are handled in specific project pages
  // as they require specific refs and complex setup

  return (
    <PageLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: project.breadcrumbLabel }
      ]}
      title={project.title}
      titleIcon={project.titleIcon}
      description={project.description}
      {...(children && { children })}
      additionalContent={additionalContent}
      markdownContent={mdContent}
    />
  );
} 