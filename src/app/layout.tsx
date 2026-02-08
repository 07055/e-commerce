import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "LUXE | Minimalist Luxury Home Decor",
  description: "Curated collection of museum-quality minimalist art and decor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main style={{ minHeight: '80vh' }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
