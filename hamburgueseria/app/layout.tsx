import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';

const title = "Sin chucu";

export const metadata: Metadata = {
  title: `Hamburgueseria ${title}`,
  description: `Hamburgueseria ${title} - Bahia Blanca`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
