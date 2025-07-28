import PageLayout from "@/components/page-layout";
import FeaturesElement3 from "@/public/images/auto-nav.jpg";
import { defaultMetadata } from "@/components/page-metadata";

export const metadata = defaultMetadata;
import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "notes", "auto-nav", "content.md");
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
        { label: "Autonomous Navigation" }
      ]}
      title="Autonomous Navigation"
      titleIcon="🧭"
      description="Review of recent research in autonomous robot navigation"
      headerImage={{ src: FeaturesElement3, alt: "robots" }}
      markdownContent={md1}
    />
  );
}