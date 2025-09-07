"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SplashScreen from "./components/general/SplashScreen";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);

  return (
    <html lang="en">
      <head>
        <title>Rohan Arya&apos;s Portfolio</title>
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
