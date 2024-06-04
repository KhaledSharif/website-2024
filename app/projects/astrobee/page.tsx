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
import FeaturesElement3 from "@/public/images/astrobee.jpg";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};
const md = `
Astrobee is a collection of free-flying robots developed by NASA to operate inside the International Space Station (ISS). These robots are designed to assist astronauts with routine tasks, conduct experiments, and perform inspections. The software and tools that enable these capabilities are part of the Astrobee Robot Software package, which includes components for autonomous navigation, vision-based localization, and human-robot interaction.

### Sparse Mapping in Astrobee

**Sparse mapping** is a technique used to create a map of an environment by identifying and storing distinctive visual features and their associated 3D positions. This map is used by Astrobee for accurate localization within the ISS. Here’s an overview of how sparse mapping is performed by Astrobee:

#### Components of a Sparse Map
1. **Feature Descriptors**: Unique visual features detected in images.
2. **3D Positions**: The spatial coordinates of these features.
3. **Vocabulary Database**: Enables quick lookup of similar images, facilitating fast feature matching and localization.


### Vocabulary Database in Sparse Mapping


A **Vocabulary Database** is a structured collection of visual features that allows for rapid comparison and matching of images. It is derived from a technique called **Bag of Words (BoW)**, which is commonly used in computer vision and robotics for visual recognition and localization.

#### How It Works

1. **Feature Extraction**:
   - Images captured by Astrobee's cameras are processed to detect distinctive visual features, such as corners, edges, and textures. These features are described using **feature descriptors** (e.g., SIFT, SURF, ORB).
   
2. **Creating the Vocabulary**:
   - A large set of feature descriptors from various images is used to create a vocabulary. This process involves:
     - **Clustering**: Grouping similar feature descriptors into clusters using algorithms like **k-means**.
     - **Visual Words**: Each cluster center becomes a "visual word" in the vocabulary. The set of all visual words forms the vocabulary database.
   
3. **Image Representation**:
   - Each image can be represented as a histogram of visual words. When a new image is processed, its features are matched to the nearest visual words in the vocabulary, creating a histogram that represents the distribution of these words in the image.

4. **Database Creation**:
   - The histograms (representations) of all images are stored in the vocabulary database. This allows for quick comparison between images based on their visual word histograms.

#### Role in Localization

1. **Quick Lookup**:
   - When Astrobee captures a new image and needs to localize itself, it extracts features from the image and creates a histogram using the vocabulary database.
   - This histogram is then compared against the histograms in the vocabulary database to find the most similar images. This process is much faster than directly comparing raw image features.

2. **Feature Matching**:
   - By quickly finding similar images, Astrobee can identify known landmarks and features that have been previously mapped. This helps in accurately determining its current position within the ISS.

3. **Robust Localization**:
   - The vocabulary database enables robust and reliable localization even in complex environments. It can handle variations in lighting, perspective, and partial occlusions, as the visual words are designed to be invariant to such changes.

### Benefits

- **Efficiency**: The vocabulary database allows for rapid image matching, which is crucial for real-time applications like Astrobee's autonomous navigation.
- **Scalability**: As the ISS environment changes or new areas are mapped, the vocabulary database can be updated to include new visual words, ensuring continued accuracy and robustness.
- **Accuracy**: By leveraging a large and diverse set of visual features, the vocabulary database enhances the accuracy of feature matching and localization.


#### Storage Format
- Maps are stored as **protobuf files**, which are a flexible and efficient way to serialize structured data.

### ROS Node for Localization

Astrobee uses a ROS (Robot Operating System) node to process images and localize itself within the map:
- **Inputs**:
  - **Camera Images**: Provided via the \`/hw/cam_nav\` topic.
  - **Map File**: Pre-built sparse map containing feature descriptors and 3D positions.
- **Outputs**:
  - **/localization/mapped_landmarks/features**: Detected visual features in the image.
  - **/localization/mapped_landmarks/registration**: The 3D coordinates of the detected features.

### Tools and Procedures for Map Building

1. **Record a Bag**:
   - Launch the camera node and record images on the robot.
   - Ensure neighboring images have enough overlap and reduced motion blur.
   - Command: \`rosbag record /hw/cam_nav\`

2. **Filter the Bag**:
   - Reduce the frame rate to manage data size.
   - Command: \`rosbag filter input.bag output.bag "(topic == '/hw/cam_nav') and (float(t.nsecs)/1e+9 <= 0.1)"\`

3. **Copy the Bag from the Robot**:
   - Use \`rsync\` to transfer the bag file to a local machine.

4. **Merge Bags**:
   - Combine smaller bag files for easier processing.
   - Command: \`$ASTROBEE_BUILD_PATH/devel/lib/localization_node/merge_bags -output_bag <output bag> <input bags>\`

5. **Extract Images**:
   - Extract images from the bag file for map building.
   - Command: \`$ASTROBEE_BUILD_PATH/devel/lib/localization_node/extract_image_bag <bagfile.bag> -use_timestamp_as_image_name -image_topic /hw/cam_nav -output_directory <output dir>\`

6. **Build a Map**:
   - Construct a map using \`build_map\` tools.
   - Command: \`build_map -feature_detection -feature_matching -track_building -incremental_ba -bundle_adjustment -histogram_equalization -num_subsequent_images 100 images/*jpg -output_map <map file>\`

### Map Visualization and Localization

- **Visualization**: Use \`nvm_visualize\` to view the map and images in 3D.
- **Localize a Single Frame**: Test the localization of an image against the map using \`localize\`.
- **Localize Multiple Frames**: Use \`localize_cams\` to test localization across multiple images and compare positions.

### Enhancing and Maintaining Maps

- **Extract Sub-maps**: Use \`extract_submap.py\` to create smaller maps from a larger map.
- **Merge Maps**: Combine multiple maps using \`merge_maps.py\`.
- **Growing Maps**: Add new images to an existing map using \`grow_map.py\`.
- **Reducing Map Size**: Use \`reduce_map.py\` to eliminate redundant images without sacrificing map quality.

### Strategy for ISS Mapping

Astrobee employs a strategy for creating and maintaining maps on the ISS:
- **Create a Large SURF Map**: For robust feature detection.
- **Create a Smaller BRISK Map**: For faster processing and localization.
- **Regularly Update Maps**: By acquiring new images and integrating them into existing maps while pruning redundant data.

By following these procedures and utilizing the available tools, Astrobee can effectively perform sparse mapping and localization within the dynamic environment of the ISS, ensuring reliable operation and assistance for astronauts.
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
                      <BreadcrumbPage>Astrobee</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>🐝 Astrobee</div>
                  </CardTitle>
                  <CardDescription>
                    <div>Learn about the code running on free-flying robots on the Space Station</div>
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
