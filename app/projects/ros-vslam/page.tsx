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
import FeaturesElement3 from "@/public/images/ros-isaac-vslam.jpg";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md = `
In the realm of robotics and computer vision, **Visual Simultaneous Localization and Mapping** (VSLAM) emerges as a pivotal technique for estimating the position and orientation of a robot or camera in real-time. Simultaneously, it constructs a map of the surrounding environment. This dual capability makes VSLAM particularly advantageous in scenarios where GPS is either unavailable or unreliable, such as indoor environments or urban areas with significant obstructions.

### Understanding Key Concepts of VSLAM

#### Visual Odometry (VO)

At the core of VSLAM is Visual Odometry (VO), a method that utilizes images captured by cameras to track the movement of key points—distinctive features within the images. By analyzing the positional changes of these key points across consecutive images, VO estimates the motion of the camera. This process is akin to the way humans perceive motion by observing how objects shift relative to one another.

#### Visual-Inertial Odometry (VIO)

To enhance the accuracy of motion estimation, Visual-Inertial Odometry (VIO) comes into play. VIO integrates visual data from cameras with motion data from an Inertial Measurement Unit (IMU). The IMU provides additional information on acceleration and angular velocity, which is particularly beneficial in environments with few distinctive visual features. By combining these data sources, VIO offers a more robust and accurate odometry estimate, making it a critical component of effective VSLAM systems.

#### Simultaneous Localization and Mapping (SLAM)

The ultimate goal of VSLAM is to build a map of the environment while concurrently estimating the robot's position within that map—a process known as Simultaneous Localization and Mapping (SLAM). SLAM employs sophisticated techniques such as loop closure, which recognizes previously seen areas to reduce map uncertainty and improve localization accuracy. This capability is essential for creating reliable and coherent maps, especially in large or complex environments.

### Advantages of VSLAM

VSLAM boasts several significant advantages that make it ideal for real-time robotic applications:

- **Real-time Performance:** Leveraging GPU acceleration, VSLAM can process visual data at high speeds, facilitating real-time applications. This is particularly important for autonomous robots that require immediate feedback to navigate and interact with their environments.
  
- **Enhanced Accuracy:** By matching a greater number of key points and incorporating IMU data, VSLAM achieves high levels of accuracy in both localization and mapping. This ensures that robots can navigate with precision, even in challenging conditions.

- **Versatility:** VSLAM's ability to operate effectively in a variety of environments—ranging from GPS-denied indoor spaces to obstructed urban areas—underscores its versatility. This adaptability is crucial for deploying robots in diverse and dynamic settings.

### Implementing VSLAM in ROS (Robot Operating System)

The Robot Operating System (ROS) provides a flexible framework for developing robot software, and integrating VSLAM into ROS enables powerful real-time localization and mapping capabilities. With the advent of GPU-accelerated solutions like NVIDIA Isaac Sim, developers can harness advanced visual odometry and mapping tools to enhance the performance of robotic systems.

### Applications of VSLAM in ROS

VSLAM integrated with ROS can significantly advance various robotic applications:

- **Navigation:** By providing real-time estimates of position and orientation, VSLAM enables autonomous robots to navigate accurately and efficiently through their environments. This is essential for tasks ranging from delivery robots maneuvering through buildings to drones flying in GPS-denied areas.

- **Mapping:** VSLAM allows robots to create detailed maps of unknown environments, facilitating exploration, and subsequent localization tasks. This capability is particularly valuable for applications in search and rescue, environmental monitoring, and industrial automation.

- **Localization:** In environments where GPS signals are weak or nonexistent, VSLAM enhances the accuracy of robot localization. This ensures that robots can maintain precise awareness of their position, which is critical for safe and effective operation.

### Conclusion

By integrating VSLAM with ROS, developers can unlock the full potential of GPU-accelerated visual odometry and mapping capabilities. This integration enhances the performance, accuracy, and versatility of robotic systems, paving the way for advanced applications in navigation, mapping, and localization. As robotics technology continues to evolve, VSLAM stands out as a transformative tool that drives innovation and expands the horizons of autonomous systems.
`;

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
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Visual SLAM</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>🗺️ Visual SLAM</div>
                  </CardTitle>
                  <CardDescription>
                    <div>
                      Robots can localize and map the world visually using VSLAM
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full items-center justify-center pb-8">
                    <Image src={FeaturesElement3} alt="robots" />
                  </div>
                  <div className="markdown">
                    <Markdown>{md}</Markdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
