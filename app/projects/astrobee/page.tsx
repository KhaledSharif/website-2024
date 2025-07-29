import PageLayout from "@/components/page-layout";
import FeaturesElement1 from "@/public/images/astrobee-001.jpg";
import FeaturesElement2 from "@/public/images/astrobee-002.webp";
import FeaturesElement4 from "@/public/images/astrobee-004.jpg";
import FeaturesElement5 from "@/public/images/astrobee-005.jpg";
import { defaultMetadata } from "@/components/page-metadata";
import SourceCodeButton from "@/components/source-code";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const metadata = defaultMetadata;

import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "projects", "astrobee", "content.md");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  return fileContent;
}

function CarouselDemo() {
  return (
    <Carousel className="w-full md:w-5/6 flex items-center justify-center">
      <CarouselContent>
        {[
          {
            img: FeaturesElement1,
            desc: "An Astrobee (Bumble) attached to 1 of 2 ports on the charging dock",
          },
          {
            img: FeaturesElement2,
            desc: "Expedition 63 Commander Chris Cassidy with two Astrobees (Bumble & Honey)",
          },
          {
            img: FeaturesElement5,
            desc: "Each Astrobee has 3 cameras on its front: Nav, Sci, & Haz cams",
          },
          {
            img: FeaturesElement4,
            desc: "Astrobee (Bumble) flying autonomously during a mapping session",
          },
        ].map((element, index) => (
          <CarouselItem key={index}>
            <div
              className="flex flex-col gap-4 aspect-square 
                items-center justify-center p-0
                 bg-muted 
                 rounded-3xl m-4"
            >
              <div><Image src={element.img} className="object-cover" alt="robots" /></div>
              <div className="text-sm font-medium">{element.desc}</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div>
      <CarouselPrevious />
      <CarouselNext />
      </div>
    </Carousel>
  );
}

export default async function () {
  const md1 = await getMarkdownContent();
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Astrobee" }
      ]}
      title="Astrobee"
      titleIcon="🐝"
      description="Learn about the code running on free-flying robots on the Space Station"
      children={
        <div className="flex w-full items-center justify-center pb-8">
          <CarouselDemo />
        </div>
      }
      additionalContent={
        <SourceCodeButton url={"https://github.com/nasa/astrobee"} />
      }
      markdownContent={md1}
    />
  );
}
