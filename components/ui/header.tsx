"use client";

import { GithubLogo, LinkedinLogo, FilePdf } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="fixed w-full z-30 bg-opacity-90 bg-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="">
            <button>🧑🏻‍💼 Khaled Sharif</button>
          </div>

          <div className="flex gap-4">
            <button>
              <FilePdf size={24} />
            </button>
            <button>
              <GithubLogo size={24} />
            </button>
            <button>
              <LinkedinLogo size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
