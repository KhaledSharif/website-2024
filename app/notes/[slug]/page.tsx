import PageLayout from "@/components/page-layout";
import { defaultMetadata } from "@/components/page-metadata";
import { getNoteBySlug, getAllNotes } from "@/lib/notes-data";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export const metadata = defaultMetadata;

// Generate static params for all notes
export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

async function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", "notes", `${slug}.md`);
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return fileContent;
  } catch {
    return null;
  }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug);
  
  if (!note) {
    notFound();
  }

  const mdContent = await getMarkdownContent(params.slug);
  
  if (!mdContent) {
    notFound();
  }

  let headerImage = undefined;
  
  if (note.hasHeaderImage && note.headerImageSrc) {
    headerImage = {
      src: note.headerImageSrc,
      alt: note.headerImageAlt || "Header image"
    };
  }

  return (
    <PageLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Notes", href: "/notes" },
        { label: note.breadcrumbLabel }
      ]}
      title={note.title}
      titleIcon={note.titleIcon}
      description={note.description}
      headerImage={headerImage}
      markdownContent={mdContent}
    />
  );
} 