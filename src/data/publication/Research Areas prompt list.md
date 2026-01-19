각 분야별로 포스터 이미지 생성을 위한 개별 프롬프트 목록.

---

## **분야 1: 3D Spatial AI & Autonomous Navigation**

```
# Mission
Create ONE professional poster slide for the research category: **3D Spatial AI & Autonomous Navigation** from AIS Lab.

# Research Category Overview
**Focus:** 3D Reconstruction, SLAM, Sensor Calibration, and Autonomous Driving Systems.
Research on perceiving 3D space from 2D images and point clouds, optimizing sensor setups (LiDAR-Camera), and enabling autonomous agents to navigate complex environments.

# Papers in This Category (15 papers)
- NoPoSplat을 이용한 야외 환경의 조밀한 3D 복원 (2025)
    3D  reconstruction  is  critical  in  fields  like  autonomous  driving,  virtual  and  augmented  reality. Traditional  methods  using  LiDAR  offer  high  precision  but  suffer  from  high  costs  and  sensitivity.  Recent approaches like PixelSplat and MVSplat improve image-based reconstruction with sparse inputs but still rely on accurate  camera  poses  and  dense  data.  To  address  this,  pose-free  methods  such  as  NoPoSplat  and  VicaSplat enable  reconstruction  without  explicit  pose  information.  This  study  applies  NoPoSplat  to  a  custom  outdoor dataset to verify the feasibility of low-cost, high-quality 3D reconstruction without extra sensors or precise poses.
- DUST3R를 이용한 야외 환경의 조밀한 3D 복원 (2025)
    This paper proposes a dense 3D reconstruction pipeline for outdoor environments utilizing DUST3R, a pretrained Transformer-based model. Given a sequence of outdoor images, inference is performed in overlapping groups to ensure spatial continuity across frames. To obtain globally consistent camera poses, the predicted results from each group are aligned and merged into a unified coordinate system based on their overlapping regions. The resulting 3D reconstruction is then quantitatively and qualitatively compared with COLMAP, a traditional Structure-from-Motion approach, to evaluate the accuracy and effectiveness of the proposed method.
- UniAD 모델 경량화 및 성능 비교 (2025)
    Recently developed autonomous driving systems based on deep learning typically operate through modular architectures, where separate modules perform distinct individual tasks. While the UniAD framework proposed in the “Planning-oriented Autonomous Driving” paper addresses the limitations of modular approaches through a unified architecture, its complex transformer structure requires substantial computational resources to function. This paper proposes a lightweight version of UniAD to improve the accessibility of multimodal learning. We reduce the computational complexity by lowering the number of transformer layers and queries, the dimensions, and the BEV spatial resolution. Additionally, we optimize memory usage by limiting sampling queries and enabling page-locked memory settings. Experiments with two versions of the lightweight architecture show significant memory reductions: up to 79.92% in Stage 1 and 38.81% in Stage 2 compared with the original UniAD architecture (52.3 GB and 16.67 GB, respectively). Although the lightweight model suffers an overall performance degradation, we discover that progressive resolution expansion during training can enhance its feature extraction capability, particularly in the initial low-resolution learning phase.
- ViewFormer 기반 다중 시점 3D 점유 인지 성능 향상을 위한 객체 마스크 모듈 (2025)
    This study examines enhancing object detection by integrating an object-masking module into ViewFormer, a transformer-based model for 3D occupancy prediction from multi-view images. While ViewFormer effectively captures spatiotemporal information, it underperforms on small objects such as pedestrians and bicycles. To address this limitation, we designed a SegFormer-based object masking module that estimates object probabilities from BEV features and concatenates them as an additional feature channel. Experimental evaluations on the nuScenes dataset revealed an unexpected performance decline in overall metrics (mIoU, IoUgeo), particularly for small object detection. Subsequent analysis indicated weak mask activation and instability during initial training as key factors limiting the module’s effectiveness. These findings highlight the viability and constraints of object masking, underscoring the need for structural adjustments and improved training strategies to stabilize mask learning in future work.
- End-to-End Camera Pose Estimation with Camera Ray Token (2025)
    This paper proposes an end-to-end method for estimating camera poses using ray regression, a diffusion model-based ray inference approach. The conventional ray regression model outputs moments and directions, which are then converted into the final pose through traditional methods; however, this conversion process can introduce errors. In this work, we replace the conversion process with a deep learning network to achieve more stable pose estimation performance. Furthermore, the proposed model incorporates an additional rendering network for image reconstruction, demonstrating not only camera pose estimation but also the scalability to scene reconstruction. Leveraging the learned features, the model enables image rendering from novel viewpoints. Experimental results demonstrate that the proposed end-to-end method outperforms the conventional ray regression approach under the same training conditions, achieving approximately a 16% improvement in camera pose estimation and a nearly 30% gain in translation accuracy.
- Semantic Scene Completion With 2D and 3D Feature Fusion (2024)
    3D semantic scene completion (SSC) aims to get a dense semantic understanding of an environment in 3D. It requires a geometric and semantic knowledge of the surrounding environment and the filling of void areas. In this paper, we propose an improved algorithm by modifying VoxFormer. VoxFormer consists of two steps for 3D semantic scene completion. First, it predicts the occupancy of an environment. Then, it completes the semantic scene completion through a masked autoencoder. It requires separate training for two stages, which can cause a disconnect of information from input to output. We propose an improved VoxFormer algorithm that makes end-to-end training possible by integrating occupancy prediction and scene completion. We use pseudo-LiDAR computed by depth estimation as input of 3D CNN, which generates queries for cross attention with 2D features. This makes the process end-to-end by connecting occupancy prediction and semantic scene completion. Experimental results using SemanticKITTI show improvement in the proposed algorithm.
- 이미지와 점군을 이용한 CenterFormer 개선 (2024)
    In autonomous driving, the robust detection of objects in the driving environment is essential. Existing driving environment object recognition algorithms are based on analyzing the class and location of objects through various data formats. In this study, we use Nuscenes, a driving environment dataset, to check and verify performance in the driving environment. We propose a method that uses only point cloud data and one that complements the weaknesses of using only image data and the weaknesses of using only point cloud data by adding image data to a model called CenterFormer, which combines CenterPoint and Transformer. The results revealed that the proposed method performed better than the method using only point cloud data.
- 다중 특징치 맵과 마스크드 오토인코드를 이용한 3D 시맨틱 장면 완성 (2023)
    Autonomous systems require a profound understanding of their surroundings, encompassing both semantic and 3D geometry. This study focuses on advancing 3D semantic scene completion approaches using a camera. Building upon the foundation laid by VoxFormer [1], which is recognized for its state-of-the-art performance in 3D semantic scene completion, our approach involves two distinct stages. In the initial stage, scene completion is done with depth images, while in the second stage, the final 3D scene completion is performed using masked autoencoder. To enhance the performance of VoxFormer, we introduced two key modifications. First, we modified the first stage using multi-scale feature maps. Second, we further modified the first stage using a masked autoencoder. Experimental results, based on the adapted VoxFormer model in both stages are presented. Our two proposed approaches exhibit notable improvements, particularly in the context of small objects. However, these enhancements warrant further investigation for optimization and refinement.
- Automatic Extrinsic Calibration of a Camera and a 2D LiDAR With Point-Line Correspondences (2023)
    Extrinsic calibration of a 2D camera and a 2D LiDAR is necessary to fuse information from two sensors by representing the information under the same frame. Various geometric constraints such as point-plane, point-line, and point-point are used for the extrinsic calibration. Usually, these require a manual step, including control points selection for camera calibration and LiDAR points. We propose a new algorithm for automatic extrinsic calibration with point-line correspondences. A calibration structure with two perpendicular planes having a chessboard on both sides is used for the extrinsic calibration. First, we use predefined colors at specific locations on a chessboard to quickly find the origin of the coordinate system. Second, we robustly detect three control points on LiDAR raw data using a geometric constraint that two end points among three control points should lie on the same line. The initial linear solution is obtained by using a point-line constraint. Finally, it is refined by nonlinear minimization, which gives a 15.3% improvement compared to the linear solution. Experimental results show the feasibility of the proposed algorithm.
- Extrinsic Calibration of a Camera and a 2D LiDAR Using a Dummy Camera With IR Cut Filter Removed (2020)
    Extrinsic calibration of a camera and a LiDAR is necessary to fuse information from each sensor. The real trajectory of the LiDAR is not visible on an image, therefore the accuracy of the extrinsic calibration is usually checked by evaluating residuals of constraints. In this paper, we present an improved extrinsic calibration algorithm of a camera and a 2D LiDAR using an additional dummy camera removing IR cut filter, which make it possible to observe the real trajectory of LiDAR. Some previous algorithms used the real trajectory of LiDAR for the extrinsic calibration. However, they used IR filter directly on the calibrating camera by adjusting exposure time, which can affect the result of the extrinsic calibration. We use an initial solution using the Hu algorithm which makes extrinsic calibration possible by using just one shot of data. The Hu algorithm gives a sensitive result according to pose variation between a system consisted of a camera and a LiDAR and a calibration structure, which is verified using the real trajectory of LiDAR. We cope with this problem by refining the initial solution through nonlinear minimization in a 3D space using the real trajectory of LiDAR. Experimental results show that the proposed algorithm gives an improved solution.
- One Shot Extrinsic Calibration of a Camera and Laser Range Finder Using Vertical Planes (2019)
    In this paper, we present a new algorithm for the extrinsic calibration of a camera and laser range finder just using one-shot data. Most previous algorithms require multiple sets of data acquired under different poses. We newly designed a calibration structure where multiple polyhedrons are set in predefined positions on the ground plane which allow the natural application of multiple point-line constraints for the extrinsic calibration of a camera and laser range finder. Control points are extracted from laser range finder's data by hand. If automatic detection of control points is possible, presented algorithm can be used for in-situ extrinsic calibration of a camera and laser range finder. Even using one-shot of data, presented algorithm gives comparable accuracy compared to conventional algorithm which requires multiple sets of data under different pose.
- Automatic extrinsic calibration of a camera and laser range finder using constraints fusion (2019)
- Visual odometry using cameras parallel to ground plane (2009)
- 스테레오 시스템을 이용한 SLAM (2016)
     In  this  paper,  we  deal  with  simultaneous  localization  and  mapping  (SLAM)  using  stereo  vision system. SLAM is an essential algorithm in autonomous navigation. The problem is formulated using odometry information  provided  by  P3-AT  mobile  robot and  measurements  provided  by  stereo  system.  And, it is  solved using open source of g2o [1]. Experimental results show that it is important to have correct matching in stereo system. 
- Mapping using stereo system (2016)
- Calibration and 3D structure recovery under varying cameras using known angles (1999)
    We present an algorithm for the calibration of a camera and the recovery of 3D scene structure up to a scale from image sequences using known angles between lines in the scene. The proposed method computes the intrinsic parameters of the camera using the invariance of angles under the similarity transformation. Specifically, we recover the matrix that is the homography between the projective structure and the Euclidean structure using angles. Since this matrix is a unique one in the given set of image sequences, we can easily deal with the problem of varying intrinsic parameters of the camera. Experimental results on the synthetic and real images demonstrate the feasibility of the proposed algorithm.

# Task Requirements

## Step 1: Paper Information Retrieval
For EACH paper:
- Search for full abstract and publication details
- Extract key methodology and contributions
- Identify quantitative results (accuracy, error metrics, FPS, etc.)
- Find architecture diagrams or result visualizations

## Step 2: Poster Generation
Create ONE comprehensive slide containing:
- **Category Title**: "3D Spatial AI & Autonomous Navigation"
- **Research Overview**: Brief description of the field
- **Paper Timeline**: Chronological progression (1999 → 2025)
- **Key Visual Elements**:
  - Representative architecture diagrams (SLAM, calibration pipeline, 3D reconstruction)
  - Quantitative result comparisons across papers
  - Evolution of methods visualization
- **Quantitative Highlights**: Performance metrics, accuracy improvements
- **Research Evolution**: How methods progressed from calibration → SLAM → autonomous driving

## Content Requirements
- **ALL content in English**
- Use precise technical terminology
- Include exact numerical values from papers
- Professional academic poster layout
- Mark unavailable data as "Not Available"

## Visual Accuracy - CRITICAL
- Reproduce architecture diagrams accurately
- Include result plots with exact numbers
- Maintain consistent visual style
- High-quality figures only

Begin by searching for all 15 papers and confirming retrieval success before generating the poster.
```

