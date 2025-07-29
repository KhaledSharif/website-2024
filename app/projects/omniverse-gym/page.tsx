import PageLayout from "@/components/page-layout";
import { defaultMetadata } from "@/components/page-metadata";
import SourceCodeButton from "@/components/source-code";

export const metadata = defaultMetadata;

import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "projects", "omniverse-gym", "content.md");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  return fileContent;
}

export default async function () {
  const md1 = await getMarkdownContent();
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Omniverse Gym" }
      ]}
      title="Omniverse Gym"
      titleIcon="🦾"
      description="Train robots to perform tasks like opening cabinets with reinforcement learning"
      children={
        <div className="flex w-full items-center justify-center pb-8">
          <video src={"/videos/omniverse-gym.webm"} autoPlay muted loop className="w-full"/>
        </div>
      }
      additionalContent={
        <SourceCodeButton url={"https://github.com/khaledsharif/omniverse-gym"}/>
      }
      markdownContent={md1}
    />
  );
}
