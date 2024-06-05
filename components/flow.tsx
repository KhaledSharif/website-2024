"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        `z-10 flex h-[2rem] md:h-12 w-[4rem] md:w-[6rem] items-center justify-center gap-1 text-[0.5rem] md:text-sm
        rounded-full border-2 border-border bg-white p-1 md:p-3`,
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamMultipleInputDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="
      relative flex h-full w-full  
      items-center justify-center overflow-hidden 
      rounded-lg border bg-gray-50 py-6 px-12 shadow-md
      "
      ref={containerRef}
    >
      <div
        className="
      flex h-full w-full flex-row 
      items-stretch justify-between gap-10
      "
      >
        <div className="flex flex-col justify-center gap-2 text-sm">
          <Circle ref={div1Ref}>
            <div>📷</div>
            Left
          </Circle>

          <Circle ref={div2Ref}>
            <div>📷</div>
            Right
          </Circle>

          <Circle ref={div4Ref}>
            <div>🧭</div>
            IMU
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref}>
            <div>🧠</div>VSLAM
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div5Ref}>
            <div>📍</div>Pose
          </Circle>
          <Circle ref={div7Ref}>
            <div>🗺️</div>Map
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div5Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}