---

## **분야 2: Advanced Visual Perception & Surveillance**

```
# Mission
Create ONE professional poster slide for the research category: **Advanced Visual Perception & Surveillance** from AIS Lab.

# Research Category Overview
**Focus:** Object Detection, Segmentation, and Intelligent Surveillance.
Developing robust algorithms to detect and track objects in challenging conditions (bad weather, dynamic backgrounds) using Spatio-Temporal networks and Generative models (GAN/VAE).

# Papers in This Category (15 papers)
- Improved Object Detection with Content and Position Separation in Transformer (2024)
    In object detection, Transformer-based models such as DETR have exhibited state-of-the-art performance, capitalizing on the attention mechanism to handle spatial relations and feature dependencies. One inherent challenge these models face is the intertwined handling of content and positional data within their attention spans, potentially blurring the specificity of the information retrieval process. We consider object detection as a comprehensive task, and simultaneously merging content and positional information like before can exacerbate task complexity. This paper presents the Multi-Task Fusion Detector (MTFD), a novel architecture that innovatively dissects the detection process into distinct tasks, addressing content and position through separate decoders. By utilizing assumed fake queries, the MTFD framework enables each decoder to operate under a presumption of known ancillary information, ensuring more specific and enriched interactions with the feature map. Experimental results affirm that this methodical separation followed by a deliberate fusion not only simplifies the task difficulty of the detection process but also augments accuracy and clarifies the details of each component, providing a fresh perspective on object detection in Transformer-based architectures.
- Improved DETR With Class Tokens in an Encoder (2024)
    DETR first used a transformer in object detection. It does not use anchor boxes and non-maximum suppression by converting object detection into a set prediction problem. DETR has shown competitive results on public datasets and brought many new ideas on object detection. Most DETR-like methods focus on improving decoder and object queries in the decoder part. We conclude that the backbone and the encoder comprising the DETR and DETR-like models serve as feature extractors through prior research. Through an analysis of the outputs from the backbone and the encoder, we notice that they extract image features for object detection. Based on this fact, we want to reinforce the feature extraction stage by introducing class tokens in the encoder. We add a class tokens module that represents prior category information in the encoder. It enables the utilization of global attention among feature tokens. This provides prior knowledge in feature extraction. We investigate two initialization methods in the proposed class token module: random initialization and pretrained class tokens. Also, the proposed module can be used as a plug-and-play component in DETR-like models. Experimental results show that the proposed module performs better than each baseline model.
- Object Detection Method Using Image and Number of Objects on Image as Label (2024)
    DETR first used a transformer in object detection. It does not use anchor boxes and non-maximum suppression by converting object detection into a set prediction problem. DETR has shown competitive results on public datasets and brought many new ideas on object detection. Most DETR-like methods focus on improving decoder and object queries in the decoder part. We conclude that the backbone and the encoder comprising the DETR and DETR-like models serve as feature extractors through prior research. Through an analysis of the outputs from the backbone and the encoder, we notice that they extract image features for object detection. Based on this fact, we want to reinforce the feature extraction stage by introducing class tokens in the encoder. We add a class tokens module that represents prior category information in the encoder. It enables the utilization of global attention among feature tokens. This provides prior knowledge in feature extraction. We investigate two initialization methods in the proposed class token module: random initialization and pretrained class tokens. Also, the proposed module can be used as a plug-and-play component in DETR-like models. Experimental results show that the proposed module performs better than each baseline model.
- Mask2Former 를 이용한 크랙 시맨틱 분할 (2023)
    The objective of crack detection is to identify any defects present on the surfaces of various physical structures. This task can be approached in two ways: bounding box detection and semantic segmentation. In this study, we focus on a method based on semantic segmentation that can provide per-pixel classification results. We applied Mask2Former, a method known for its state-of-theart performance in semantic segmentation, for crack detection. We conducted experiments using various crack datasets, and the results highlight the need for enhanced performance in non-crack detection to achieve improved results.
- MSF-NET: Foreground Objects Detection With Fusion of Motion and Semantic Features (2023)
    Visual surveillance requires robust detection of foreground objects under challenging environments of abrupt lighting variation, stationary foreground objects, dynamic background objects, and severe weather conditions. Most classical algorithms leverage background model images produced by statistical modeling of the change of brightness values over time. Since they have difficulties using global features, many false detections occur at the stationary foreground regions and dynamic background objects. Recent deep learning-based methods can easily reflect global characteristics compared to classical methods. However, deep learning-based methods still need to be improved in utilizing spatiotemporal information. We propose an algorithm for efficiently using spatiotemporal information by adopting a split and merge framework. First, we split spatiotemporal information on successive multiple images into spatial and temporal parts using two sub-networks of semantic and motion networks. Finally, separated information is fused in a spatiotemporal fusion network. The proposed network consists of three sub-networks, which we note as MSF-NET (Motion and Semantic features Fusion NETwork). Also, we propose a method to train the proposed MSF-NET stably. Compared to the latest deep learning algorithms, the proposed MSF-NET gives 9% and 13% higher FM in the LASIESTA and SBI datasets. Also, we designed the proposed MSF-NET to be lightweight to run in real-time on a desktop GPU.
- Foreground Object Detection in Visual Surveillance With Spatio-Temporal Fusion Network (2022)
    Object detection generally shows promising results only using spatial information, but foreground object detection in visual surveillance requires proper use of temporal information in addition to spatial information. Recently, deep learning-based visual surveillance algorithms have shown improved results, in an environment similar to training one, compared to traditional background subtraction (BGS) algorithms. However, in unseen environments, they show poor performance compared to BGS algorithms. This paper proposes an algorithm that improves performance in unseen environments by integrating spatial and temporal information. We propose a spatio-temporal fusion network (STFN) that extracts temporal and spatial information from 3D and 2D networks. Also, we propose a method for stable training of the proposed STFN using a semi-foreground map. STFN can generate a compliant background model image and operate in real-time on a desktop with GPU. The proposed algorithm performs well in an environment different from training and is demonstrated by experiments using various public datasets.
- Weakly Supervised Foreground Object Detection Network Using Background Model Image (2022)
    In visual surveillance, deep learning-based foreground object detection algorithms are superior to classical background subtraction (BGS)-based algorithms. However, deep learning-based methods are limited because detection performance deteriorates in a new environment different from the training environment. This limitation can be solved by retraining the model using additional ground-truth labels in the new environment. However, generating ground-truth labels for visual surveillance is time-consuming and expensive. This paper proposes a method that does not require foreground labels when adapting to a new environment. To this end, we propose an integrated network that produces two kinds of outputs a background model image and a foreground object map. We can adapt to the new environment by retraining using a background model image. The proposed method consists of one encoder and two decoders for detecting foreground objects and a background model image. It is designed to enable real-time processing with desktop GPUs. The proposed method shows 14.46% improved FM in a new environment different from training and 11.49% higher FM than the latest BGS algorithm.
- 객체 검출과 객체 분할 방법의 무인 감시 데이터셋 적용 결과 비교 (2022)
    Visual surveillance aims to detect foreground objects stably under diverse variations caused by weather changes. Traditional visual surveillance algorithms are based on a statistical analysis of pixel variations along the spatio-temporal domain. Recently, deep learning-based algorithms have improved performance compared to conventional algorithms. In this paper, we investigate the performance of object detection and semantic segmentation algorithms on visual surveillance datasets. We use the CDnet dataset, which is widely used in visual surveillance. We adjust labels in the CDnet dataset to be suitable for object detection and semantic segmentation. We investigate the possibility of object detection and semantic segmentation in visual surveillance. Two types of algorithms based on CNN and transformer are used in experiments. Experimental results show that spatio-temporal processing is required to improve performance when we apply object detection and semantic segmentation in visual surveillance.
- Semantic Segmentation with Perceiver IO (2022)
    Recently, in deep learning, the transformer is replacing the convolutional neural network (CNN) due to its performance and simple design. In particular, in recent studies, constructing an encoder of the transformer that effectively extracts features on an image has been widely used. However, even in these cases, models utilizing existing deep neural network structures needed to use a form suitable for each data format according to input modality. Recently, the Perceiver IO [6] has been proposed to overcome this limitation. It can process various data formats through one structure to extract a characteristic value. Also, it uses an output query to output data as we want. In this paper, a semantic segmentation model using the characteristics of the Perceiver IO is presented. Two types of input configuration are suggested, and experimental results show the feasibility of the proposed method.
- Random Swin Transformer (2022)
    After deep learning appeared, the convolutional neural network (CNN) dominated various applications of image classification, object detection, and semantic segmentation. Recently, a transformer based on various attention mechanisms performed better than the CNN. But, the transformer requires a large amount of memory for full attention among tokens. Recently, a Swin transformer has been proposed to solve that memory issue. It applies the attention per sub-regions on an image. Also, it solves a problem caused by not using full attention on an image by shifting window that guarantees more tokens are involved in attention. In this paper, we investigate a method of randomly selecting tokens in Swin transformer. We randomly choose tokens within a certain range rather than using a fixed shift value in the Swin transformer. Experimental results show the feasibility of the proposed method.
- Visual surveillance transformer (2021)
    In the case of the unmanned surveillance system field, even if it is the same object, the detection result will be different depending on the state of the object and the configuration of the surrounding environment. Therefore, artificial intelligence for unmanned surveillance needs to understand the environment on the image, understand the state of the object within the image, and understand the relationship between them. For this purpose, in this study, a transformed transformer structure that can receive a single image, which is 2D data, as an input, unlike splitting one image into a certain size and using it as an input, is presented, and the effect between neighboring pixels is considered by using a segmentation model to which it is applied. A possible background classification model was constructed.
- Spatio-Temporal Data Augmentation for Visual Surveillance (2021)
    Visual surveillance aims to detect a foreground object using a continuous image acquired from a fixed camera. Recent deep learning methods based on supervised learning show superior performance compared to classical background subtraction algorithms. However, there is still room for improvement in the static foreground, dynamic background, hard shadow, illumination changes, camouflage, etc. In addition, most of the deep learning-based methods operate well in environments similar to training. If the testing environments are different from training ones, their performance degrades. As a result, additional training in those operating environments is required to ensure good performance. Our previous work, which uses spatio-temporal input data consisting of several past images, background images, and the current image, showed promising results in different environments from training. However, it uses a simple U-NET structure. This paper proposes a data augmentation technique suitable for visual surveillance for additional performance improvement using the same network used in our previous work. In deep learning, most data augmentation techniques deal with spatial-level data augmentation techniques used in image classification and object detection. We propose two data augmentation methods of adjusting background model images and past images. The proposed algorithm improves performance in complex areas such as static foreground and ghost objects compared to previous studies. Through quantitative and qualitative evaluation using SBI, LASIESTA, and our dataset, we show superior performance compared to deep learning-based algorithms and background subtraction algorithms. In addition, it has a 30.2% and 27.9% reduction of false detection rate in the LASIESTA and SBI dataset, respectively, compared to our previous study.
- Generation of Background Model Image Using Foreground Model (2021)
    Proper consideration of the temporal domain and the spatial domain is essential to perform robust foreground object detection in visual surveillance. However, there are difficulties in considering long-term temporal information with CNN-based methods. To solve this limitation, classical algorithms and some deep learning-based algorithms have used a background model image. However, acquiring a sophisticated background model image is also one of the complex problems. Most of the algorithms take a lot of time to initialize the background model image and generate many errors in the presence of a static foreground. This paper proposes an algorithm for generating a background model image using a deep-learning-based segmenter to solve this problem. The proposed method shows a 66.25% lower mean square error (MSE) than the background subtraction (BGS) algorithm and 79.25% lower than the latest deep learning algorithm in the SBI dataset. In addition, in the deep learning-based segmenter that uses a background image as input, replacing the background image of BGS algorithm with the background image of the proposed method shows a 38.63% reduction in the false detection rate (PWC).
- Visual Surveillance using Background Model Image Generated by GAN (2020)
    Visual surveillance requires robust foreground and background separation capabilities in various environments. Although various traditional algorithms based on background subtraction methods have been proposed, problems such as hard shadows, camouflage, and ghost effects remain. Recently, deep learning-based foreground detection methods have been proposed. Deep learning-based methods outperform traditional algorithms in various unmanned surveillance datasets. However, even deep learning-based methods show insufficient generalization ability in certain datasets. For data that have not been trained, a number of errors are detected. Even among deep learning-based methods, there are methods that show higher generalization ability by using a background image. In this paper, we propose a method of using GAN to generate background images.
- VAE 로 생성한 배경 이미지를 이용한 무인감시 (2020)
    In this paper, we present a new deep learning segmentation model that combines classic algorithm and deep learning methods. The classic method has the disadvantage that detailed parameter tuning is required, and the deep learning based method has a weakness in generalization. We include the image generated by VAE in the input of deep learning network. Using this method, we can achieve better segmentation capabilities than the classic and deep-learning methods.

# Task Requirements

## Step 1: Paper Information Retrieval
For EACH paper:
- Search for full abstract and publication details
- Extract detection/segmentation methodology
- Identify performance metrics (mAP, F1-score, precision, recall, FPS)
- Find network architectures and result visualizations

## Step 2: Poster Generation
Create ONE comprehensive slide containing:
- **Category Title**: "Advanced Visual Perception & Surveillance"
- **Research Overview**: Brief description of the field
- **Paper Timeline**: Evolution from GAN/VAE (2020) → Transformer (2024)
- **Key Visual Elements**:
  - Object detection architectures (DETR variants, Transformers)
  - Segmentation results (Mask2Former examples)
  - Background modeling pipeline diagrams
- **Quantitative Highlights**: Detection accuracy, segmentation performance
- **Research Evolution**: GAN-based → Spatio-Temporal → Transformer-based methods

## Content Requirements
- **ALL content in English**
- Use precise technical terminology
- Include exact numerical performance metrics
- Professional academic poster layout
- Mark unavailable data as "Not Available"

## Visual Accuracy - CRITICAL
- Reproduce detection/segmentation architectures accurately
- Include performance comparison tables with exact numbers
- Maintain consistent visual style
- High-quality figures only

Begin by searching for all 15 papers and confirming retrieval success before generating the poster.
```

