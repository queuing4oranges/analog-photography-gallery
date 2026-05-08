import "./globals.css";
import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";
import Navbar from "./components/Navbar";

export const dynamic = "force-dynamic"; // needs to build dynamic since there are dynamic functions etc.

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const playfair = Playfair_Display({
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Analog Archives",
  description: "A collection of analog snapshots"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrains.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Navbar />
        <div className="divider" />
        {children}
      </body>
    </html>
  );
}
