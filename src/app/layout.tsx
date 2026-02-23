import "./globals.css";
import ChalkboardCanvas from "../components/ChalkboardCanvas";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jennjou.com"),
  title: "Jennjou · Portfolio",
  description: "Ilustración · 3D · Web · APIs · Animación",
  openGraph: {
    title: "Jennjou · Portfolio",
    images: [{ url: "/images/logo-optimized.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative flex min-h-screen flex-col bg-[#e2e2e2] text-black antialiased">
        <ChalkboardCanvas />
        <Navbar />
        <main className="flex-1 w-full px-6 pb-16 lg:px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
