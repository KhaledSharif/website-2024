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
import FeaturesElement3 from "@/public/images/auto-nav.jpg";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md1 = `
The following group of documents discusses various advancements 
in autonomous navigation, focusing 
on lidar-based place recognition and localization, unsupervised 
anomaly detection techniques, neural 
radiance fields for scene understanding, real-time LiDAR SLAM 
addressing geometry degeneracy, and 
qualitative spatial SLAM. These documents collectively contribute 
to the development of advanced autonomous navigation systems
by exploring novel methodologies in lidar-based perception, 
anomaly detection, scene understanding, 
real-time SLAM, and qualitative spatial mapping, each aiming to 
enhance system robustness, efficiency, 
and adaptability.

#### Lidar-Based Place Recognition and Localization
The first document provides an extensive overview of state-of-the-art 
methods for lidar-based place recognition and localization. It emphasizes 
recent advancements in feature extraction techniques, loop closure detection, 
mapping and localization systems, handling large-scale environments, and dataset 
utilization. The focus is on the importance of semantic information and deep learning 
for robust performance under challenging conditions.

#### Unsupervised Anomaly Detection
The second document introduces SAM-LAD (Logical and Structural Object 
Matching for Anomaly Detection), a framework that addresses unsupervised 
anomaly detection in images by focusing on both logical and structural anomalies. It 
leverages object matching techniques, transformer-based architectures for efficient 
feature extraction, and an anomaly measurement module to compute anomaly scores.

#### Neural Radiance Fields for Autonomous Driving
The third document offers a comprehensive overview of neural radiance 
fields (NeRF) and implicit representations and their applications in autonomous 
driving. It highlights the use of these techniques for perception enhancements, 
localization, mapping, and simulation testing, showcasing improvements in scene 
understanding and object detection capabilities.

#### Real-Time LiDAR SLAM with Geometry Degeneracy
The fourth document presents a real-time LiDAR intensity image-based 
SLAM system designed to overcome geometric degeneracy challenges. It emphasizes 
the use of direct feature extraction from intensity images, joint optimization 
for scan-to-map residuals, and pose graph optimization for accurate trajectory 
estimation in unstructured environments.

#### Qualitative Spatial SLAM
The fifth document introduces a novel approach to qualitative spatial 
SLAM that utilizes ternary calculus LR for spatial representation, 
incorporates motion models into qualitative estimation, and employs 
efficient inference frameworks with data propagation analysis. This method aims 
at improving complexity and performance compared to state-of-the-art methods 
in low-compute platforms.


---



### Review of Lidar-Based Place Recognition and Localization
##### arXiv 2306.10561
#### Introduction

Lidar-based place recognition and localization plays a crucial role in autonomous 
navigation, enabling robots to understand their environment and maintain spatial 
awareness. This paper provides an extensive overview of state-of-the-art methods 
for lidar-based place recognition and localization, emphasizing advancements 
in recent years.


#### 1. Feature Extraction Techniques
- **Intensity Images**: Utilizing intensity information from laser scans.
- **Histograms**: Employing Normal Distributions Transform (NDT) histograms for loop closure detection.
- **Segmentation**: Segmenting point clouds into meaningful regions for robust mapping and localization.
- **Descriptor Learning**: Training neural networks to learn discriminative descriptors for place recognition.

#### 2. Loop Closure Detection
- **Overlap-based Methods**: Computing similarity between scans using rotation-invariant models or parallel semantic embedding.
- **Semantic-Based Approaches**: Leveraging semantic information from lidar data for enhanced accuracy and robustness.
- **Graph-based Techniques**: Utilizing graphs to represent relationships between scans for improved localization.

#### 3. Mapping and Localization Systems
- **SLAM**: Integrating lidar data with other sensors like IMUs or cameras in real-time systems.
- **ICP Optimization**: Employing Iterative Closest Point (ICP) algorithms for pose graph optimization.
- **G2O Frameworks**: Utilizing Graph-Based Optimization for efficient map creation and robot localization.

#### 4. Large-Scale Environment Handling
- **Outdoor Applications**: Addressing challenges like varying terrains, urban settings, and GPS-denied environments.
- **Underground Environments**: Developing strategies for mapping and localizing in confined spaces with unique lighting conditions.

#### 5. Dataset Utilization
- **Benchmark Datasets**: Leveraging datasets like KITTI, Oxford RobotCar, and Mulran to evaluate methods.
- **Semantic Scene Understanding**: Enhancing performance by incorporating semantic information from lidar data.

#### Conclusion

The advancements in lidar-based place recognition and localization have significantly improved the autonomy of robots navigating various environments. Key findings include the effectiveness of deep learning techniques for feature extraction and descriptor learning, as well as the importance of semantic information in enhancing robustness against environmental challenges. Future work should focus on improving real-time performance, scalability for large-scale environments, and developing methods that can operate reliably under challenging conditions like GPS-denied areas or complex urban settings.

#### Future Work

- **Integration with Other Sensors**: Combining lidar data with cameras and IMUs to improve localization accuracy.
- **Enhanced Semantic Understanding**: Developing more sophisticated semantic models for better scene representation.
- **Real-Time Performance Optimization**: Improving computational efficiency without compromising on the quality of recognition and localization.



---




### Unsupervised Anomaly Detection using Logical and Structural Object Matching
##### arXiv 2406.00625
#### Introduction
The proposed framework, SAM-LAD, is designed to address unsupervised anomaly detection in images by focusing on both logical and structural anomalies. It leverages object matching techniques and utilizes a transformer-based architecture for efficient feature extraction and processing.

#### 1. Object Feature Extraction
- **Feature Maps:** Utilizes a pre-trained feature extractor (DINOV2) to generate high-dimensional feature maps from input images.
- **Upsampling:** Applies the FeatUp operation with an \(8\times\) upsampling factor to restore spatial information lost during convolution.

#### 2. Object Matching Model (OMM)
- **Dynamic Channel Graph Attention (DCGA):** Enhances responsiveness between objects and channels, facilitating global representation extraction through graph attention operations.
- **Object Descriptor Vectors:** Extracted from object feature maps using pooling techniques, then matched for anomaly detection.

#### 3. Anomaly Measurement Module (AMM)
- **Optimal Matching:** Uses Sinkhorn algorithm to compute soft assignment matrices indicating correspondences between objects in query and reference images.
- **Anomaly Score Calculation:** Computes matching and non-matching score maps by analyzing feature differences across multiple reference images, estimating normal distributions for anomaly detection.

#### 4. Evaluation
- **Datasets Comparison:** Evaluated on MVTec LOCO AD, MVTec AD, and DigitAnatomy datasets, demonstrating superior performance in both logical and structural anomaly detection.
- **Quantitative Metrics:** Achieves high AUROC scores across different categories, showcasing robust detection capabilities.

#### Conclusion:
SAM-LAD showcases a novel approach to unsupervised anomaly detection by effectively matching objects in images for logical and structural anomalies. Its transformer-based architecture, object matching techniques, and anomaly measurement module enable competitive performance on benchmark datasets. Future work could focus on enhancing scalability for larger datasets and improving real-time inference speed.

#### Future Work:
- **Scalability Improvements:** Developing more efficient algorithms to handle higher resolution images and larger dataset sizes.
- **Real-Time Implementation:** Optimizing the framework for faster processing without compromising detection accuracy, aiming for industrial application scenarios.



---





### NeRFs, Implicit Representations, & Autonomous Driving
##### arXiv 2404.13816

#### Introduction
The research field of autonomous driving has seen significant advancements with the integration of neural radiance fields (NeRF) and implicit representations. These techniques enable more realistic scene modeling, efficient data representation, and improved decision-making capabilities for self-driving vehicles. This overview highlights recent developments, methodologies, and applications in this domain.


#### Neural Radiance Fields
- **Representation**: Utilizes deep learning models to encode scenes as continuous functions that map spatial coordinates to color and density.
- **Training**: Typically involves optimizing a loss function using ground truth images or point clouds for accurate scene reconstruction.
- **Applications**:
  - **Inverse Rendering**: Enables the synthesis of novel views from existing camera inputs, enhancing perception capabilities.
  - **Localization and Mapping (SLAM)**: Provides robust visual odometry and dense mapping in dynamic environments.

#### Implicit Representations
- **Signed Distance Fields (SDFs)**
- **Neural Implicit Representations**
- **Applications**:
  - **Scene Understanding**: Enables vehicles to interpret complex urban scenes with high fidelity.
  - **Object Detection and Tracking**: Improves the accuracy of perceiving moving objects in real-time.

#### Integration into Autonomous Driving
- **Perception Enhancements**: Utilizes advanced scene representations for improved object recognition, tracking, and environmental understanding.
- **Localization**: Employs neural techniques for more accurate vehicle positioning within large-scale environments.
- **Simulation and Testing**: Facilitates the development of realistic driving scenarios through synthetic environment generation.

## Conclusion
Neural radiance fields and implicit representations have revolutionized autonomous driving by enabling more sophisticated scene modeling, efficient data handling, and enhanced decision-making. Key findings include improved localization accuracy, robust object detection, and the ability to generate highly detailed virtual environments for simulation and testing. Future work aims at refining these techniques for real-world deployment, focusing on scalability, computational efficiency, and integration with existing automotive systems.

## Future Work
- **Scalability**: Developing methods that can handle larger scenes and more complex urban layouts efficiently.
- **Real-Time Processing**: Enhancing the speed of neural models to support continuous operation in dynamic environments.
- **Interoperability**: Improving the compatibility between different autonomous driving platforms and systems.



---







### Addressing Geometry Degeneracy in LiDAR SLAM
##### arXiv 2301.09257
#### Introduction

This paper presents a real-time LiDAR intensity image-based simultaneous localization and mapping (SLAM) system designed to overcome geometric degeneracy challenges in unstructured environments. Traditional methods relying solely on geometric features from point clouds can struggle in environments lacking distinctive structures, leading to poor odometry performance.


#### Front-end: Intensity Odometry
- **Feature Extraction:** Directly extracts feature points from intensity images generated by LiDAR.
- **Scan Registration:** Matches and registers consecutive frames using these extracted 3D features, reducing computational cost compared to processing full point clouds.

#### Back-end: Map Optimization & Pose Graph Optimization
- **LiDAR Bundle Adjustment (BA):** Jointly optimizes scan-to-map residuals for plane features and LiDAR BA residuals to correct drift.
- **Scan-to-Map Matching:** Utilizes an incremental 3D k-d Tree for efficient matching of feature points with map planes, enhancing accuracy in flat areas by incorporating ground plane constraints.

#### Pose Graph Optimization
- Builds a pose graph using optimized results from the back-end to refine trajectory estimates and correct drift over time.
- Keyframes are selected based on distance criteria between scans to maintain an accurate representation of the environment's structure.

#### Conclusion

The proposed method demonstrates real-time performance, high accuracy in various environments, robustness against illumination changes, and effective handling of unstructured scenes. Future work could involve integrating more advanced feature extraction techniques from intensity images for improved environmental adaptability, further optimizing back-end algorithms to reduce computational costs while maintaining accuracy, and enhancing loop closure detection capabilities for long-term navigation.

#### Key Findings
- The direct integration of LiDAR intensity information into SLAM significantly improves system performance in unstructured environments.
- Joint optimization of scan-to-map residuals with LiDAR BA effectively corrects drift, enhancing trajectory accuracy.
- Pose graph optimization using the back-end results further refines the final trajectory.

#### Future Improvements
- Enhancing feature extraction from intensity images to better handle dynamic and complex scenes.
- Optimizing computational efficiency in both front-end and back-end processes for broader application scenarios.



---








### Qualitative Spatial SLAM
##### arXiv 2302.08735
#### Introduction

The paper presents an innovative approach to qualitative spatial Simultaneous Localization And Mapping (SLAM) that utilizes a natural, general formulation to achieve several advancements. The method incorporates a motion model into qualitative estimation for improved performance and run-time efficiency, while also enabling the use of various space partitions and underlying SLAM solvers. A fast approximated algorithm with minimal performance compromise is introduced alongside a sampling-based global non-linear algorithm without initialization requirements.

#### Qualitative Spatial Representation
- Utilizes ternary calculus LR to represent spatial relationships between landmarks.
  
#### Inference Framework
- Develops a factor graph representation for data propagation and efficient composition-based inference.
- Employs an information decay model to predict qualitative data propagation through the graph topology.

#### Fast Approximation Algorithm
- An optimized algorithm that significantly reduces computational complexity while maintaining high estimation accuracy.

#### Topological Information Propagation Analysis
- Simulates scenarios with complex qualitative factor graphs, analyzing how data propagates between unseen and seen landmark triplets.
- Validates an information decay model for predicting quantitative propagation scores based on graph topology.

#### Conclusion

The proposed approach to qualitative SLAM offers improvements in complexity and performance compared to state-of-the-art methods. It demonstrates practical localization and mapping capabilities using low-compute platforms where exact metric locations are not essential. Future research directions include handling recognition errors, 3D geometry, active planning, and developing a comprehensive dataset for qualitative SLAM.

#### Future Work

- Enhancing the method's robustness to recognition errors.
- Investigating applications with complex volumetric landmarks and 3D geometry.
- Expanding towards practical low-cost autonomous agent systems through advanced active qualitative planning techniques.





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
                      <BreadcrumbLink href="/notes">Notes</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Autonomous Navigation</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>🧭 Autonomous Navigation</div>
                  </CardTitle>
                  <CardDescription>
                    <div>
                      An overview of the state of the art in SLAM research
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
