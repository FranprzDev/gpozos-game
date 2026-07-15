import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "GPozos · Desafío de optimización", description: "Juego de optimización de cañerías" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
