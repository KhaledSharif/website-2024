"use client";

import { GithubLogo, LinkedinLogo, FilePdf } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="fixed w-full z-30 bg-opacity-90 bg-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/">👦🏻 Khaled Sharif</a>

          <div className="flex gap-4">
            <a href="/pdf/cv.pdf" target="_blank">
              <FilePdf size={24} />
            </a>
            <a href="https://github.com/khaledsharif" target="_blank">
              <GithubLogo size={24} />
            </a>
            <a href="https://www.linkedin.com/in/khsharif" target="_blank">
              <LinkedinLogo size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
