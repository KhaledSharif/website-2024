import PageLayout from "@/components/page-layout";
import FeaturesElement3 from "@/public/images/ros-isaac-vslam.jpg";
import { defaultMetadata } from "@/components/page-metadata";
import SourceCodeButton from "@/components/source-code";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedBeamMultipleInputDemo } from "@/components/flow";
import Image from "next/image";

export const metadata = defaultMetadata;

import fs from "fs";
import path from "path";
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "app", "projects", "ros-vslam", "content.md");
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
        { label: "Visual SLAM" }
      ]}
      title="Visual SLAM"
      titleIcon="🗺️"
      description="Learn how robots simultaneously localize and map unknown worlds visually"
      children={
        <div className="flex w-full items-center justify-center pb-8">
          <Image src={FeaturesElement3} alt="robots" />
        </div>
      }
      additionalContent={
        <>
          <SourceCodeButton url={"https://github.com/khaledsharif/ros-vslam"}/>
          <div className="mt-6 mb-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What is SLAM and why is it used in robotics?
                </AccordionTrigger>
                <AccordionContent className="text-justify flex flex-col gap-4 ml-4 mr-8">
                  <div>
                    SLAM stands for Simultaneous Localization and
                    Mapping. It is a technique used in robotics and
                    autonomous systems to construct a map of an unknown
                    environment while simultaneously tracking the
                    position and orientation of the robot or autonomous
                    vehicle within that environment.</div>
                    
                    <div>SLAM allows robots
                    to create and update a map of their surroundings as
                    they move through an unknown environment. It also enables robots 
                    to determine
                    their precise location within the constructed map.
                    This is essential for accurate navigation and
                    decision-making.
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What is the Robot Operating System (ROS)?
                </AccordionTrigger>
                <AccordionContent className="text-justify flex flex-col gap-4 ml-4 mr-8">
                  <div>
                    The Robot Operating System (ROS) is an open-source
                    robotics framework that provides a set of software
                    libraries and tools for building robotic
                    applications. It is designed to simplify the task of
                    creating complex and robust robot behavior across a
                    wide variety of robotic platforms.
                  </div>

                  <div>
                    ROS is widely used in both academic and industrial
                    robotics applications, and is supported by a variety
                    of robot hardware platforms and sensors. It is
                    particularly popular in the research and development
                    of mobile robots, manipulator arms, and other
                    robotic systems.
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What makes Visual SLAM special?
                </AccordionTrigger>
                <AccordionContent className="text-justify flex flex-col gap-4 ml-4 mr-8">
                  <div>
                    Visual SLAM is appealing due to its use of low-cost,
                    lightweight cameras as the primary sensor. This
                    provides rich visual information about the
                    environment, enabling enhanced mapping and object
                    recognition. However, visual SLAM can be affected by
                    lighting conditions, camera quality, and visual
                    texture, and it is prone to drift and scale
                    ambiguity issues, especially in large-scale
                    environments.
                  </div>

                  <div>
                    Lidar-based SLAM, on the other hand, provides
                    accurate 3D point cloud data for precise mapping and
                    localization. It is more robust to changes in
                    lighting and visual textures, but requires
                    specialized and more expensive Lidar sensors, which
                    have higher power consumption compared to visual
                    SLAM. Lidar-based SLAM may also struggle in dynamic
                    environments with moving obstacles.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex justify-center w-full">
            <AnimatedBeamMultipleInputDemo />
          </div>
        </>
      }
      markdownContent={md1}
    />
  );
}
