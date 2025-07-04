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
  title: "DontJudge — We Listen, We Don’t Judge",
  icons: {
    icon: '/favicon.png', // or .png or .ico
  },
  description: "Send and receive anonymous confessions. No one will judge🤫",
  metadataBase: new URL('https://dontjudge.vercel.app'),
  openGraph: {
      title: "We Listen We Don't Judge",
      description: "Send and receive anonymous confessions. No one will judge🤫",
      url: "https://dontjudge.vercel.app",
      images: [
        {
          url: "/opengraph-image.png", // this will return PNG
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
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
