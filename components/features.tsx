"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg4 from "@/public/images/vslam.jpg";
import FeaturesBg2 from "@/public/images/rl.jpg";
import FeaturesBg3 from "@/public/images/robots.jpg";

import { buttonVariants } from "@/components/ui/button";

import {
  ArrowSquareOut,
  CaretCircleDown,
  CaretCircleUp,
  GithubLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

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
      <div
        className="absolute inset-0 bg-background pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-border transform -translate-y-1/2"></div>

      <div className="relative max-w-none lg:max-w-6xl mx-auto">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="text-3xl mb-1">Open source projects 👇🏼</div>
            <Link
              href="/projects"
              className={buttonVariants({ variant: "ghost" })}
            >
              <div className="text-lg underline text-muted-foreground">View All</div>
            </Link>
          </div>

          <div className="md:grid md:grid-cols-12 gap-1 xl:gap-4 mx-2">
            <div className="max-w-lg mx-auto col-span-6" data-aos="fade-right">
              <div className="mb-8 md:mb-0">
                <div
                  className={`flex items-center text-md p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 1 ? "bg-background shadow-md border-border hover:shadow-lg cursor-pointer" : "cursor-default bg-background border-border"}`}
                  onClick={() => {
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      Robot Reinforcement Learning
                    </div>
                    <div className="text-foreground text-md">
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
                          different robots (eg: Franka) on different RL tasks
                          (eg: opening a cabinet drawer)
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <a
                            href="https://github.com/KhaledSharif/omniverse-gym"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-neutral text-gray-800 
                            border-gray-100 hover:bg-white hover:border-gray-600 border bg-gray-100
                            flex p-4 items-center justify-center gap-2 rounded-lg
                            "
                          >
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    {tab === 1 ? (
                      <CaretCircleUp size={24} />
                    ) : (
                      <CaretCircleDown size={24} />
                    )}
                  </div>
                </div>
                <div
                  className={`flex items-center p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 2 ? "bg-background shadow-md border-border hover:shadow-lg cursor-pointer" : "cursor-default bg-background border-border"}`}
                  onClick={() => {
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      Robot Visual Localization
                    </div>
                    <div className="text-foreground text-md">
                      Quickstart Robot Operating System (ROS) code for running
                      GPU accelerated Simultaneous Localization and Mapping
                      (SLAM) and verifying loop closure in sim
                    </div>
                    {tab === 2 && (
                      <div className="text-gray-600 text-sm mt-8">
                        <div>
                          This repository provides quickstart Robot Operating
                          System (ROS) code for running GPU-accelerated
                          Simultaneous Localization and Mapping (SLAM) and
                          verifying loop closure in simulation. It includes
                          examples for running Visual SLAM in ROS using the
                          NVIDIA Omniverse Isaac Simulator (OIS) and persisting
                          sim data to disk using ROS bags.
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <a
                            href="https://github.com/KhaledSharif/ros-vslam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-neutral text-gray-800 
                            border-gray-100 hover:bg-white hover:border-gray-600 border bg-gray-100
                            flex p-4 items-center justify-center gap-2 rounded-lg
                            "
                          >
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    {tab === 2 ? (
                      <CaretCircleUp size={24} />
                    ) : (
                      <CaretCircleDown size={24} />
                    )}
                  </div>
                </div>
                <div
                  className={`flex items-center p-5 rounded border transition duration-300 ease-in-out mb-3 
                  ${tab !== 3 ? "bg-background shadow-md border-border hover:shadow-lg cursor-pointer" : "cursor-default bg-background border-border"}`}
                  onClick={() => {
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-lg">
                      Robot Cooperative Planning
                    </div>
                    <div className="text-foreground text-md">
                      Train and evaluate a pair of robot arms to cooperatively
                      plan and manipulate multiple objects using an Action
                      Chunking Transformer (ACT)
                    </div>
                    {tab === 3 && (
                      <div className="text-gray-600 text-sm mt-8">
                        <div>
                          This repository contains quickstart code to train and
                          evaluate an Action Chunking Transformer (ACT) to
                          perform various manipulation tasks in the ALOHA gym
                          environment. In the Insertion task, shown in the
                          animation, both arms of the robot must coordinate to
                          insert one object into the other.
                        </div>
                        <div className="mt-8 w-full flex items-center justify-center">
                          <a
                            href="https://github.com/KhaledSharif/robot-transformers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-neutral text-gray-800 
                            border-gray-100 hover:bg-white hover:border-gray-600 border bg-gray-100
                            flex p-4 items-center justify-center gap-2 rounded-lg
                            "
                          >
                            <GithubLogo size={24} />
                            Source Code
                            <ArrowSquareOut size={24} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    {tab === 3 ? (
                      <CaretCircleUp size={24} />
                    ) : (
                      <CaretCircleDown size={24} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div
                className="relative flex flex-col text-center lg:text-right col-span-6"
                data-aos="zoom-y-out"
                ref={tabs}
              >
                {[
                  { bg: FeaturesBg2, fg: "/videos/omniverse-gym.webm" },
                  { bg: FeaturesBg4, fg: "/videos/ros-vslam.webm" },
                  { bg: FeaturesBg3, fg: "/videos/robot-transformers.webm" },
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
                    <div className="relative inline-flex flex-col 2xl:w-[38rem] lg:w-[32rem] md:w-[25rem] w-full">
                      <Image
                        className="rounded object-contain"
                        src={x.bg}
                        alt="Features bg"
                      />
                      <video
                        autoPlay
                        muted
                        loop
                        className="absolute w-full px-3 object-contain"
                        src={x.fg}
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
    </section>
  );
}