---

## **분야 3: Scene Text Recognition (STR)**

```
# Mission
Create ONE professional poster slide for the research category: **Scene Text Recognition (STR)** from AIS Lab.

# Research Category Overview
**Focus:** Reading text in the wild.
Improving accuracy of recognizing irregular, curved, and blurred text in natural scenes by utilizing Transformer-based architectures and Multi-Encoder/Decoder systems.

# Papers in This Category (5 papers)
- 두 개의 인코더를 이용한 장면 텍스트 인식 (2023)
    Despite significant advancements in scene text recognition, current models face substantial challenges, particularly when confronted with irregular text images featuring complex backgrounds, curved text, diverse fonts, and distortions. While convolutional neural network (CNN)-based text recognition networks have demonstrated commendable performance, they grapple with the aforementioned challenges. Recently, transformer-based feature extractors have exhibited advantages in global feature extraction from images, especially in the context of irregular text images. By employing self-attention, these transformers establish information connections between different parts of the image, thereby mitigating the impact of uneven character distribution. This study proposes multi-encoder scene text recognition (MESTR), a hybrid approach that combines a CNN-based and a transformer-based feature extractor. MESTR excels in simultaneously extracting local and global features from text images, ensuring the integration of both types of features to enhance performance. During training, we employed a guiding connectionist temporal classification (CTC) decoder [6] as a compensatory training strategy for the attentional decoder. Our experiments showed the efficacy of MESTR across seven benchmarks, demonstrating robust performance. In addition, ablation experiments are presented to validate the effectiveness of the proposed algorithm for scene text recognition.
- Scene Text Recognition with Multi-Encoders (2022)
    Although text recognition has significantly evolved over the years, the current models still have huge challenges, especially for irregular text images, such as complex backgrounds, curved text, diverse fonts, distortions, etc. Currently, CNN-based text recognition networks have shown good performance but still face the above challenges. Recently, feature extractor based on transformer has shown excellent advantages for global feature extraction on images. Especially in irregular text images, which can use self-attention to establish the information connection of each part of the image, which can also reduce the influence of the irregular distribution of characters. Therefore, this paper proposes MESTR(Multi-Encoders Scene Text Recognition) that combines a CNN-based [1] [2] [6] feature extractor and a transformer-based feature extractor. MESTR can extract local and global features of text images at the same time and then integrate global features into local features. During training, we used CTC [6] as guide training in the decoder part, as the compensation training strategy for attentional decoder. Experimental results demonstrate that the proposed MESTR shows competitive results on all seven benchmarks. At the same time, we provide ablation experiments to show the effectiveness of the improved part on the text recognition model.
- 다중 패치를 이용한 트랜스포머 기반 장면 텍스트 인식 (2022)
    In this paper, we explore the application of Vision transformer (ViT) to the scene text recognition task. As a popular research direction in computer vision, Scene text recognition enables computers to recognize or read the text in natural scenes, such as object labels, text descriptions, and road text signs. At present, the traditional convolutional neural network-based model has better performance. Still, in the face of complex backgrounds and irregular scene text pictures, the performance of the convolutional neural network-based model is challenging to improve in curved text, diverse fonts, distortions, etc. With the application of transformers in computer vision, the model structure based on transformers has also significantly been developed. Although the current transformer-based model can obtain the performance of the model structure similar to CNN, it is currently in the early stage of application, and there is much room for research and improvement. We propose a multi-scale vertical rectangular patch model (MSVSTR) for transformer-based feature extractor to be more suitable for text images. By only arranging the patches in a single direction, when the image is cropped through the patch, it can be more suitable for the distribution form of the text in the text image. At the same time, to be suitable for different numbers of characters in other texts and more robust feature extraction, vertical rectangular patches of different scales are applied to crop the image. Our structure performs better through various ablation experiments than similar transformer-based STR models. At the same time, experiments show that our structure can perform seven benchmarks well.
- Scene Text Recognition with Multi-decoders (2021)
    In this article, we focus on the scene text recognition problem, which is one of the challenging sub-files of computer vision because of the random existence of scene text. Recently, scene text recognition has achieved state-of-art performance because of the improvement of deep learning. At present, encoder-decoder architecture was widely used for scene recognition tasks, which consist of feature extractor, sequence module. Specifically, at the decoder part, connectionist temporal classification(CTC), attention mechanism, and transformer(self-attention) are three main approaches used in recent research. CTC decoder is flexible and can handle sequences with large changes in length for its align sequences features with labels in a frame-wise manner. Attention decoder can learn better and deeper feature expression and get the better position information of each character. Attention decoder can get more robust and accurate performance for both regular and irregular scene text. Moreover, a novel decoder mechanism is introduced in our study. The proposed architecture has several advantages: the model can be trained using the end-to-end manner under the condition of multi decoders, and can deal with the sequences of arbitrary length and the images of arbitrary shape. Extensive experiments on standard benchmarks demonstrate that our model's performance is improved for regular and irregular text recognition.
- 심층 신경망을 이용한 장면 텍스트 추출 및 인식 (2020)
    Scene  text  recognition  is  a  very  challenging  research  task  in  computer  vision,  including  text detection and text recognition tasks. The variability of the text makes this task more difficult. There are already many methods for scene text recognition. Instance segmentation and Spatial Attention module have shown good performance in various text detection and recognition, and are currently the main research directions.

# Task Requirements

## Step 1: Paper Information Retrieval
For EACH paper:
- Search for full abstract and publication details
- Extract text recognition methodology (encoder/decoder architecture)
- Identify performance metrics (accuracy on benchmark datasets: IIIT5K, SVT, IC13/15, CUTE80, etc.)
- Find architecture diagrams and recognition result examples

## Step 2: Poster Generation
Create ONE comprehensive slide containing:
- **Category Title**: "Scene Text Recognition (STR)"
- **Research Overview**: Brief description of the field
- **Paper Timeline**: Progression from CNN (2020) → Multi-Encoder/Decoder → Transformer (2023)
- **Key Visual Elements**:
  - Multi-encoder/decoder architecture diagrams
  - Transformer-based STR pipeline
  - Recognition examples (curved, irregular text)
- **Quantitative Highlights**: Accuracy on standard benchmarks (IIIT5K, SVT, IC15, etc.)
- **Research Evolution**: Single model → Multi-component → Transformer architecture

## Content Requirements
- **ALL content in English**
- Use precise technical terminology
- Include exact accuracy numbers on benchmark datasets
- Professional academic poster layout
- Mark unavailable data as "Not Available"

## Visual Accuracy - CRITICAL
- Reproduce STR architectures accurately (multi-encoder/decoder diagrams)
- Include benchmark performance tables with exact numbers
- Show text recognition examples clearly
- High-quality figures only

Begin by searching for all 5 papers and confirming retrieval success before generating the poster.
```

