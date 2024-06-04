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
import FeaturesElement3 from "@/public/images/robots.gif";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md = `
Fine manipulation tasks such as threading cable ties or slotting a battery are notoriously difficult for robots. These tasks demand precision, careful coordination of contact forces, and closed-loop visual feedback. Traditionally, achieving such precision has required high-end robots, accurate sensors, or meticulous calibration, all of which can be prohibitively expensive and complex to set up. However, recent advancements in machine learning, particularly in imitation learning and reinforcement learning (RL), suggest that even low-cost and imprecise hardware can perform these fine manipulation tasks effectively. This is where our novel approach, Action Chunking with Transformers (ACT), comes into play.

### Overcoming Challenges in Robot Learning

Imitation learning, while promising, introduces its own set of challenges, especially in high-precision domains. Errors in the policy can compound over time, and human demonstrations can be non-stationary, leading to inconsistent learning outcomes. To address these challenges, we have developed ACT, a simple yet innovative algorithm that leverages a generative model over action sequences. This allows the robot to learn and execute complex tasks with impressive success rates, all while utilizing only a modest amount of demonstration data.

### Data Collection through Teleoperation

The foundation of our approach lies in the collection of demonstration data. Using a custom teleoperation interface, human operators control the robots to perform specific tasks. This process captures crucial data, including:
- **Joint Positions**: Both the positions of the human-operated leader and the robot follower.
- **Observations**: Visual data from multiple cameras and the robot's joint positions, providing a comprehensive view of the task environment.

### Training the ACT Model

The core of our system is the ACT model, which combines a Conditional Variational Autoencoder (CVAE) with a Transformer architecture. This training process involves several critical steps:

#### Latent Space Representation with CVAE

The CVAE plays a pivotal role in compressing the high-dimensional data into a manageable latent space:
- **Encoder**: Processes joint positions and actions, transforming them into a latent variable \( z \).
- **Decoder**: Utilizes this latent variable \( z \) along with current observations to predict a sequence of future actions.

#### Transformer Architecture for Sequence Prediction

Transformers, known for their prowess in handling sequential data, are integral to our model:
- **Encoder-Decoder Structure**: The Transformer encoder processes observation inputs, such as visual data and joint positions, while the decoder predicts action sequences based on these inputs.
- **Action Chunking**: Instead of predicting individual actions, the model forecasts sequences of actions, effectively reducing the task's horizon and mitigating the issue of compounding errors.

### Optimizing Training Objectives

Our training objectives focus on two primary goals:
- **Reconstruction Loss**: Minimizing the difference between predicted actions and actual actions to ensure accuracy.
- **KL-Divergence Regularization**: Structuring the latent space \( z \) effectively, promoting robust and generalizable learning.

### Inference and Execution: Coordinated Robot Movements

Once trained, the ACT model enables the robot to generate action sequences based on current observations and the mean of the prior distribution of \( z \). During task execution, the model employs temporal ensembling to ensure smooth and precise movements:
- **Temporal Ensembling**: The policy generates overlapping action chunks at each timestep. These predictions are combined using an exponential weighting scheme, which prioritizes recent predictions while still considering older ones. This approach ensures smoother transitions and reduces the likelihood of abrupt or erratic movements.

### Advantages of ACT in Robot Manipulation

The ACT model offers several significant advantages for fine-grained manipulation tasks:
- **Reduction of Compounding Errors**: By predicting sequences of actions, the model minimizes the accumulation of small errors over time, enhancing overall task accuracy.
- **Handling Non-Markovian Behavior**: The model can accommodate pauses and other non-Markovian behaviors observed in human demonstrations, improving robustness and reliability.
- **Smooth and Precise Actions**: Temporal ensembling ensures that the robot's movements are smooth and precise, which is crucial for tasks that require high levels of dexterity.

### Real-World Applications and Success

Our system has been tested on six challenging tasks in real-world settings, such as opening a translucent condiment cup and slotting a battery. Remarkably, it achieves success rates of 80-90% with only 10 minutes of demonstration data. This highlights the potential of ACT to transform how robots perform fine manipulation tasks, making sophisticated robotic capabilities accessible even with low-cost hardware.

In conclusion, the ACT model represents a significant leap forward in the field of robot manipulation. By leveraging advanced machine learning techniques and structured data processing strategies, it enables robots to perform complex tasks with precision and reliability. This breakthrough not only democratizes access to advanced robotic capabilities but also paves the way for more widespread adoption of robots in various industries, from manufacturing to healthcare.
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
                      <BreadcrumbPage>Robot Transformers</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>💭 Robot Transformers</div>
                  </CardTitle>
                  <CardDescription>
                    <div>
                      Robots can plan and coordinate to manipulate objects using
                      Action Chunking Transformers (ACT)
                    </div>
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
