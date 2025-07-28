import PageLayout from "@/components/page-layout";
import FeaturesElement3 from "@/public/images/bev-chart.jpg";
import { defaultMetadata } from "@/components/page-metadata";

export const metadata = defaultMetadata;
import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "notes", "bev", "content.md");
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
        { label: "Birds Eye View" }
      ]}
      title="Birds Eye View"
      titleIcon="🐦"
      description="Recent research related to Birds Eye View (BEV) for robots"
      headerImage={{ src: FeaturesElement3, alt: "robots" }}
      markdownContent={md1}
    />
  );
}
