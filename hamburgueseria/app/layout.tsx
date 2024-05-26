import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import React from 'react';
import '@/app/ui/global.css';
import SessionWrapper from "@/app/ui/shared/sessionWrapper";
import { auth } from "@/auth";

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
  const session = await auth(); // Await the session promise
  if (!session) {
    return (
      <SessionWrapper>
        <html lang="es">
          <body className={inter.className}>{children}</body>
        </html>
      </SessionWrapper>
    );
  }
  return (
    <SessionWrapper session={session} >
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
