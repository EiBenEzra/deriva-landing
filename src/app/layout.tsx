import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Deriva — Canal de Demanda Calificada Inmobiliaria",
  description:
    "Del lead frío a la promesa trazable. Canal de performance comercial que convierte demanda dispersa en compradores calificados y listos para activar salas de venta.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Deriva — Canal de Demanda Calificada Inmobiliaria",
    description: "Del lead frío a la promesa trazable.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${cormorant.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
