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
import Markdown from "react-markdown";
import SourceCodeButton from "@/components/source-code";

export const metadata = {
  title: "Projects",
  description: "Personal Website",
};

const md = `
NVIDIA Omniverse is a groundbreaking real-time 3D graphics collaboration platform that has made significant inroads in the visual effects and 
"digital twin" industrial simulation industries. Central to its functionality is the extensive use of the Universal Scene Description (USD) 
format, which allows for the efficient and detailed description of complex scenes. One of the key applications built on Omniverse is 
NVIDIA Isaac Sim, a powerful tool that enables developers to design, simulate, test, and train AI-based robots 
and autonomous machines within a highly realistic, physically-based virtual environment.

Isaac Sim is not only built on NVIDIA Omniverse but is also fully extensible. This means that developers can customize 
the simulator to fit specific needs or integrate core Isaac Sim technologies into their existing testing and validation 
workflows. This extensibility makes it particularly useful for developing sophisticated robotic tasks, such as opening 
cabinets, which we will explore using the \`omniverse-gym\` framework.

### Step 1: Installation

The first step in this process is to install Isaac Sim. NVIDIA provides comprehensive documentation to guide you through installing 
the latest release, which as of now is 2023.1.1. Following these instructions ensures that you have a stable and fully functional simulation environment.

Once Isaac Sim is installed, you need to clone the \`omniverse-gym\` repository from GitHub. This repository contains the necessary tools and frameworks 
to facilitate reinforcement learning (RL) tasks within Isaac Sim. After cloning the repository, navigate to its directory.

Next, you need to set the \`PYTHON_PATH\` environment variable to point to the Python executable provided by Isaac Sim. 
This executable is typically named \`python.sh\`. Setting this path correctly is crucial because it ensures that all subsequent 
Python commands use the correct version and environment tailored for Isaac Sim.

Finally, install the dependencies required by \`omniverse-gym\` using the Isaac Sim Python executable. This step involves 
running a command that installs the repository in editable mode along with all its dependencies, ensuring that your environment 
is correctly set up for development and training.

### Step 2: Create a Custom Task for Cabinet Opening

With the environment set up, the next step is to create a custom task for the robot. In the \`omniverse-gym\` repository, create 
a new configuration file for the cabinet opening task. This file will define all the parameters and logic necessary for the task.

Defining the task logic involves specifying how the robot and cabinet are initialized, how the robot interacts with the cabinet, 
and how the reward structure is designed. The reward structure is particularly important in reinforcement learning, as it provides feedback to the robot 
on its performance. For instance, you might design a reward system where the robot receives positive feedback for successfully opening the cabinet and 
less or no reward for other actions.

Observations, which are essentially the state information that the robot uses to make decisions, also need to be defined. This can include the robot's 
current position, the position of the cabinet door, and other relevant parameters.

### Step 3: Train the Model

After configuring the task, update the training script to include this new task configuration. This step ensures that the \`omniverse-gym\` framework 
recognizes the new task and can train a model on it.

Training the robot involves using a reinforcement learning algorithm, such as Proximal Policy Optimization (PPO). The training process typically 
involves running the simulation environment repeatedly, allowing the robot to learn through trial and error. Over time, the robot uses the reward 
structure to improve its performance, learning to open the cabinet more efficiently.

### Step 4: Evaluate the Model

Once training is complete, it's time to evaluate the model. This involves running the environment in test mode using the saved model checkpoint. 
By doing so, you can observe how well the robot performs the task of opening the cabinet based on what it learned during training.

This step is crucial for validating the effectiveness of the training process. If the robot performs well, it indicates that the reward structure 
and task logic were well designed. If not, you might need to refine these elements and retrain the model.

### Conclusion

By following these steps, you can leverage the powerful capabilities of NVIDIA Omniverse Isaac Sim and the \`omniverse-gym\` framework to train 
robots for specific tasks like opening cabinets. This process involves setting up the simulation environment, defining custom tasks, training 
the robot using reinforcement learning, and evaluating its performance. Customizing the task logic and reward structure as needed can help 
improve the training outcomes, leading to more efficient and effective robotic solutions.
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
                      <BreadcrumbPage>Omniverse Gym</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>🦾 Omniverse Gym</div>
                  </CardTitle>
                  <CardDescription>
                    <div>Train robots to perform tasks like opening cabinets with reinforcement learning</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full items-center justify-center pb-8">
                  <video src={"/videos/omniverse-gym.webm"} autoPlay muted loop className="w-full"/>
                  </div>
                  <SourceCodeButton url={"https://github.com/khaledsharif/omniverse-gym"}/>
                  <div className="markdown mt-6">
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
