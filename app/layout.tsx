import "./css/style.css";
import { Domine, Neuton, Quicksand } from "next/font/google";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-domine",
  display: "swap",
});

const neuton = Neuton({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-neuton",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "Khaled Sharif",
  description: "Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to light mode if localStorage is not available
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${domine.variable} ${neuton.variable} ${quicksand.variable}`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
