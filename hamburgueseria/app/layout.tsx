import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import React from "react";
import "@/app/ui/global.css";
import SessionWrapper from "@/app/ui/shared/sessionWrapper";
import { Header } from "@/app/ui";
import { Footer } from "@/app/ui";
import FooterDev from "./ui/shared/footerDev";

const title = "ByteBurgers";

export const metadata: Metadata = {
  title: title,
  description: `Hamburgueseria ${title} - Bahia Blanca`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionWrapper>
          <Header isTransparent={false} />
          <main className="flex-grow">
            {children}
          </main>
          <FooterDev />
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
