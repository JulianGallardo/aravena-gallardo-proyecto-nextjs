import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import React from "react";
import "@/app/ui/global.css";
import SessionWrapper from "@/app/ui/shared/sessionWrapper";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/app/ui";
import { Footer } from "@/app/ui";
import { Bounce, ToastContainer } from "react-toastify";
import GoToAdmin from "./ui/admin/GoToAdmin";


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

      <body className={`${inter.className} flex flex-col min-h-screen bg-lightgrey`}>
        <SessionWrapper>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <GoToAdmin/>
          <ToastContainer 
            position="top-center"
            autoClose={1000}
            transition={Bounce}
          />
        </SessionWrapper>
      </body>
    </html>
  );
}
