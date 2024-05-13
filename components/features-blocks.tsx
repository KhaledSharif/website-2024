export default function FeaturesBlocks() {
  return (
    <section className="relative mt-16">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0  pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20  transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12 pb-32 pt-8">
          {/* Items */}
          <div className="  flex gap-6 items-center justify-center">
            {[1, 2].map((x, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-6 bg-gray-100 border rounded shadow-md"
              >
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Headless CMS
                </h4>
                <p className="text-gray-600 text-center">
                Examples of how to use NVIDIA Omniverse Isaac Sim for to solve Reinforcement Learning Games (RL-Games) . Examples of how to use NVIDIA Omniverse Isaac Sim for to solve Reinforcement Learning Games (RL-Games)
                </p>
              </div>
            ))}
          </div>

          <div className="  flex gap-6 items-center justify-center">
            {[1, 2].map((x, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-6 bg-gray-100 border rounded shadow-md"
              >
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Headless CMS
                </h4>
                <p className="text-gray-600 text-center">
                Examples of how to use NVIDIA Omniverse Isaac Sim for to solve Reinforcement Learning Games (RL-Games) . Examples of how to use NVIDIA Omniverse Isaac Sim for to solve Reinforcement Learning Games (RL-Games)

                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
