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
import { getAllProjects } from "@/lib/projects-data";

export const metadata = {
  title: "Projects",
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
    <Link href={link}>
      <Card className="pt-4 cursor-pointer hover:bg-background bg-muted">
        <CardContent>
          <div className="space-y-1 text-left">
            <div className="text-lg font-medium text-foreground font-display">
              {titleIcon} {name}
            </div>
            <div className="text-sm text-muted-foreground font-sans">{description}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const projects = getAllProjects();

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
                      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbPage>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex flex-col gap-4">
                <Card className="pt-4">
                  <CardHeader>
                    <CardTitle>
                      <div>🚀 Projects</div>
                    </CardTitle>
                    <CardDescription>
                      <div>
                        My open source projects related to Robotics, Vision,
                        Mapping, and more
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {projects.map((project) => (
                      <Project
                        key={project.slug}
                        link={`/projects/${project.slug}`}
                        name={project.name}
                        titleIcon={project.titleIcon}
                        description={project.description}
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
