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
import FeaturesElement3 from "@/public/images/slam-overview.jpg";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md1 = `
The following group of documents discusses advancements in Simultaneous Localization And Mapping (SLAM) systems, focusing on various aspects such as real-time performance, integration of semantic information, exploitation of environmental structure, and evaluation across different platforms. Each document highlights unique methodologies and findings that collectively contribute to the development of more accurate, efficient, and versatile SLAM solutions.
These documents collectively showcase a range of approaches and advancements in SLAM technology, from real-time multi-object mapping to leveraging environmental structure and deep learning techniques. They highlight the importance of semantic information, efficient algorithms, and robustness across different platforms for enhancing localization and mapping capabilities in dynamic environments.


---


### Review of Robust Visual SLAM Systems
##### arXiv 2209.10710

#### Introduction

The field of robotics has seen significant advancements, particularly in the area of Simultaneous Localization and Mapping (SLAM). This paper provides an extensive review of robust visual SLAM systems that address challenges such as dynamic environments, long-term mapping, and efficient data management. The focus is on methodologies that enhance system reliability, accuracy, and adaptability.

#### Key Components
- **Localization**: Techniques for estimating the robot's position in space.
- **Mapping**: Methods for constructing a map of the environment.
- **Data Association**: Algorithms to match sensor measurements with existing or new features in the map.
- **Optimization**: Strategies to refine the estimated trajectory and map.

#### Challenges Addressed
1. **Dynamic Environments**
   - **Detection and Tracking**: Advanced algorithms like YOLOv3, YOLOv4, and others for real-time object detection and tracking.
   - **Background Reconstruction**: Methods such as StaticFusion for separating static from dynamic elements in the scene.

2. **Long-Term Mapping**
   - **Efficient Data Management**: Approaches to handle large datasets over extended periods without losing accuracy or efficiency.
   - **Persistence Reasoning**: Techniques like Panoptic Multi-SDFs for maintaining consistency across multiple maps and time frames.

3. **Robustness**
   - **Noise Reduction**: Motion removal techniques to filter out dynamic elements, improving the stability of SLAM systems in cluttered environments.
   - **Multi-Modal Integration**: Combining visual data with inertial measurements or other sensors for enhanced accuracy and reliability.

#### Future Work
- **Integration of Semantic Information**: Enhancing SLAM systems with semantic understanding to improve mapping quality and navigation capabilities.
- **Adaptive Learning**: Developing algorithms that can learn from new environments and adapt their behavior accordingly, improving system generalizability.
- **Energy Efficiency**: Optimizing computational resources for real-time operation in resource-constrained devices.

#### Conclusion

Robust visual SLAM systems have made significant strides in addressing the challenges of dynamic environments, long-term mapping, and efficient data management. The integration of advanced object detection algorithms, background reconstruction techniques, and multi-modal sensor fusion has led to more accurate and reliable systems capable of operating autonomously over extended periods. Future work aims at enhancing system adaptability through learning mechanisms and optimizing energy consumption for broader deployment in real-world applications.

This review highlights the ongoing advancements in visual SLAM technology, emphasizing the importance of continuous innovation in addressing emerging challenges and expanding the capabilities of autonomous robots.


---




### Optimal Camera Placement for Visual Sensor Networks
##### arXiv 2309.10698




#### Introduction

The placement of multiple visual sensors, such as cameras, is crucial for effective coverage in various applications including surveillance, autonomous navigation, and robotics. This paper presents a novel approach to optimize camera placement using concave optimization techniques, specifically focusing on the Schur-convexity property and its implications for sensor networks.



#### 1. Problem Formulation
The problem is formulated as an optimization task where the objective function represents the overall coverage or utility of the network. The key elements include:
- **Objective Function**: Defined to maximize coverage, minimize redundancy, or optimize some other metric relevant to the application.
- **Constraints**: Ensuring that each camera has a unique field of view and avoiding overlapping coverage areas.

#### 2. Schur Convexity
The concavity property of the objective function is leveraged through Schur convexity. This allows for efficient optimization by transforming the problem into one where the solution can be found using known algorithms designed for concave functions.

- **Property 1**: The function \(f_{\mathrm{E}}\) is defined and its properties are established.
- **Property 2**: The function's behavior under linear combinations of inputs is analyzed, showing how it behaves when different camera configurations are combined.
- **Property 3**: The Schur product (Hadamard product) is used to combine the effects of individual cameras in a way that preserves concavity.
- **Property 4**: The concavity property ensures that the function's value at any convex combination of inputs is greater than or equal to the corresponding weighted sum of values, facilitating optimization.

#### 3. Optimization Algorithm
An algorithm based on these properties is developed to find an optimal placement for cameras in a network. This involves:
- **Initialization**: Setting up initial camera positions.
- **Iteration**: Adjusting camera positions iteratively while ensuring Schur convexity constraints are met.
- **Convergence**: Stopping the process when the improvement in coverage or utility falls below a predefined threshold.

#### 4. Validation and Comparison
The proposed method is validated through simulations and real-world applications, comparing its performance against existing approaches to highlight improvements in efficiency and effectiveness of camera placement.

#### Conclusion

This paper demonstrates that by leveraging Schur convexity properties, an efficient optimization framework can be developed for the optimal placement of visual sensors. Key findings include:
- The concavity property significantly simplifies the optimization process.
- Improved coverage and reduced redundancy are achieved compared to traditional methods.
- Future work could explore integrating more complex constraints or adapting the approach to dynamic environments.


---




### Panoramic Camera-Based Visual SLAM System
##### arXiv 2401.10560

#### Introduction

This paper introduces an innovative panoramic camera-based visual Simultaneous Localization And Mapping (SLAM) system designed to overcome limitations of traditional feature-based methods, particularly in utilizing image information effectively and resolving scale ambiguity issues in monocular cameras. The proposed system integrates a panoramic triangulation module for enhanced map point accuracy, a depth completion network for improved depth estimation, and leverages dense 3D point clouds derived from deep learning techniques to mitigate scale drift and enhance pose estimation.

#### Key Components
- **Panoramic Triangulation Module**: Captures more features in panoramic images, improving keyframe constraints.
- **Depth Completion Network**: Fuses RGB images with sparse depth data for dense depth map generation.
- **Dense Depth Application Module**: Utilizes the dense depth maps for enhanced SLAM performance.

#### Experimental Setup
- **Dataset**: Constructed using Carla simulation environment, featuring diverse urban scenes and lighting conditions.
- **Hardware**: Intel Core i7 CPUs and NVIDIA GPUs for processing.
- **Evaluation Metrics**: Scale Factor (SF) and Root Mean Squared Error (RMSE) of Absolute Trajectory Error (ATE).

#### Results
- **Feature Detection & Matching**: Panoramic images offer significantly more features, leading to stronger constraints between keyframes.
- **Depth Completion**: Sparse depth points are effectively completed into dense maps with high accuracy.
- **Localization and Mapping**: Improved scale accuracy through dense depth completion, enhancing trajectory estimation.

#### Conclusion

The proposed panoramic camera-based SLAM system demonstrates superior performance in feature detection, depth estimation, and localization compared to traditional methods. Key findings include enhanced stability and robustness due to increased feature observation, accurate dense depth maps for improved pose estimation, and effective resolution of scale ambiguity issues. Future work could focus on further optimizing the depth completion network and exploring real-world applications with more complex environments.


---




### Global Optimization Techniques for Relative Pose Estimation
##### arXiv 2302.11614

#### Introduction

This document provides an overview of global optimization techniques used for solving the relative pose estimation problem in computer vision, focusing on recent advancements and methodologies. The introduction highlights the importance of accurate relative pose estimation in various applications such as robotics, augmented reality, and 3D reconstruction.

Key papers that have contributed to this field:

1. **Certifiably Globally Optimal Solutions**: Papers like "A certifiably globally optimal solution to the non-minimal relative pose problem" by Jesus Briales et al., and "A tighter relaxation for the relative pose problem between cameras" by Mercedes Garcia-Salguero et al., present algorithms that guarantee global optimality in solving the relative pose estimation problem.

2. **Relaxation Techniques**: Contributions such as "Certifiably optimal mutual localization with anonymous bearing measurements" by Yingjian Wang et al., and "An efficient solution to non-minimal case essential matrix estimation" by Ji Zhao, utilize relaxation techniques to simplify the optimization problem while ensuring global optimality.

3. **Global Optimization Algorithms**: Papers like "Globally optimal inlier set maximisation for simultaneous camera pose and feature correspondence" by Dylan Campbell et al., and "Optimal relative pose with unknown correspondences" by Johan Fredriksson et al., introduce algorithms that optimize the estimation of relative poses under various constraints.

4. **Preconditioned Eigensolvers**: David M Rosen's work on accelerating certifiable estimation showcases advancements in optimization techniques, specifically focusing on preconditioned eigensolvers to enhance computational efficiency and accuracy.

5. **Manifold Optimization**: Pierre-Antoine Absil et al.'s "Trust-region methods on Riemannian manifolds" introduces a framework for optimization problems defined on smooth manifolds, which is particularly relevant for relative pose estimation in computer vision applications.

6. **Numerical Optimization and Linear Algebra**: Works by Jorge Nocedal and Stephen Wright provide foundational knowledge on numerical optimization techniques, while G. Golub and C. Van Loan's "Matrix Computations" offer insights into linear algebra methods that underpin many of the algorithms discussed.

#### Conclusion

The document concludes with a summary of key findings:

- Global optimization techniques have significantly advanced relative pose estimation in computer vision.
- Relaxation methods, preconditioned eigensolvers, and manifold optimization are pivotal in achieving global optimality while maintaining computational efficiency.
- Future work could focus on integrating these techniques into real-time systems for enhanced performance and scalability.



---




### Deep Patch Visual Odometry
##### arXiv 2301.08930

#### Introduction

This document provides an overview of recent advancements in deep patch visual odometry, focusing on methodologies that enhance camera pose estimation and scene reconstruction from monocular video sequences. Key contributions include novel approaches to depth map initialization, multi-scale patch warping photometric loss for improved geometry consistency, and efficient optimization strategies for both tracking and mapping tasks.

#### Feature Volume Initialization
- **Initialization Strategy**: Parameters of feature volumes are initialized under a normal distribution with mean 0 and standard deviation 0.001.
  
#### Post Optimization
- **Module Description**: An optional post-optimization module is introduced to refine the implicit scene representation, fixing camera poses using all keyframes for enhanced geometry and color consistency.

#### Ablation on Warping Loss
- **Configuration Comparison**: Evaluates different configurations of patch-wise warping loss to determine optimal parameters for depth map initialization.
  
#### Two Threads for Tracking and Mapping
- **Thread Configuration**:
  - **Tracking Thread**: Optimizes camera poses with a focus on high gradient pixels.
  - **Mapping Thread**: Simultaneously optimizes cameras, scene parameters, and applies smoothness regularization.

#### Conclusion

The methodologies presented in this document significantly advance the state-of-the-art in deep patch visual odometry by improving depth map initialization through multi-scale patch warping loss, enhancing optimization strategies for tracking and mapping tasks, and refining implicit scene representations. Key findings include improved accuracy and efficiency in camera pose estimation and scene reconstruction.

#### Future Work
- **Memory Optimization**: Further reducing memory consumption while maintaining or improving performance.
- **Real-Time Implementation**: Developing faster algorithms suitable for real-time applications.
- **Robustness to Occlusions**: Enhancing methods to handle challenging scenarios with partial occlusions more effectively.



---






### Dense Neural-Based SLAM for Large-Scale Environments
##### arXiv 2209.09357

#### Introduction

This paper introduces MeSLAM, a novel dense neural-based Simultaneous Localization and Mapping (SLAM) approach designed to handle large-scale environments with low memory consumption. The method combines odometry data with joint optimization processes to achieve high accuracy in localization and mapping tasks.


#### Key Components
- **Odometry Integration**: Utilizes odometry information alongside the SLAM process for enhanced stability and precision.
- **Joint Optimization**: Optimizes both pose estimation and map construction simultaneously, improving overall system performance.
- **Network Distribution and Region Tracking**: Decomposes large scenes into manageable regions for efficient mapping. This approach allows for precise tracking and mapping in extensive environments.

#### Performance Metrics
- **Accuracy Evaluation**: ATE (Average Translation Error) of 6.6 cm on TUM RGB-D sequences, comparable to state-of-the-art methods.
- **Memory Efficiency**: Requires only 1.9 MB storage for large maps, significantly less than other leading SLAM algorithms.

#### Key Findings
- MeSLAM outperforms baseline iMAP* with an average accuracy of 11.8 cm on TUM RGB-D sequences.
- The global mapping module effectively handles large scenes by dividing them into regions for efficient processing, surpassing the original iMAP method's capabilities.

#### Future Work and Improvements
- Development of bundle adjustment techniques for a more comprehensive global map representation.
- Further optimization to enhance memory efficiency without compromising on accuracy or performance in large-scale environments.

This paper demonstrates MeSLAM as an effective solution for dense SLAM tasks, particularly suited for applications requiring high accuracy with limited computational resources. Future advancements aim to improve the system's scalability and robustness further.


---





### Review of Efficient Dense SLAM Systems
##### arXiv 2311.11700

#### Introduction

The field of Simultaneous Localization and Mapping (SLAM) has seen significant advancements, particularly in dense systems that leverage hybrid representations such as signed distance fields. This review aims to provide an overview of recent developments in efficient dense SLAM systems, focusing on methodologies that enhance real-time performance while maintaining high accuracy.


#### 1. Hybrid Representation Techniques
- **Signed Distance Fields (SDFs)**: SDFs are used for representing the environment's geometry efficiently, allowing for fast collision detection and accurate mapping.
- **Hierarchical Voxel Block Hashing**: This technique optimizes depth image integration by partitioning space into manageable blocks, improving computational efficiency.

#### 2. Real-Time Performance
- **Parallel Tracking and Mapping (PTAM)**: Utilizing parallel processing to achieve real-time performance in camera phone SLAM systems.
- **Dynamic 3D Gaussians**: Implementing dynamic view synthesis for efficient tracking and mapping with persistent Gaussian representations.

#### 3. Large-Scale Reconstruction
- **Efficient Online Surface Correction**: Techniques that enable real-time large-scale 3D reconstruction by correcting surfaces online, enhancing the scalability of SLAM systems.
- **Neural Radiance Fields (NeRF)**: Representing scenes as neural networks to synthesize views from novel angles, facilitating dense mapping and tracking.

#### 4. Integration with Depth Data
- **KinectFusion**: Real-time dense surface mapping and tracking using RGB-D data for augmented reality applications.
- **Dense Tracking and Mapping in Real-Time (DTAM)**: Utilizing dynamic models to track objects and map environments efficiently.

#### 5. Implicit Representations
- **Implicit Event-RGBD Neural SLAM**: Combining implicit representations with neural networks for efficient dense mapping from RGB-D data.
- **Gaussian Splatting**: Using Gaussian functions to represent scenes, enabling real-time rendering of dynamic scenes.

#### Conclusion

Recent advancements in efficient dense SLAM systems have significantly improved the capabilities of robots and autonomous vehicles in understanding their environment. Key findings include the effectiveness of hybrid representations like SDFs for geometry, hierarchical hashing techniques for depth image integration, and neural network-based methods for scene representation. Future work should focus on enhancing robustness to varying lighting conditions, improving scalability for large-scale environments, and integrating more sophisticated motion models for better localization accuracy.

This review highlights the ongoing evolution in SLAM technology, emphasizing the importance of efficient algorithms that can handle complex scenes while maintaining real-time performance. As research continues to push boundaries, we anticipate further innovations that will enable even more advanced autonomous systems capable of navigating challenging environments with greater precision and reliability.



---




### Object Feature Utilization in SLAM Framework
##### arXiv 2310.13256

#### Introduction

The integration of object features into Simultaneous Localization and Mapping (SLAM) systems has been explored to enhance mapping accuracy, improve high-level applications, and address challenges such as dynamic environments. This paper delves into the characteristics of object features compared with traditional geometry features, discusses their application methods in SLAM frameworks, and identifies key challenges.

#### Object Feature Characteristics
- **Richer Information**: Objects carry more detailed information than simple geometric shapes.
- **Dynamic Nature**: Objects can change shape or orientation over time, requiring robust tracking mechanisms.

#### Application Methods
1. **Feature Extraction**:
   - Utilizing deep learning for object detection and feature extraction from RGB-D data.
2. **Association Techniques**:
   - Matching features across frames to track objects dynamically.
3. **Mapping Enhancement**:
   - Incorporating object-level information into the map, improving semantic understanding.
4. **High-Level Applications**:
   - Utilizing object features for tasks like navigation and scene understanding.

#### Challenges
- **Dynamic Object Tracking**: Maintaining accurate tracking in dynamic scenes.
- **Feature Matching Robustness**: Ensuring reliable feature matching under varying conditions.
- **Integration Complexity**: Combining object information with traditional SLAM techniques efficiently.

#### Conclusion

Object features offer significant potential for enhancing SLAM systems, particularly through improved mapping accuracy and support for high-level applications. Challenges include managing dynamic objects and ensuring robust feature matching. Future work should focus on developing more efficient algorithms that can handle the complexities of real-world environments while leveraging object information effectively. Improvements in data association techniques and enhanced computational methods are key areas for future research to fully exploit the benefits of object features in SLAM frameworks.



---







### Temporal Masking: Enhancing Dynamic SLAM Algorithms
##### arXiv 2210.08350

#### Introduction

This paper introduces the concept of Temporal Masking, aimed at improving dynamic Simultaneous Localization and Mapping (SLAM) algorithms. The core idea is to selectively filter out objects of certain classes from a scene using semantic masks, thereby optimizing the performance of SLAM systems in challenging scenarios.

#### Semantic Mask Generation
- **Automatic Annotation**: A self-supervised training approach is employed for generating semantic masks.
- **Memory-based Neural Network Architecture**: A specialized model is designed to learn when and how to apply these masks effectively.

#### Temporal Masking Integration
- **Mask Application**: Masks are applied dynamically based on the motion of objects in consecutive frames, allowing for adaptive filtering during SLAM processes.

#### Evaluation Metrics
- **Unified Metric (USM)**: A metric that balances trajectory accuracy with robustness against masking-induced errors is introduced to evaluate performance comprehensively.

#### Conclusion

The Temporal Masking paradigm significantly enhances dynamic SLAM algorithms by selectively removing objects of specific classes, leading to improved trajectory accuracy and robustness in challenging environments. Future work aims at refining the decision-making process for instance-level masking and developing a method that combines semantic information with temporal context for more accurate and adaptive filtering.

This approach not only improves existing SLAM systems but also has potential applications beyond SLAM, such as in path planning algorithms where dynamic obstacles need to be avoided efficiently.



---







### Anti-Dynamics Two-Stage SLAM Based on Vision and Geometry
##### arXiv 2302.11747

#### Introduction

This paper introduces Amos-SLAM, an innovative two-stage Simultaneous Localization and Mapping (SLAM) system designed to handle dynamic environments. The approach combines instance segmentation for managing known moving objects with a combination of super-pixel clustering and k-means algorithm for dealing with unknown dynamics. By processing all frames rather than just keyframes, Amos-SLAM aims to improve localization accuracy in dynamic indoor settings.


#### Key Components
- **Instance Segmentation**: Identifies individual moving objects (prior dynamics) using instance segmentation techniques.
- **Super-Pixel Clustering and K-Means Algorithm**: Detects unknown moving objects through clustering of visual features, distinguishing them from static elements.

#### Two-Stage Process
1. **Dynamic Point Detection**:
   - Utilizes feature matching to identify dynamic points in the scene.
   - Applies epipolar constraints for more accurate detection by excluding mismatches that do not adhere to geometric constraints.
2. **Pose Estimation and Dynamic Segmentation**:
   - Generates multiple models (feature-based, sparse corner tracking, uniform motion) for robust initialization of pose estimation.
   - Removes dynamic points from the map using the detected dynamics, then performs ORB-SLAM2 tracking.

#### Evaluation
- **Dataset Selection**: Utilizes TUM dataset with low and high dynamic sequences to assess performance.
- **Accuracy Metrics**: Compares Absolute Trajectory Error (ATE), Relative Pose Error (RPE) against ground truth for evaluation.

#### Conclusion

Amos-SLAM demonstrates superior accuracy in multiple metrics across various dynamic indoor environments, outperforming current state-of-the-art methods. The approach's effectiveness is attributed to its comprehensive processing of all frames and innovative use of instance segmentation and clustering techniques. Future work could focus on enhancing the system's adaptability to rapidly changing dynamics or integrating more advanced learning algorithms for improved detection of unknown moving objects.

This paper contributes a significant advancement in dynamic SLAM, offering a robust solution for real-world applications where dynamic elements are prevalent.

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
                      <BreadcrumbPage>SLAM Overview</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>📖 SLAM Overview</div>
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
