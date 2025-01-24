import type { Metadata } from "next";

// fonts
import { Roboto } from "next/font/google";
// Components
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Navbar";
// Styles
import "./globals.css";


const geistRoboto = Roboto({
  weight: ['400', '700'],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Movie Store",
  description: "Tienda de peliculas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistRoboto.className} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
