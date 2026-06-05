import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rithika Diamonds | Crafting Exclusive Diamond Masterpieces",
  description: "Crafting exclusive diamond masterpieces that merge high art with luxury craftsmanship since 2004.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome CDN for Luxury UI Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body>
        <AppProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <TopBar />
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
