"use client"

import "./globals.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SplashScreen from "../app/components/SplashScreen"
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      return
    }
  }, [isLoading])

  return (
    <html lang="en">
      <head>
        <title>Rohan Arya&apos;s Portfolio</title>
      <body
        className={`${montserrat.className} antialiased`}
      >
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <>
            {children}
          </>
        )}
      </body>
      </head>
    </html>
  );
}
