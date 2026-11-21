import { Geist, Geist_Mono, Afacad } from "next/font/google";
import "../styles/globals.scss";
import Navbar from "./ui/navbar";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${afacad.className}`}
      // className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
