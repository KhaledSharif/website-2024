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
import FeaturesElement4 from "@/public/images/deepseqslam.jpg";
import Image from "next/image";
import Markdown from "react-markdown";
import { AnimatedBeamMultipleInputDemo } from "@/components/flow";

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

At the core of VSLAM is Visual Odometry (VO), a method that utilizes images captured by cameras to 
track the movement of key points—distinctive features within the images. By analyzing the positional 
changes of these key points across consecutive images, VO estimates the motion of the camera. This 
process is akin to the way humans perceive motion by observing how objects shift relative to one another.

#### Visual-Inertial Odometry (VIO)

To enhance the accuracy of motion estimation, Visual-Inertial Odometry (VIO) comes into 
play. VIO integrates visual data from cameras with motion data from an Inertial Measurement Unit (IMU). 
The IMU provides additional information on acceleration and angular velocity, which is particularly 
beneficial in environments with few distinctive visual features. By combining these data 
sources, VIO offers a more robust and accurate odometry estimate, making it a critical 
component of effective VSLAM systems.

#### Loop Closure (LC)

Loop closure is a critical concept in Simultaneous Localization and Mapping (SLAM) systems, including Visual SLAM (VSLAM). 
It refers to the process of recognizing when a robot or camera has returned to a previously visited location. 
This recognition is essential for correcting accumulated errors in the estimated positions of landmarks 
and the trajectory of the robot or camera. 

1. **Recognition of Revisited Locations:**
   - **Landmark Identification:** As the robot navigates an environment, it detects and tracks distinctive 
   features (landmarks) within the images captured by its cameras. These features are stored along with 
   their estimated positions.
   - **Detection of Known Landmarks:** When the robot revisits a location, it recognizes previously mapped 
   landmarks in the current image frame. This recognition is based on the similarity of the features detected 
   in the current view to those stored in the map.

2. **Data Association:**
   - **Associating Landmarks:** The system verifies that the detected landmarks in the current image 
   correspond to those previously observed. This association helps in confirming that the robot has indeed 
   returned to a known location.

3. **Pose Graph Update:**
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
const md3 = `
**Sequential Place Learning** (SPL) is a technique designed to improve place recognition in autonomous navigation 
by leveraging sequential data. 
It addresses the limitations of traditional heuristic-based methods by using a deep learning approach that combines 
convolutional neural networks (CNN) and long short-term memory networks (LSTM). 

### Advantages of SPL

1. **Joint Visual and Positional Learning**: SPL integrates visual and positional data from a single traversal 
of an environment. This joint learning approach allows the system to learn and recognize places using both 
visual and positional cues simultaneously, improving robustness against changes in viewpoint and appearance.

2. **End-to-End Trainable Architecture**: The method employs a CNN to encode visual information and an LSTM 
to handle the sequential aspect of the data. The entire system is trained end-to-end using backpropagation 
through time (BPTT), which simplifies the training process and enhances performance compared to traditional methods.

3. **Efficiency and Performance**: SPL is designed to be highly efficient, reducing the computational 
and storage requirements typical of classical methods. It achieves higher precision and recall rates 
even with short temporal windows (TWs), which are critical for real-time applications.

4. **Benchmark Results**: SPL has been tested on various challenging benchmark datasets, including Oxford 
RobotCar, Nordland Railway, St. Lucia, and Gardens Point. It has outperformed many classical methods 
and achieved state-of-the-art results, including a perfect 100% recall rate at 100% precision under 
extreme conditions like day-night transitions.

5. **Flexible Integration with Motion Estimation**: The system can use positional data from various sources, 
such as visual odometry, radar odometry, LiDAR, GPS, and even synthetic time-series data, 
making it adaptable to different types of autonomous navigation systems.


### SPL and Deep Sequential SLAM
The architecture consists of a CNN for extracting global image descriptors and an LSTM network 
for sequential learning. This combination allows SPL to learn the temporal structure of the data, 
which is crucial for accurate place recognition in dynamic environments.

**Deep Sequential SLAM** (DSS) is a method proposed to enhance sequence-based place recognition 
for autonomous vehicles, addressing the limitations of traditional approaches like SeqSLAM. It 
combines Convolutional Neural Networks (CNN) and Recurrent Neural Networks (RNN) to learn visual 
and positional representations from a sequence of monocular images.

1. **Joint Learning**: Unlike classical methods that rely on separate stages 
for visual matching and sequential filtering, DSS jointly learns visual and positional 
representations, improving the efficiency and accuracy of place recognition.

2. **Architecture**: It utilizes a CNN to extract global image descriptors 
and an RNN to model the temporal dependencies between these descriptors, 
enhancing the recognition capabilities across different environmental conditions.

3. **Performance**: DSS has demonstrated significant improvements over 
state-of-the-art methods, particularly in terms of Area Under the Curve (AUC) and 
deployment time. For instance, on the Nordland dataset, it achieved over 
72% AUC using a sequence length of 2, compared to 27% for Delta Descriptors 
and 2% for SeqSLAM, while reducing the deployment time from about an hour to just a minute.

4. **Datasets and Evaluation**: The method was tested on large benchmark datasets 
like Nordland and Oxford RobotCar, showing robust performance under varying seasonal,
 weather, and lighting conditions.

5. **Flexibility**: DSS can utilize different sources of motion estimation 
(e.g., visual odometry, radar odometry, LiDAR) and is designed to work with query traversals of
 any size without needing velocity data.

Overall, DSS represents an advancement in sequence-based place recognition, 
providing a trainable, efficient, and accurate approach suitable for real-world autonomous driving applications.
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
                  <div className="markdown">
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
                  <div className="mt-20 mb-4">
                    <Image src={FeaturesElement4} alt="" />
                  </div>
                  <div className="markdown">
                    <Markdown>{md3}</Markdown>
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
