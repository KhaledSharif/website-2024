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

export const metadata = {
  title: "Notes",
  description: "Personal Website",
};

function Project({
  name,
  description,
  link,
}: {
  name: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <Card className="pt-4 cursor-pointer hover:bg-white bg-gray-50">
        <CardContent>
          <div className="space-y-1 text-left">
            <div className="text-lg font-medium text-gray-800">{name}</div>
            <div className="text-sm text-gray-600">{description}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
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
                    <Project
                      link="/notes/slam-sota"
                      name="📖 SLAM Overview"
                      description="Recent research related to simultaneous localization and mapping"
                    />
                    <Project
                      link="/notes/auto-nav"
                      name="🧭 Autonomous Navigation"
                      description="Overview of state of the art in autonomous robot navigation"
                    />
                    <Project
                      link="/notes/bev"
                      name="🐦 Birds Eye View"
                      description="Introduction to birds eye view perception for robotics"
                    />
                    <Project
                      link="/notes/nerfs"
                      name="🪐 Neural Radiance Fields"
                      description="Introduction to NeRFs and their uses in robotics"
                    />
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
