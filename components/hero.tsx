import VideoThumb from "@/public/images/hero-image.png";
import ModalVideo from "@/components/modal-video";

export default function Hero() {
  return (
    <section className="relative">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
              >
                Hi there! 👋🏼 I'm Khaled, a robotics engineer at NASA working on
                Astrobee: a robot currently flying around the International
                Space Station (ISS) assisting astronauts. I'm passionate about
                artificial intelligence and autonomous space exploration.
              </p>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/astrobee.webm"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
