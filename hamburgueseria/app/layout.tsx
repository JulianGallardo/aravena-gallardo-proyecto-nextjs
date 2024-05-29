import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import React from 'react';
import '@/app/ui/global.css';
import SessionWrapper from "@/app/ui/shared/sessionWrapper";
import  Header  from "@/app/ui/shared/header";
import  Footer  from "@/app/ui/shared/footer";

const title = "ByteBurgers";

export const metadata: Metadata = {
  title: title,
  description: `Hamburgueseria ${title} - Bahia Blanca`
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SessionWrapper  >
      <html lang="es">

        <body className={inter.className}>
          <Header isTransparent={true} />
          {children}
          <Footer />  
          </body>
      </html>
    </SessionWrapper>
  );
}
