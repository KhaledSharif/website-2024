The field of Simultaneous Localization and Mapping (SLAM) has seen significant advancements, particularly in dense systems that leverage hybrid representations such as signed distance fields. This review aims to provide an overview of recent developments in efficient dense SLAM systems, focusing on methodologies that enhance real-time performance while maintaining high accuracy.

---

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

---

Recent advancements in efficient dense SLAM systems have significantly improved the capabilities of robots and autonomous vehicles in understanding their environment. This review highlights the ongoing evolution in SLAM technology, emphasizing the importance of efficient algorithms that can handle complex scenes while maintaining real-time performance. As research continues to push boundaries, we anticipate further innovations that will enable even more advanced autonomous systems capable of navigating challenging environments with greater precision and reliability.

---

### Dense Visual SLAM with 3D Gaussian Splatting
##### arXiv 2311.11700

#### Introduction
The paper introduces GS-SLAM, a novel approach that utilizes 3D Gaussian scene representation for dense RGB-D SLAM, marking a significant advancement by integrating the fast splatting rendering technique. This method aims to balance efficiency and accuracy in real-time camera pose estimation and mapping. GS-SLAM is designed to reconstruct new observed scenes efficiently and improve previously mapped areas by employing an adaptive expansion strategy that adjusts 3D Gaussian elements dynamically.

#### 3D Gaussian Scene Representation
GS-SLAM represents the scene using a set of 3D Gaussians, each defined by position, covariance matrix, opacity, and spherical harmonics coefficients for color representation. This method provides an explicit geometry structure and allows for efficient rendering through differentiable splatting techniques. The 3D Gaussians are projected onto a 2D image plane for rendering purposes, using alpha blending to combine the contributions of different Gaussians in perspective space.

#### Adaptive 3D Gaussian Expansion Strategy
The adaptive expansion strategy is crucial for handling dynamic environments where new geometry needs to be quickly integrated into the map without compromising accuracy. This involves adding or deleting Gaussians based on their reliability and relevance to current observations, ensuring that only accurate information contributes to the scene representation. The selection process uses criteria such as depth consistency and cumulative opacity thresholds to identify reliable Gaussians for inclusion in the mapping process.

#### Coarse-to-Fine Camera Tracking
GS-SLAM employs a coarse-to-fine approach for camera tracking, starting with low-resolution image analysis for initial pose estimation followed by refinement using high-resolution rendering of selected Gaussians. This technique helps reduce runtime and improves the accuracy of pose estimations by focusing on reliable areas that contribute positively to the optimization process.

#### Conclusion
GS-SLAM presents a significant advancement in dense RGB-D SLAM by leveraging 3D Gaussian scene representation with differentiable splatting techniques, enabling real-time performance without sacrificing mapping quality or detail. The adaptive expansion strategy and coarse-to-fine tracking approach contribute to robust estimation and efficient runtime, making it competitive with state-of-the-art methods on RGB-D datasets like Replica and TUM-RGBD.

---

### Monocular Sparse Tracking and Gaussian Mapping
##### arXiv 2405.06241

#### Introduction
This paper presents MGS-SLAM, a novel framework for Visual SLAM that leverages Gaussian Splitting with sparse visual odometry. Unlike traditional Gaussian Splatting methods which rely on depth maps from RGB-D cameras and struggle with tracking in larger scenes, MGS-SLAM integrates advanced sparse visual odometry to track camera poses using only RGB images. This integration enhances robustness and eliminates the dependency on depth sensors. The method also introduces a pre-trained Multi-View Stereo (MVS) network for generating priori depth maps, which are refined through a novel geometric smooth loss to minimize inaccuracies and ensure better alignment with correct geometries. Additionally, it proposes the Sparse-Dense Adjustment Ring (SDAR) strategy for scale consistency between sparse visual odometry and dense Gaussian mapping.

#### Methodology
The MGS-SLAM framework is structured into several key components:

- **Frontend Tracking**: Utilizes Deep Patch Visual Odometry (DPVO) to track camera poses and build a sparse point cloud map from RGB streams, providing coarse camera poses for the backend.
   - The DPVO algorithm optimizes patch graph errors using bundle adjustment with optical flow correction, refining both camera poses and patch depths iteratively.
   
