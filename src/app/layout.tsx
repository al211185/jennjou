import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jennjou.com"
  ),
  title: "Jennjou · Portfolio",
  description: "Ilustración · 3D · Web · APIS · Animación",
  openGraph: {
    title: "Jennjou · Portfolio",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="snap-y snap-proximity">
      <body className="flex min-h-screen flex-col bg-[#e2e2e2] text-black antialiased scroll-pt-28">
        <Navbar />
        <main className="flex-1 w-full px-6 pb-16 lg:px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
