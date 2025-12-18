import { ResearchArea } from '../types/Research';

export const researchData: ResearchArea[] = [
    {
        id: '20000003952',
        title: '3D Spatial Perception & Autonomous Navigation',
        description: `
### Overview
We conduct core 3D vision technology research to enable autonomous vehicles and robots to localize themselves and plan paths in complex environments. Our focus lies on **Multi-modal Sensor Fusion** (LiDAR, Camera, etc.) and **3D Point Cloud Processing**.

### Core Projects
**1. Point Cloud Semantic Segmentation**
*   **Goal:** Detect objects in surrounding environments from robots/vehicles and segment them at the point cloud level to infer relationships.
*   **Approach:**
    *   Optimized structure design through various 3D data processing techniques (Point-based, Voxelization, Spherical Projection).
    *   Development of robust models fusing 3D Deep Learning structures (2D CNN, 3D CNN, MLP) with distance, color, and reflectance information.

**2. Autonomous Navigation & SLAM**
*   **SLAM (Simultaneous Localization And Mapping)** for mapping and autonomous driving.
*   Understanding environments for autonomous agents.
*   **AVM (Around View Monitor)** system autonomous calibration.

**3. Sensor Fusion & Calibration**
*   **Multi-modal Sensor Fusion:** Combining Camera, LiDAR, and RGB-D sensors.
*   **Self-calibration:** Autonomous calibration using environmental information.

**4. Intelligent Vehicle Vision**
*   Multi-lane detection for ADAS and autonomous driving.
*   Object extraction for robot manipulation.
`,
        // originalUrl: 'https://ais.seoultech.ac.kr/subList/20000003952',
        imageUrl: "/assets/images/AIS_logo.png"
    },
    {
        id: '20000003950',
        title: 'Video Understanding & Robust Surveillance',
        description: `
### Overview
We analyze temporal flows and spatial features simultaneously in continuous video sequences, going beyond single images. We specifically research surveillance systems that operate robustly even in extreme environments like severe weather or camera instability.

### Core Projects
**1. Robust Unmanned Surveillance**
*   **Goal:** Robust foreground object detection in dynamic environments (snow, rain, camera shake).
*   **Approach:**
    *   **Spatio-temporal Network:** Separating/combining spatial and temporal networks to increase computational efficiency.
    *   **Background Transformation:** Using classical techniques to transform background images before deep learning input for data augmentation and performance improvement.

**2. Scene & Situation Understanding**
*   **Goal:** Beyond object detection, inferring **Relationships** between objects to understand the situation.
*   **Challenges:** Solving the problem of exponential increase in relationships with more objects; Algorithms to determine the number and degree of ambiguous relationships.
*   **Related Research:** Unmanned surveillance using Environment Graphs.

**3. Environmental Understanding**
*   Continuous video-based environment understanding.
*   Robust unmanned surveillance technology using multi-deep learning structures.
`,
        // originalUrl: 'https://ais.seoultech.ac.kr/subList/20000003950',
        imageUrl: "/assets/images/AIS_logo.png"
    },
    {
        id: '20000003951',
        title: 'Vision-based Deep Reinforcement Learning',
        description: `
### Overview
Beyond the limits of traditional Supervised Learning, we research methodological innovations where Reinforcement Learning (RL) agents independently process images and find optimal algorithm parameters.

### Core Projects
**1. RL-based Image Processing**
*   **Goal:** Automating and enhancing existing image processing algorithms by applying reinforcement learning.
*   **Approach:**
    *   Defining image processing as a **'One-step Action'** to construct the algorithm.
    *   Replacing the **Next State** with random image inputs to increase training efficiency.
    *   **Unsupervised / Reward Decision:** Researching techniques to determine rewards using evaluation models even in environments without label data.

**2. Hyperparameter Optimization**
*   Auto-tuning of optimal parameters based on Deep Reinforcement Learning.
`,
        // originalUrl: 'https://ais.seoultech.ac.kr/subList/20000003951',
        imageUrl: "/assets/images/AIS_logo.png"
    },
    {
        id: '20000005461',
        title: 'Pattern Recognition & Industrial AI',
        description: `
### Overview
We research applied AI technologies that recognize and generate specific patterns, such as Unstructured Scene Text Recognition (STR) and Defect Detection in manufacturing sites.

### Core Projects
**1. Scene Text Recognition (STR)**
*   **Goal:** Improving recognition performance for unstructured text (Curved, Blurred, Perspective).
*   **Approach:**
    *   **Feature Extraction Optimization:** Utilizing CTC, Attention techniques, and **GNN (Graph Neural Network)**.
    *   **Image Restoration & Generation:** Improving recognition rates by regularizing unstructured text using **GAN** and **Unsupervised methods**.

**2. Industrial Machine Vision**
*   **2D/3D Inspection** and Defect Detection/Recognition.
*   **3D Measurements** based on environmental information.
`,
        // originalUrl: 'https://ais.seoultech.ac.kr/subList/20000005461',
        imageUrl: "/assets/images/AIS_logo.png"
    },
    {
        id: '20000005465',
        title: 'Research Equipment',
        description: 'Details about research equipment will be updated.',
        // originalUrl: 'https://ais.seoultech.ac.kr/subList/20000005465',
        // imageUrl: "/assets/images/AIS_logo.png"
    }
];
