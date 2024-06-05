"use client";

import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="w-64 text-gray-700">
            kldsrf.com is a collection of my projects, publications, and notes
            to share my passion for robotics with the world
          </div>
          <div className="flex flex-col gap-2">
            <h5>Website</h5>
            <Link href="/">Blog</Link>
            <Link href="/">Authors</Link>
            <Link href="/">Categories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Legal</h5>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </Container>
        <Container className="border-t flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex gap-1 justify-center text-[0.8rem] font-light"
            >
              <GithubLogo />
              @khaledsharif
            </Button>
            <Button
              variant="outline"
              className="flex gap-1 justify-center text-[0.8rem] font-light"
            >
              <LinkedinLogo />
              @khsharif
            </Button>
          </div>
          <p className="text-gray-600">👨🏽‍💻 Designed & coded by me</p>
        </Container>
      </Section>
    </footer>
  );
}
