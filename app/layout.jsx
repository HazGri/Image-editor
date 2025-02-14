import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Image editor",
  description: "image editor  react and tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${geistSans.variable} h-full ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
