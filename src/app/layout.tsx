import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jennjou.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jennjou · Portfolio",
  description: "Ilustración · 3D · Web · APIS · Animación",
  openGraph: {
    title: "Jennjou · Portfolio",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-white text-black antialiased">
        <Navbar />
        <main className="flex-1 w-full px-6 pt-28 pb-16 lg:px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
