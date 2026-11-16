import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Rohan Arya&apos;s Portfolio</title>
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
