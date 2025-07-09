import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
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
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main className="pt-20 max-w-4xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
