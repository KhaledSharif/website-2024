import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { getAllNotes } from "@/lib/notes-data";

export const metadata = {
  title: "Notes",
  description: "Personal Website",
};

function Project({
  name,
  titleIcon,
  description,
  link,
}: {
  name: string;
  titleIcon: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} aria-label={`Read note: ${name}`}>
      <Card 
        className="pt-4 cursor-pointer hover:bg-background bg-muted hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-border/50"
        role="article"
        aria-labelledby={`note-title-${name.replace(/\s+/g, '-').toLowerCase()}`}
        aria-describedby={`note-desc-${name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <CardContent>
          <div className="space-y-1 text-left">
            <h3 
              id={`note-title-${name.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl font-medium text-foreground font-display"
            >
              {titleIcon} {name}
            </h3>
            <p 
              id={`note-desc-${name.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-base text-muted-foreground font-sans"
            >
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const notes = getAllNotes();

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12">
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-full flex items-center justify-center pb-2">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                      <BreadcrumbLink href="/notes">Notes</BreadcrumbLink>
                    </BreadcrumbPage>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex flex-col gap-4">
                <Card className="pt-4">
                  <CardHeader>
                    <CardTitle>
                      <div>🗒️ Notes</div>
                    </CardTitle>
                    <CardDescription>
                      <div>My study notes on Machine Learning and Computer Vision</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {notes.map((note) => (
                      <Project
                        key={note.slug}
                        link={`/notes/${note.slug}`}
                        name={note.name}
                        titleIcon={note.titleIcon}
                        description={note.description}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
