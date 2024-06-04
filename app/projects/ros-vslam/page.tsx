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

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md1 = `
In the realm of robotics and computer vision, **Visual Simultaneous Localization and Mapping** (VSLAM) emerges as a pivotal technique for estimating the position and orientation of a robot or camera in real-time. Simultaneously, it constructs a map of the surrounding environment. This dual capability makes VSLAM particularly advantageous in scenarios where GPS is either unavailable or unreliable, such as indoor environments or urban areas with significant obstructions.
`;
const md2 = `
### Key Concepts of VSLAM

#### Visual Odometry (VO)

At the core of VSLAM is Visual Odometry (VO), a method that utilizes images captured by cameras to track the movement of key points—distinctive features within the images. By analyzing the positional changes of these key points across consecutive images, VO estimates the motion of the camera. This process is akin to the way humans perceive motion by observing how objects shift relative to one another.

#### Visual-Inertial Odometry (VIO)

To enhance the accuracy of motion estimation, Visual-Inertial Odometry (VIO) comes into play. VIO integrates visual data from cameras with motion data from an Inertial Measurement Unit (IMU). The IMU provides additional information on acceleration and angular velocity, which is particularly beneficial in environments with few distinctive visual features. By combining these data sources, VIO offers a more robust and accurate odometry estimate, making it a critical component of effective VSLAM systems.

#### Simultaneous Localization and Mapping (SLAM)

The ultimate goal of VSLAM is to build a map of the environment while concurrently estimating the robot's position within that map—a process known as Simultaneous Localization and Mapping (SLAM). SLAM employs sophisticated techniques such as loop closure, which recognizes previously seen areas to reduce map uncertainty and improve localization accuracy. This capability is essential for creating reliable and coherent maps, especially in large or complex environments.

### Advantages of VSLAM

- **Real-time Performance:** Leveraging GPU acceleration, VSLAM can process visual data at high speeds, facilitating real-time applications. This is particularly important for autonomous robots that require immediate feedback to navigate and interact with their environments.
  
- **Enhanced Accuracy:** By matching a greater number of key points and incorporating IMU data, VSLAM achieves high levels of accuracy in both localization and mapping. This ensures that robots can navigate with precision, even in challenging conditions.

- **Versatility:** VSLAM's ability to operate effectively in a variety of environments—ranging from GPS-denied indoor spaces to obstructed urban areas—underscores its versatility. This adaptability is crucial for deploying robots in diverse and dynamic settings.
`;
const md3 = `
Sequential Place Learning (SPL) is a technique designed to improve place recognition in autonomous navigation by leveraging sequential data. It addresses the limitations of traditional heuristic-based methods by using a deep learning approach that combines convolutional neural networks (CNN) and long short-term memory networks (LSTM). Here are the key features and advantages of SPL:

1. **Joint Visual and Positional Learning**: SPL integrates visual and positional data from a single traversal of an environment. This joint learning approach allows the system to learn and recognize places using both visual and positional cues simultaneously, improving robustness against changes in viewpoint and appearance.

2. **End-to-End Trainable Architecture**: The method employs a CNN to encode visual information and an LSTM to handle the sequential aspect of the data. The entire system is trained end-to-end using backpropagation through time (BPTT), which simplifies the training process and enhances performance compared to traditional methods.

3. **Efficiency and Performance**: SPL is designed to be highly efficient, reducing the computational and storage requirements typical of classical methods. It achieves higher precision and recall rates even with short temporal windows (TWs), which are critical for real-time applications.

4. **Benchmark Results**: SPL has been tested on various challenging benchmark datasets, including Oxford RobotCar, Nordland Railway, St. Lucia, and Gardens Point. It has outperformed many classical methods and achieved state-of-the-art results, including a perfect 100% recall rate at 100% precision under extreme conditions like day-night transitions.

5. **Flexible Integration with Motion Estimation**: The system can use positional data from various sources, such as visual odometry, radar odometry, LiDAR, GPS, and even synthetic time-series data, making it adaptable to different types of autonomous navigation systems.

The architecture consists of a CNN for extracting global image descriptors and an LSTM network for sequential learning. This combination allows SPL to learn the temporal structure of the data, which is crucial for accurate place recognition in dynamic environments.

DeepSeqSLAM is a method proposed to enhance sequence-based place recognition for autonomous vehicles, addressing the limitations of traditional approaches like SeqSLAM. It combines Convolutional Neural Networks (CNN) and Recurrent Neural Networks (RNN) to learn visual and positional representations from a sequence of monocular images. The key aspects of DeepSeqSLAM include:

1. **Joint Learning**: Unlike classical methods that rely on separate stages for visual matching and sequential filtering, DeepSeqSLAM jointly learns visual and positional representations, improving the efficiency and accuracy of place recognition.

2. **Architecture**: It utilizes a CNN to extract global image descriptors and an RNN to model the temporal dependencies between these descriptors, enhancing the recognition capabilities across different environmental conditions.

3. **Performance**: DeepSeqSLAM has demonstrated significant improvements over state-of-the-art methods, particularly in terms of Area Under the Curve (AUC) and deployment time. For instance, on the Nordland dataset, it achieved over 72% AUC using a sequence length of 2, compared to 27% for Delta Descriptors and 2% for SeqSLAM, while reducing the deployment time from about an hour to just a minute.

4. **Datasets and Evaluation**: The method was tested on large benchmark datasets like Nordland and Oxford RobotCar, showing robust performance under varying seasonal, weather, and lighting conditions.

5. **Flexibility**: DeepSeqSLAM can utilize different sources of motion estimation (e.g., visual odometry, radar odometry, LiDAR) and is designed to work with query traversals of any size without needing velocity data.

Overall, DeepSeqSLAM represents an advancement in sequence-based place recognition, providing a trainable, efficient, and accurate approach suitable for real-world autonomous driving applications.
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
                    <Markdown>{md1}</Markdown>
                  </div>
                  <div className="mt-6 mb-12">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          What is SLAM and why is it used in robotics?
                        </AccordionTrigger>
                        <AccordionContent className="text-justify flex flex-col gap-4 mx-8">
                          <div>
                            SLAM stands for Simultaneous Localization and
                            Mapping. It is a technique used in robotics and
                            autonomous systems to construct a map of an unknown
                            environment while simultaneously tracking the
                            position and orientation of the robot or autonomous
                            vehicle within that environment. SLAM allows robots
                            to create and update a map of their surroundings as
                            they move through an unknown environment. This map
                            can be used for navigation, path planning, and
                            obstacle avoidance. SLAM enables robots to determine
                            their precise location within the constructed map.
                            This is essential for accurate navigation and
                            decision-making.
                          </div>

                          <div>
                            By mapping and localizing simultaneously, SLAM
                            enables robots to operate autonomously without
                            relying on pre-existing maps or external positioning
                            systems like GPS, which may not be available in
                            certain environments (e.g., indoors, underground, or
                            in areas with limited satellite coverage). SLAM is
                            particularly useful for robots tasked with exploring
                            and mapping unknown environments, such as search and
                            rescue operations, planetary exploration, or
                            industrial inspection of complex structures.
                          </div>

                          <div>
                            SLAM algorithms can be broadly classified into two
                            categories: filter-based methods (e.g., Extended
                            Kalman Filter, Particle Filter) and
                            optimization-based methods (e.g., Graph-based SLAM,
                            Bundle Adjustment). These algorithms differ in their
                            mathematical formulations and computational
                            approaches, each with its own strengths and
                            weaknesses depending on the specific application and
                            constraints.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          What is the Robot Operating System (ROS)?
                        </AccordionTrigger>
                        <AccordionContent className="text-justify flex flex-col gap-4 mx-8">
                          <div>
                            SLAM stands for Simultaneous Localization and
                            Mapping. It is a technique used in robotics and
                            autonomous systems to construct a map of an unknown
                            environment while simultaneously tracking the
                            position and orientation of the robot or autonomous
                            vehicle within that environment. SLAM allows robots
                            to create and update a map of their surroundings as
                            they move through an unknown environment. This map
                            can be used for navigation, path planning, and
                            obstacle avoidance. SLAM enables robots to determine
                            their precise location within the constructed map.
                            This is essential for accurate navigation and
                            decision-making.
                          </div>

                          <div>
                            By mapping and localizing simultaneously, SLAM
                            enables robots to operate autonomously without
                            relying on pre-existing maps or external positioning
                            systems like GPS, which may not be available in
                            certain environments (e.g., indoors, underground, or
                            in areas with limited satellite coverage). SLAM is
                            particularly useful for robots tasked with exploring
                            and mapping unknown environments, such as search and
                            rescue operations, planetary exploration, or
                            industrial inspection of complex structures.
                          </div>

                          <div>
                            SLAM algorithms can be broadly classified into two
                            categories: filter-based methods (e.g., Extended
                            Kalman Filter, Particle Filter) and
                            optimization-based methods (e.g., Graph-based SLAM,
                            Bundle Adjustment). These algorithms differ in their
                            mathematical formulations and computational
                            approaches, each with its own strengths and
                            weaknesses depending on the specific application and
                            constraints.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          How does this project combine Visual SLAM and ROS?
                        </AccordionTrigger>
                        <AccordionContent className="text-justify flex flex-col gap-4 mx-8">
                          <div>
                            SLAM stands for Simultaneous Localization and
                            Mapping. It is a technique used in robotics and
                            autonomous systems to construct a map of an unknown
                            environment while simultaneously tracking the
                            position and orientation of the robot or autonomous
                            vehicle within that environment. SLAM allows robots
                            to create and update a map of their surroundings as
                            they move through an unknown environment. This map
                            can be used for navigation, path planning, and
                            obstacle avoidance. SLAM enables robots to determine
                            their precise location within the constructed map.
                            This is essential for accurate navigation and
                            decision-making.
                          </div>

                          <div>
                            By mapping and localizing simultaneously, SLAM
                            enables robots to operate autonomously without
                            relying on pre-existing maps or external positioning
                            systems like GPS, which may not be available in
                            certain environments (e.g., indoors, underground, or
                            in areas with limited satellite coverage). SLAM is
                            particularly useful for robots tasked with exploring
                            and mapping unknown environments, such as search and
                            rescue operations, planetary exploration, or
                            industrial inspection of complex structures.
                          </div>

                          <div>
                            SLAM algorithms can be broadly classified into two
                            categories: filter-based methods (e.g., Extended
                            Kalman Filter, Particle Filter) and
                            optimization-based methods (e.g., Graph-based SLAM,
                            Bundle Adjustment). These algorithms differ in their
                            mathematical formulations and computational
                            approaches, each with its own strengths and
                            weaknesses depending on the specific application and
                            constraints.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="markdown">
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
