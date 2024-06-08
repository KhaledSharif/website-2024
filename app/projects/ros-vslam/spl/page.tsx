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
                      <BreadcrumbLink href="/projects/ros-vslam">Visual SLAM</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                      Sequential Place Learning
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>🏫 Sequential Place Learning (SPL)</div>
                  </CardTitle>
                  <CardDescription>
                    <div>
                      Learn how robots simultaneously localize and map unknown worlds visually
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>

                  <div className="mt-1 mb-4">
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
