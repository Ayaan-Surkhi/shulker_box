import type { Metadata } from "next";
import { Geist, Geist_Mono, Afacad } from "next/font/google";
import "../styles/globals.scss";
import Navbar from "./ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayaan Surkhi | Personal Blog",
  description: "Yayyy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${afacad.variable}`}
      // className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
