import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arquivo OVNI/UAP — Documentos do Departamento de Defesa dos EUA",
  description:
    "Busca em português nos documentos desclassificados do Pentágono sobre OVNIs e UAPs. Release 01 — Maio 2026. FBI, CIA, USAF, NASA e mais.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-200 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