- **Multi-View Priori Depth Estimation**: A pre-trained MVS network estimates priori depth maps from sparse odometry keyframes. The network uses a coarse-to-fine strategy with Feature Pyramid Network (FPN) for feature extraction and employs scale-invariant loss to train on the ScanNet dataset, ensuring geometric consistency in depth estimation.
   
- **3D Gaussian Splatting Mapping**: The backend utilizes differentiable rendering of 3D Gaussians for dense scene representation. It optimizes coarse camera poses and a sparse point cloud map to construct a photorealistic Gaussian map, incorporating four mapping optimization losses (photometric loss, depth geometric loss, depth smooth regularization loss, and isotropic loss) to improve rendering quality and geometric accuracy.
    - The proposed system uses the initial camera pose from DPVO as a starting point for Gaussian mapping in the backend, which then undergoes iterative refinement through backpropagation of photometric and depth losses.
    
- **System Components**:
      - System initialization with 8 frames to fulfill constant velocity motion model requirements.
      - Keyframe selection based on covisibility criteria ensures efficient mapping without redundant data processing.
      - Sparse-Dense Adjustment Ring (SDAR) strategy corrects the geometry of priori depth maps from MVS and aligns scale with sparse point cloud map for consistent tracking and mapping across scales.
    
#### Conclusion
MGS-SLAM demonstrates superior performance in camera tracking accuracy on both TUM and Replica datasets, outperforming other monocular methods by 40% and achieving state-of-the-art results. It also excels in novel view rendering quality compared to RGB-D input systems. The proposed system's runtime is competitive with Gaussian Splatting-based SLAM methods, emphasizing the effectiveness of integrating sparse visual odometry with Gaussian mapping for a more robust and accurate SLAM framework that operates efficiently on larger datasets without depth map input.

---

### Anti-Dynamics Two-Stage SLAM Approach
##### arXiv 2302.11747

#### Introduction
This paper introduces Amos-SLAM, a novel anti-dynamics two-stage SLAM approach designed to address the challenges posed by dynamic environments. Traditional SLAM systems struggle with accurate localization when dynamic objects are present in the scene. While learning-based methods can detect known moving objects, they falter with unknown ones. Geometry-based approaches have limited success due to residual effects of unidentified dynamics on location estimation. Amos-SLAM proposes a two-stage method that separates and processes prior dynamic objects through instance segmentation and non-prior dynamic objects using super-pixel extraction and geometric clustering, leading to improved accuracy over state-of-the-art methods in various experimental scenarios.

#### Methodology
The Amos-SLAM approach is structured into two key stages:

1. **Instance Segmentation for Prior Dynamic Objects**: 
   - Utilizes YOLACT, a real-time instance segmentation network, to identify and exclude prior dynamic objects from the scene in every frame. This ensures continuous updates without being affected by dynamic points until a new keyframe is established.
   
2. **Visual Geometry Segmentation for Non-Prior Dynamic Objects**: 
   - Employs super-pixel extraction and geometric clustering to determine potential motion regions based on color and depth information, leading to refined motion segmentation and dynamic object removal.

3. **Dynamic Judgment of Potential Movement Areas**: 
   - Uses reprojection error as a condition for extracting potential moving regions in the first stage. In the second stage, improved motion judgment through epipolar geometric constraints is applied to confirm dynamic areas and remove them from the scene.
   
4. **Pose Estimation**: 
   - Adopts a model generation method that considers multiple models for initial pose estimation, ensuring robustness against drift in dynamic environments. This involves using feature points matching with LK optical flow, sparse corner features tracking, and a uniform motion model of the camera to calculate an accurate initial pose estimate.
   
5. **Experimental Comparison**: 
   - The method is evaluated on multiple low and high dynamic sequences from the TUM dataset, demonstrating superior accuracy across various metrics compared to other state-of-the-art SLAM methods in both static and highly dynamic scenes.

#### Conclusion
Amos-SLAM presents a significant advancement in visual SLAM for dynamic environments by effectively handling prior and unknown dynamic objects through a two-stage segmentation strategy. The approach outperforms existing direct and feature-based dynamic SLAM methods, showcasing its robustness and accuracy in real-time applications with dynamic backgrounds. This innovative method paves the way for more reliable navigation in natural environments where static assumptions are frequently violated by moving elements. 