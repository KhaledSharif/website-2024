export const metadata = {
  title: "Khaled Sharif",
  description: "Personal Website",
};

import Hero from "@/components/hero";
import Features from "@/components/features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
