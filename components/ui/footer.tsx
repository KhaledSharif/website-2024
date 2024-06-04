export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex justify-center gap-8 py-8 md:py-12 border-t border-gray-200">
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Projects</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="https://github.com/KhaledSharif/omniverse-gym"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Omniverse Gym
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/KhaledSharif/ros-vslam"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  ROS VSLAM
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/KhaledSharif/robot-transformers"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Robot Transformers
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Publications</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="https://ieeexplore.ieee.org/document/9697672"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  HPC For Space Robots
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://ieeexplore.ieee.org/document/9843392"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Lunar Pit Exploration
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://ieeexplore.ieee.org/document/9438401"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Autonomous Micro Rovers
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Social</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="/pdf/cv.pdf"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Resume (CV)
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.linkedin.com/in/khsharif"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/khaledsharif"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
