"use client";

import { useState, useRef, Fragment } from "react";
import type { StaticImageData } from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { PlayCircle } from "@phosphor-icons/react";

interface ModalVideoProps {
  thumb: StaticImageData;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <div className="min-h-[40vh]">
        <div className="relative flex justify-center mb-8">
          <div className="flex flex-col justify-center z-10">
            <Image
              src={thumb}
              width={thumbWidth}
              height={thumbHeight}
              alt={thumbAlt}
            />
          </div>
          <button
            className="btn absolute top-full flex items-center transform -mt-8 h-20 z-20
            rounded-full font-medium group shadow-lg
            text-sm px-4 gap-2
            text-foreground hover:text-foreground/80 hover:bg-background
hover:border-border border-border bg-muted
            "
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <PlayCircle size={32} />
            Watch Astrobee map the ISS (1 min 23 sec)
          </button>
        </div>
      </div>

      <Transition
        show={modalOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
          <Transition.Child
            className="fixed inset-0 z-[99999] bg-background bg-opacity-75 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />

          <Transition.Child
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ttransition ease-out duration-200"
            leaveFrom="oopacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="max-w-6xl mx-auto h-full flex items-center">
              <Dialog.Panel className="w-full max-h-full aspect-video bg-background overflow-hidden">
                <video
                  ref={videoRef}
                  width={videoWidth}
                  height={videoHeight}
                  loop
                  controls
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
