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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FeaturesElement3 from "@/public/images/ros-isaac-vslam.jpg";
import Image from "next/image";
import Markdown from "react-markdown";
import { AnimatedBeamMultipleInputDemo } from "@/components/flow";
import SourceCodeButton from "@/components/source-code";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md1 = `
In robotics and computer vision, **Visual Simultaneous Localization and Mapping** (VSLAM) emerges as a pivotal technique for 
estimating the position and orientation of a robot or camera in real-time, while simultaneously constructing a map of the 
surrounding environment. This dual capability makes Visual SLAM particularly advantageous in scenarios where GPS is either 
unavailable or unreliable, 
such as indoor environments, urban areas with significant obstructions, 
or undiscovered planets.
`;
const md2 = `
#### Visual Odometry (VO)

At the core of VSLAM is **Visual Odometry** (VO), a method that utilizes images captured by cameras to 
track the movement of key points — distinctive features within the images. By analyzing the positional 
changes of these key points across consecutive images, VO estimates the motion of the camera. This 
process is akin to the way humans perceive motion by observing how objects shift relative to one another.

#### Visual-Inertial Odometry (VIO)

To enhance the accuracy of motion estimation, **Visual-Inertial Odometry** (VIO) comes into 
play. VIO integrates visual data from cameras with motion data from an **Inertial Measurement Unit** (IMU). 
The IMU provides additional information on acceleration and angular velocity, which is particularly 
beneficial in environments with few distinctive visual features. By combining these data 
sources, VIO offers a more robust and accurate odometry estimate, making it a critical 
component of effective VSLAM systems.

#### Pose Graph (PG)
A pose graph is a data structure used to represent the trajectory of a robot or camera 
through an environment and the relationships between different poses (positions and orientations) 
along that trajectory. Each node in the graph represents a pose, and each edge represents a
spatial constraint or transformation between two poses.

1. **Nodes:**
   - **Poses:** Each node in the graph represents a pose of the robot or camera at a 
   specific time. A pose typically includes the position (x, y, z) and orientation (roll, pitch, yaw) in 3D space.
   
2. **Edges:**
   - **Constraints:** Each edge in the graph represents a spatial constraint 
   between two poses. This constraint could be derived from sensor measurements 
   such as visual features, odometry, or IMU data. Edges can represent transformations 
   (e.g., relative motion) or direct observations (e.g., loop closures).

Efficient representation of pose graphs require specific data structures 
to handle large amounts of data and complex operations such as optimization. Common data 
structures and techniques include:

1. **Graphs:**
   - **Adjacency Lists:** Pose graphs are often implemented using adjacency lists, where 
   each node maintains a list of connected nodes (neighbors) along with the corresponding 
   edge constraints. This structure is memory-efficient and supports efficient traversal.

2. **Sparse Matrices:**
   - **Information Matrices:** For graph optimization, the constraints between poses are 
   represented using sparse matrices. Sparse matrices are efficient for storing and 
   manipulating large, mostly empty matrices, which are common in pose graphs where each pose is only connected to a few others.

3. **Data Association Structures:**
   - **KD-Trees or Hash Tables:** These are used for fast nearest-neighbor searches and data association 
   tasks. KD-trees efficiently manage spatial data for quick retrieval of nearby points, which is 
   essential for matching visual features or landmarks.

4. **Optimization Techniques:**
   - **Nonlinear Optimization Algorithms:** Techniques such as Gauss-Newton, Levenberg-Marquardt, or gradient 
   descent are used for optimizing the pose graph. These algorithms iteratively adjust the poses to minimize 
   the overall error in the graph based on the constraints.
   - **Robust Cost Functions:** Functions like Huber loss or Tukey's biweight are used 
   to handle outliers in the optimization process, making the system robust to erroneous measurements.


#### Loop Closure (LC)

**Loop Closure** refers to the process of recognizing when a robot has returned to a previously visited location. 
This recognition is essential for correcting accumulated errors in the estimated positions of landmarks 
and the trajectory of the robot. 

1. **Pose Insertion:**
   - **Odometry Updates:** As the robot moves, new poses are added to the graph based on odometry or visual odometry updates.
   
2. **Edge Addition:**
   - **Relative Transformations:** Edges are added to represent relative transformations between consecutive poses.
   - **Loop Closures:** When a loop closure is detected, an edge is added between the current pose and a previously visited pose.

3. **Recognition of Revisited Locations:**
   - **Landmark Identification:** As the robot navigates an environment, it detects and tracks distinctive 
   features (landmarks) within the images captured by its cameras. These features are stored along with 
   their estimated positions.
   - **Detection of Known Landmarks:** When the robot revisits a location, it recognizes previously mapped 
   landmarks in the current image frame. This recognition is based on the similarity of the features detected 
   in the current view to those stored in the map.

4. **Data Association:**
   - **Associating Landmarks:** The system verifies that the detected landmarks in the current image 
   correspond to those previously observed. This association helps in confirming that the robot has indeed 
   returned to a known location.

5. **Pose Graph Update:**
   - **Adding Connections:** Once loop closure is detected, a new edge is added to the pose graph. This 
   edge represents the connection between the current pose of the robot and the previously visited pose where 
   the landmarks were initially observed.


#### Graph Optimization (GO) After LC

1. **Pose Graph Optimization:**
   - **Global Adjustment:** After detecting a loop closure, the pose graph, which tracks the robot's poses 
   and the relationships between them, is optimized. This process involves adjusting the positions of all nodes 
   (poses) in the graph to minimize the overall error.
   - **Consistent Trajectory:** The optimization ensures that the trajectory of the robot and the positions 
   of landmarks are consistent with the observations made during the loop closure.

2. **Improved Odometry:**
   - **Odometric Pose Correction:** The current and previous poses are corrected based on the loop closure 
   information, leading to improved odometry estimates.
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
                      Learn how robots simultaneously localize and map unknown worlds visually
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full items-center justify-center pb-8">
                    <Image src={FeaturesElement3} alt="robots" />
                  </div>
                  <SourceCodeButton url={"https://github.com/khaledsharif/ros-vslam"}/>
                  <div className="markdown mt-6">
                    <Markdown>{md1}</Markdown>
                  </div>
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
                  <div className="markdown mt-2">
                    <Markdown>{md2}</Markdown>
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
