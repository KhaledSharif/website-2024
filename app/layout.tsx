import "./css/style.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

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
    <html lang="en">
      <body
        className={`bg-white dark:bg-gray-200`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
