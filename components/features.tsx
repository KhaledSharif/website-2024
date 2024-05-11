"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg4 from "@/public/images/vslam.jpg";
import FeaturesElement4 from "@/public/images/vslam.gif";

import FeaturesBg2 from "@/public/images/rl.jpg";
import FeaturesElement2 from "@/public/images/rl.gif";

import FeaturesBg3 from "@/public/images/openrag.jpg";
import FeaturesElement3 from "@/public/images/openrag.gif";

import {
  ArrowSquareOut,
  CaretCircleDown,
  CaretCircleUp,
  GithubLogo,
} from "@phosphor-icons/react";

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-3xl mb-4">Open source projects 👇🏼</h1>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-md p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 1 ? "bg-gray-100 shadow-md border-gray-200 hover:shadow-lg" : "bg-white border-gray-400"}`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      Robot Reinforcement Learning
                    </div>
                    <div className="text-gray-700 text-md">
                      This repo has examples of how to use NVIDIA Omniverse
                      Isaac Simulator to train robots to perform tasks using
                      Reinforcement Learning (RL)
                    </div>
                    {tab === 1 && (
                      <div className="text-gray-600 text-sm mt-8">
                        <div>
                          The NVIDIA Omniverse Isaac Simulator (OIS) is a
                          realistic robotic sim that can be used to train robots
                          to perform tasks using Reinforcement Learning (RL) and
                          Proximal Policy Optimization (PPO). In this repo, you
                          can find examples of how to train and evaluate
                          different robots (eg: Franka) on different RL tasks.
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <button className="btn btn-outline btn-neutral text-gray-800 border-gray-300 hover:bg-white hover:border-gray-200 bg-gray-100">
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <CaretCircleUp size={24} />
                  </div>
                </a>
                <a
                  className={`flex items-center p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 2 ? "bg-gray-100 shadow-md border-gray-200 hover:shadow-lg" : "bg-white border-gray-400"}`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      Robot Visual SLAM
                    </div>
                    <div className="text-gray-700 text-md">
                      Quickstart Robot Operating System (ROS) code for running
                      GPU accelerated Simultaneous Localization and Mapping
                      (SLAM) and verifying loop closure in sim
                    </div>
                    {tab === 2 && (
                      <div className="text-gray-600 text-sm mt-8">
                        <div>
                          The NVIDIA Omniverse Isaac Simulator (OIS) is a
                          realistic robotic sim that can be used to train robots
                          to perform tasks using Reinforcement Learning (RL) and
                          Proximal Policy Optimization (PPO). In this repo, you
                          can find examples of how to train and evaluate
                          different robots (eg: Franka) on different RL tasks.
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <button className="btn btn-outline btn-neutral text-gray-800 border-gray-300 hover:bg-white hover:border-gray-200 bg-gray-100">
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <CaretCircleDown size={24} />
                  </div>
                </a>
                <a
                  className={`flex items-center p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 3 ? "bg-gray-100 shadow-md border-gray-200 hover:shadow-lg" : "bg-white border-gray-400"}`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      OpenRAG [Full Stack AI]
                    </div>
                    <div className="text-gray-700 text-md">
                      Open Retrieval Augmented Generation frontend
                      (React/NextJS) and backend (FastAPI) full stack system for
                      local language model development.
                    </div>
                    {tab === 3 && (
                      <div className="text-gray-600 text-sm mt-8">
                        <div>
                          The NVIDIA Omniverse Isaac Simulator (OIS) is a
                          realistic robotic sim that can be used to train robots
                          to perform tasks using Reinforcement Learning (RL) and
                          Proximal Policy Optimization (PPO). In this repo, you
                          can find examples of how to train and evaluate
                          different robots (eg: Franka) on different RL tasks.
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <button className="btn btn-outline btn-neutral text-gray-800 border-gray-300 hover:bg-white hover:border-gray-200 bg-gray-100">
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <CaretCircleDown size={24} />
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 flex justify-center items-center">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {[
                    { bg: FeaturesBg2, fg: FeaturesElement2 },
                    { bg: FeaturesBg4, fg: FeaturesElement4 },
                    { bg: FeaturesBg3, fg: FeaturesElement3 },
                  ].map((x, i) => (
                    <Transition
                      show={tab === i + 1}
                      key={i}
                      appear={true}
                      className="w-full"
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 translate-y-16"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-16"
                      beforeEnter={() => heightFix()}
                      unmount={false}
                    >
                      <div className="relative inline-flex flex-col">
                        <Image
                          className="md:max-w-none mx-auto rounded"
                          src={x.bg}
                          width={500}
                          height="462"
                          alt="Features bg"
                        />
                        <Image
                          className="md:max-w-none absolute w-full px-8 left-0 transform animate-float"
                          src={x.fg}
                          width={500}
                          height="44"
                          alt="Element"
                          style={{ top: "30%" }}
                        />
                      </div>
                    </Transition>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
