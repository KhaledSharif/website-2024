"use client";

import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer>
      <Section className="mt-0 xl:mt-32">
        <Container className="flex w-full justify-between">
          <div className="w-48 lg:w-72 text-gray-700">
            kldsrf.com is a collection of my projects, publications, and notes
            to share with the world my passion for robotics
          </div>

          <div className="flex flex-col gap-2 text-right text-gray-600">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
          </div>
        </Container>
        <Container className="border-t flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <div className="flex gap-2">
            <a href="https://github.com/khaledsharif" target="_blank">
              <Button
                variant="outline"
                className="flex gap-1 justify-center text-sm font-light hover:bg-white bg-gray-50"
              >
                <GithubLogo />
                @khaledsharif
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/khsharif" target="_blank">
              <Button
                variant="outline"
                className="flex gap-1 justify-center text-sm font-light hover:bg-white bg-gray-50"
              >
                <LinkedinLogo />
                @khsharif
              </Button>
            </a>
          </div>
          <p className="text-gray-600">👨🏽‍💻 Designed & coded by me</p>
        </Container>
      </Section>
    </footer>
  );
}
