import { Geist, Geist_Mono } from "next/font/google";
import { archivo } from "./fonts";
import "./globals.css";
import LoadingManager from "@/components/loadingManager";
import Title from "@/components/title";

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
  description: "Send and receive anonymous confessions. No one will judge🤫",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <LoadingManager>
            <Title />
            {children}
          </LoadingManager>
      </body>
    </html>
  );
}
