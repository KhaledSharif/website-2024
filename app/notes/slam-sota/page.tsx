import PageLayout from "@/components/page-layout";
import FeaturesElement3 from "@/public/images/slam-overview.jpg";
import { defaultMetadata } from "@/components/page-metadata";

export const metadata = defaultMetadata;
import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "notes", "slam-sota", "content.md");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  return fileContent;
}

export default async function () {
  const md1 = await getMarkdownContent();
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Notes", href: "/notes" },
        { label: "SLAM Overview" }
      ]}
      title="SLAM Overview"
      titleIcon="📖"
      description="An overview of the state of the art in SLAM research"
      headerImage={{ src: FeaturesElement3, alt: "robots" }}
      markdownContent={md1}
    />
  );
}
