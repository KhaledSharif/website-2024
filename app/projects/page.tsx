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
  title: "Projects",
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
                      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbPage>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex flex-col gap-4">
                <Card className="pt-4">
                  <CardHeader>
                    <CardTitle>
                      <div>🤖 Robotics</div>
                    </CardTitle>
                    <CardDescription>
                      <div>Projects related to Robot Vision and Mapping</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Project
                      link="/projects/ros-vslam"
                      name="Visual SLAM"
                      description="This project has code for running Visual SLAM in the Robot Operating System (ROS) with GPU acceleration and testing in a ray traced simulation"
                    />
                  </CardContent>
                </Card>
                <Card className="pt-4">
                  <CardHeader>
                    <CardTitle>
                      <div>🧠 Artificial Intelligence</div>
                    </CardTitle>
                    <CardDescription>
                      <div>
                        Projects related to AI and Reinforcement Learning
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Project
                      link="/projects/omniverse-gym"
                      name="Omniverse Gym"
                      description="This project shows how to use NVIDIA Omniverse Isaac Simulator to solve robot reinforcement learning tasks using Proximal Policy Optimization (PPO)"
                    />
                    <Project
                      link="/projects/robot-transformers"
                      name="Robot Transformers"
                      description="This project trains and evaluates an Action Chunking Transformer (ACT) for coordinated robot manipulation using HuggingFace LeRobot library"
                    />
                  </CardContent>
                </Card>
                <Card className="pt-4">
                  <CardHeader>
                    <CardTitle>
                      <div>🚀 Space Exploration</div>
                    </CardTitle>
                    <CardDescription>
                      <div>Projects related to Astronomy and Space Robots</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Project
                      link="/projects/astrobee"
                      name="Astrobee"
                      description="This project goes over the C++ code for new robots (Astrobees) working alongside astronauts on the International Space Station (ISS)"
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
