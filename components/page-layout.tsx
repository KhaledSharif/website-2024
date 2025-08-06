import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { ReactNode } from "react";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  breadcrumbs: BreadcrumbSegment[];
  title: string;
  titleIcon?: string;
  description: string;
  headerImage?: {
    src: any;
    alt: string;
  };
  markdownContent?: string;
  children?: ReactNode;
  additionalContent?: ReactNode;
}

export default function PageLayout({
  breadcrumbs,
  title,
  titleIcon,
  description,
  headerImage,
  markdownContent,
  children,
  additionalContent,
}: PageLayoutProps) {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12">
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-full flex items-center justify-center pb-2">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={`breadcrumb-${index}`}>
                        <BreadcrumbItem>
                          {index === breadcrumbs.length - 1 ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={crumb.href}>
                              {crumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Card className="pt-4">
                <CardHeader>
                  <CardTitle>
                    <div>
                      {titleIcon && `${titleIcon} `}
                      {title}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <div>{description}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {headerImage && (
                    <div className="flex w-full items-center justify-center pb-8">
                      <Image 
                        src={headerImage.src} 
                        alt={headerImage.alt} 
                        width={800}
                        height={400}
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                  {children}
                  {markdownContent && (
                    <div className="markdown">
                      <Markdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ children }) => (
                            <div className="table-wrapper">
                              <table>
                                {children}
                              </table>
                            </div>
                          )
                        }}
                      >
                        {markdownContent}
                      </Markdown>
                    </div>
                  )}
                  {additionalContent}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}