---

## **분야 4: Fundamental Vision & RL Application**

```
# Mission
Create ONE professional poster slide for the research category: **Fundamental Vision & RL Application** from AIS Lab.

# Research Category Overview
**Focus:** Theoretical Improvements and Reinforcement Learning (RL) Applications.
Applying Deep Reinforcement Learning to solve classical computer vision problems (like Edge Detection) and developing adaptive algorithms that optimize themselves.

# Papers in This Category (7 papers)
- An Adaptive Threshold for the Canny Edge with Weak Label (2025)
    Edge detection is critical in various computer vision applications such as object recognition, segmentation, and scene understanding. The Canny edge detector remains widely used in traditional methods due to its balance between accuracy and computational efficiency. However, optimal performance depends heavily on carefully selecting three threshold parameters. Prior studies have proposed reinforcement learning-based approaches to automatically determine these parameters. Still, they rely on a supervised edge evaluation network that requires manually annotated high-quality edge labels—a costly and time-consuming prerequisite. This paper proposes a novel approach that eliminates the need for manually labeled data by introducing a weakly supervised reward scheme. We automatically generate weak edge labels from gradient information and use them as pseudo ground truth to compute reward values during the reinforcement learning process. The proposed method leverages an Actor-Critic algorithm to learn adaptive thresholds for the Canny edge detector without explicit supervision. Experimental results demonstrate that our method achieves comparable or superior edge detection performance compared to previous supervised methods and generalizes effectively to unseen datasets.
- An Adaptive Threshold for the Canny Edge With Actor-Critic Algorithm (2023)
    We propose a method to automatically select proper values of three thresholds in the Canny edge algorithm. Edge detection is widely used for object recognition, detection, and segmentation. Due to its good performance, the Canny edge algorithm is still widely used among many edge detection algorithms. But, it requires manually selecting three appropriate thresholds for the given image. Some approaches have been proposed for automatically setting thresholds in the Canny edge algorithm. But, they either deal with partial among three entries or only show their performance in a limited range of variation. In natural scenes, images are acquired under various illumination, pose, and weather conditions. This paper proposes a method that can operate in various environments. We formulate the given problem by adopting an actor-critic algorithm. We propose an actor and critic network to solve the problem with an actor-critic algorithm. Also, we suggest a reward configuration based on an edge evaluation network and measure to prevent the reversal between high and low thresholds. The edge evaluation network uses an original image and an edge image as input. We set a negative reward when reversing the high and low thresholds occur. The proposed algorithm can adapt to unseen environments using images without requiring ground truth labels. Experimental results using diverse datasets show the feasibility of the proposed algorithm.
- Object Detection Using Policy-Based Reinforcement Learning (2023)
    By constructing an object detection model using a deep neural network structure, it was possible to obtain faster and more accurate results than traditional models. Afterwards, through the method of applying the transformer structure by replacing the existing convolutional layer, the model structure, which was previously carried out in two stages, was simplified, and it became possible to detect the size of the object more freely. However, there are difficulties in generating new data due to the complex configuration of data used for training. As a result, a lot of resources are consumed in data generation, and it is difficult to train in response to a new environment immediately. This study presents a method for learning using simpler data. The simplified data consisted of the input image and the number of objects to be detected. To train using the data, a reinforcement learning method was applied to evaluate the output of the detection model and create and train a reward based on this.
- An Adaptive Threshold for the Canny Algorithm With Deep Reinforcement Learning (2021)
    The Canny algorithm is widely used for edge detection. It requires the adjustment of parameters to obtain a high-quality edge image. Several methods can select them automatically, but they cannot cover the diverse variations on an image. In the Canny algorithm, we need to set values of three parameters. One is related to smoothing window size, and the other two are the low and high threshold. In this paper, we assume that the smoothing window size is fixed to a predefined size. This paper proposes a method to provide adaptive thresholds for the Canny algorithm, which operates well on images acquired under various variations. We select optimal values of two thresholds adaptively using an algorithm based on the Deep Q-Network (DQN). We introduce a state model, a policy model, and a reward model to formulate the given problem in deep reinforcement learning. The proposed method has the advantage that it can adapt to a new environment using only images without labels, unlike the existing supervised way. We show the feasibility of the proposed algorithm by diverse experimental results.
- Visual Surveillance using Deep Reinforcement Learning (2020)
    Visual surveillance aims a robust detection of foreground objects, and traditional algorithms usually use a background model image. A current is compared with the background model image. In this paper, we present a visual surveillance algorithm, which determines the parameters in Vibe using deep reinforcement learning. We apply DQN to determine three parameters in Vibe algorithm. We present a policy model which is composed of encoder and decoder type network. Experimental results shows the feasibility of the presented algorithm.
- Edge detection using deep reinforcement learning (2019)
    In this paper, in order to confirm the possibility of using such deep reinforcement learning in the image processing process, an image is input as an input and analyzed with a deep neural network, and a factor value of the image range used in a traditional algorithm or a factor value in pixels is selected through reinforcement learning. By training the policy model to perform reinforcement learning, it was confirmed whether or not the image processing model was trained. Train a policy model that selects two thresholds of the Canny method using the DQN learning method and the A2C method, respectively, and analyze the image as a state, and train an image processing model that automates the traditional algorithm by selecting the appropriate threshold. I did. At this time, when the input image and the generated image have different data types, such as image processing, we experimented with a method of configuring states and actions to enable reinforcement learning. In addition, in traditional algorithms that use background image models such as Vibe and Subsense, the process of determining factors through a certain formula based on each pixel value is replaced with a policy model, and the model is trained through DQN to select an appropriate factor for each pixel. Then, we trained a model for image processing.
- 에지 분류 CNN 을 이용한 U-Net 기반 에지 검출 (2019)
    Edge  detection  is  the  first  necessary  step  in  image  processing  for  object  segmentation,  detection,  and  recognition.  The  Canny  algorithm  is  widely  used  filter-based  approach,  but  it  requires  the  correct  adjustment  of  its  parameters  according  to  the variations in images. In this paper, we propose a method that is consisted of two steps for the robust detection of edges in an image. The  proposed  algorithm  adopts  convolutional  neural  networks  that  can  handle  the  diverse  variations  caused  by  illumination,  pose, and scale change. First, we train a convolutional neural network to decide whether a given input edge image is good or not. We can generate as many training images as we want using this network. Finally, U-Net is used to generate an edge image using a gray image as input. Experimental results show the robustness of the proposed algorithm for images acquired under outdoor and indoor environments.

# Task Requirements

## Step 1: Paper Information Retrieval
For EACH paper:
- Search for full abstract and publication details
- Extract RL methodology (Actor-Critic, Policy-Based, DQN, etc.)
- Identify performance metrics (F-measure, precision, recall for edge detection; mAP for object detection)
- Find RL architecture diagrams and reward structure

## Step 2: Poster Generation
Create ONE comprehensive slide containing:
- **Category Title**: "Fundamental Vision & RL Application"
- **Research Overview**: Brief description of applying RL to vision tasks
- **Paper Timeline**: Evolution of RL-based edge detection (2019 → 2025)
- **Key Visual Elements**:
  - RL architecture diagrams (Actor-Critic, Policy network)
  - Edge detection pipeline with RL integration
  - Performance comparison: traditional methods vs RL-based
- **Quantitative Highlights**: F-measure improvements, adaptive threshold performance
- **Research Evolution**: Basic RL → Actor-Critic → Weak Label supervision

## Content Requirements
- **ALL content in English**
- Use precise technical terminology (Actor-Critic, Policy Gradient, DQN, etc.)
- Include exact numerical performance metrics
- Professional academic poster layout
- Mark unavailable data as "Not Available"

## Visual Accuracy - CRITICAL
- Reproduce RL architectures accurately (reward structure, network diagrams)
- Include performance comparison tables with exact F-measures
- Show edge detection results visually
- High-quality figures only

Begin by searching for all 7 papers and confirming retrieval success before generating the poster.
```

