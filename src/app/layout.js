

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LoadingManager from "@/components/loadingManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "We Listen We Don't Judge",
  description: "A platform for anonymous confessions and support",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingManager>
          {children}
        </LoadingManager>  
      </body>
    </html>
  );
}
