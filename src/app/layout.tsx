import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Url shortener",
  description: "Easy url shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  h-full relative`}>
        <div className="relative flex flex-col min-h-screen h-screen">
          <NavBar />
          <main className="flex-grow flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster richColors closeButton={true} />
      </body>
    </html>
  );
}
