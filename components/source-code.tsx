"use client";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";

type propsType = {
  url: string;
};

export default function SourceCodeButton(props: propsType) {
  return (
    <div className="w-full flex items-center justify-center">
      <a
        href={props.url}
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
  );
}
