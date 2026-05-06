import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "Sam's Suma Mart (SSM) | Official BF Suma Products Distributor",
  description: "Official number 1 app distributor of BF Suma products.",
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
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