---

## **분야 5: Industrial Machine Vision**

```
# Mission
Create ONE professional poster slide for the research category: **Industrial Machine Vision** from AIS Lab.

# Research Category Overview
**Focus:** Automated Optical Inspection (AOI) and Precision Measurement.
Developing high-speed, high-precision algorithms for detecting defects in manufacturing processes (semiconductors, displays, automotive parts) and precise 3D measurement.

# Papers in This Category (10 papers)
- OIS 검사 장치의 CPU 와 GPU 기반 영상 처리 성능 비교 (2025)
    Before installing optical image stabilization (OIS) systems in devices such as smartphones, an inspection process is conducted on the OIS systems. During this process, images of the OIS system are captured using a camera, calculations are performed, and the results are used to verify regular operation. In this calculation process, cameras with higher resolution and frames per second provide more precise and accurate results as the processing speed increases. In this study, we enhance performance by reducing image processing time through parallel computation using a GPU while constructing an environment that can utilize both integrated and individual GPUs to secure versatility in equipment usage. Additionally, we ensure scalability for potential future  technological applications as needed.
- GPU를 이용한 OIS 검사 이미지 영상처리 (2024)
    In order to evaluate the performance of Optical Image Stabilization (OIS), an image processing operation of 1ms or less per image should be performed. Therefore, in this paper, it is possible to shorten the time required for image processing by performing parallel operations using the computing power of the GPU. Furthermore, by developing a system that can perform multiple image processing functions simultaneously through GPUs, when a large amount of image data is received  from multiple cameras at the same time, it can be processed with the same performance as when processing one image data sheet at a time without performance degradation.
- CNN 을 이용한 태양전지 불량 검출 (2020)
    In this paper, we propose a method for solar cell defect detection using a convolutional neural network (CNN). The proposed method uses a CNN to extract features from solar cell images and classify them into normal and defective categories. The CNN is trained using a dataset of solar cell images, and the performance of the method is evaluated using a test dataset. Experimental results show that the proposed method can detect solar cell defects with high accuracy.
- 사영 변환하의 데이터 매트릭스 검출 (2018)
    Data Matrix is used in various industrial fields to embed diverse information in a compact fashion. Data Matrix is usually attached by printing method or is marked by laser on the surface of objects. In addition, cameras are used for decoding. It has an Lshape comprised of two perpendicular solid lines that serve to indicate the correct orientation of the code and the boundaries of the data area. Conventional decoding algorithms of Data Matrix require an image acquired under similarity transform. We present an algorithm for the robust detection of Data Matrix under general perspective transform. The presented algorithm first detects the whole area containing the Data Matrix using image binarization, connected component analysis and morphology. Next, corner points corresponding to the L-shape in the Data Matrix are detected using line fitting through polygonal approximation after contour processing. Finally, the Data Matrix is converted into canonical image using homography that is computed using the four detected corner points of the Data Matrix. Experiments using images having large perspective distortions acquired under various pose demonstrates the robustness of presented method.
- 이진화 및 블랍 처리를 이용한 코일 돌출 검사 (2017)
    In this paper we present a method for the inspection of protrusion of coils along the circumference of a given circle. Perspective distortion makes a circle in a world an ellipse on image. This makes protrusion inspection difficult. Our approach makes this problem simple by adjusting a camera’s image plane to be parallel to the object’s plane. Illumination system uses a back light and coaxial light which enables a robust and simple detection of a reference point for the inspection. First, a center of the circle is found through binarization and blob processing. Inspection area along the circumference of the circle is converted into rectangular image type using polar coordinates. Finally, binarization and blob processing is applied to detect the intrusion of the coil. Experimental results show the feasibility of the presented algorithm.
- 경계 추출 및 처리를 통한 다이아몬드 휠 검사 (2016)
    In this paper, we present a method for the inspection of diamond wheels. In total, six items, including height, radius, and angle, need to be checked during the manufacturing of a diamond wheel. Automatic inspection through image processing is presented in this paper. First, a contour corresponding to the boundary of the diamond wheel is extracted from an image. Next, control points are selected by processing the contour. Seven control points are detected and used for the computation of the required item. Detailed procedures for the computation of the height, radius, and angle using control points are presented in this paper. Experimental results show the feasibility of the presented method.
- Measurement of 3D Shape of Fastener using Camera and Slit Laser (2015)
    The measurement of 3D shape is important in inspecting the quality of product. In this paper, we present a 3D shape measurement system of fastener using a camera and a slit laser. Calibration structure with slits is used in the extrinsic calibration of the camera and laser. The pose of the camera and laser is computed under the same world coordinate system in the calibration structure. Reflection of laser light on the metal surface causes many difficulties in the robust detection of them on image. We overcome this difficulty by using color and dynamic programming. Motor stage is used to rotate the fastener to recover the whole 3D shape of the surface of it.
- Torx 형상 나사머리 검사 알고리듬 (2014)
- Automatic Manipulation of Tie Rod using Robot with 3D Sensing System (2014)
    Robots are widely used in various automation processes in industrial applications. Traditionally, it operated under fixed condition by teaching operating positions. Recently, diverse 2D/3D sensors are used together with robot to give more flexibility in operation. In this paper, we deal with automatic manipulation of tie rod in automotive production line. Sensor system consisted of a camera and slit laser is used for the acquisition of 3D information and it is used attached on the robot. Nut runner is used for the manipulation of stop nut and adjust bolt on the tie rod. Detailed procedures for the automatic manipulation of tie rod are presented. In the presented approach, we effectively use 3D information in whole procedure such as computing distance to the tie rod, rotation angle of bolt and nut. Experimental results show the feasibility of the proposed algorithm.
- New strain measurement method at axial tensile test of thin films through direct imaging (2008)
    This paper proposes a new method for measuring strain during a tensile test of the specimen with micrometre size through direct imaging. A specimen was newly designed for adoption of direct imaging which was the main contribution of the proposed system. The structure of the specimen has eight indicators that make it possible to adopt direct imaging and it is fabricated using the same process of microelectromechanical system (MEMS) devices to guarantee the feasibility of the tensile test. We implemented a system for non-contact in situ measurement of strain with the specimen, the image-based displacement measurement system. Extension of the gauge length in the specimen could be found robustly by computing the positions of the eight rectangular-shape indicators on the image. Also, for an easy setup procedure, the region of interest was found automatically through the analysis of the edge projection profile along the horizontal direction. To gain confidence in the reliability of the system, the tensile test for the Al–3%Ti thin film was performed, which is widely used as a material in MEMS devices. Tensile tests were performed and displacements were measured using the proposed method and also the capacitance type displacement sensor for comparison. It is demonstrated that the new strain measurement system can be effectively used in the tensile test of the specimen at microscale with easy setup and better accuracy.

# Task Requirements

## Step 1: Paper Information Retrieval
For EACH paper:
- Search for full abstract and publication details
- Extract inspection/measurement methodology
- Identify performance metrics (detection accuracy, processing speed/FPS, measurement precision, defect rate)
- Find system diagrams and inspection result examples

## Step 2: Poster Generation
Create ONE comprehensive slide containing:
- **Category Title**: "Industrial Machine Vision"
- **Research Overview**: Brief description of AOI and precision measurement
- **Paper Timeline**: Evolution from 3D measurement (2008) → GPU acceleration (2025)
- **Key Visual Elements**:
  - AOI system pipeline diagrams
  - 3D measurement setup (camera + laser)
  - Defect detection examples (solar cells, coils, fasteners)
  - CPU vs GPU performance comparison
- **Quantitative Highlights**: Detection accuracy, processing speed, measurement precision (mm/μm level)
- **Research Evolution**: Traditional image processing → CNN-based → GPU acceleration

## Content Requirements
- **ALL content in English**
- Use precise technical terminology (AOI, OIS, 3D sensing, calibration)
- Include exact numerical metrics (FPS, accuracy %, measurement precision)
- Professional academic poster layout
- Mark unavailable data as "Not Available"

## Visual Accuracy - CRITICAL
- Reproduce inspection system diagrams accurately
- Include performance comparison tables (CPU vs GPU, accuracy comparisons)
- Show defect detection examples clearly
- High-quality figures only

Begin by searching for all 10 papers and confirming retrieval success before generating the poster.
```