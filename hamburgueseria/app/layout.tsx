import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import React from 'react';
import '@/app/ui/global.css';
import SessionWrapper from "@/app/ui/shared/sessionWrapper";

const title = "ByteBurgers";

export const metadata: Metadata = {
  title: title,
  description: `Hamburgueseria ${title} - Bahia Blanca`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
