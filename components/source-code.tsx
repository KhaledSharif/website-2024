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
        className="btn btn-outline btn-neutral text-foreground
border-border hover:bg-background hover:border-border border bg-muted
                            flex p-4 items-center justify-center gap-2 rounded-lg
                            "
      >
        <GithubLogo size={24} />
        <span className="font-accent">Source Code</span>
        <ArrowSquareOut size={24} />
      </a>
    </div>
  );
}
