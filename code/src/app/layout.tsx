import type {Metadata} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurancy - Hello World",
  description: "Os melhores restaurantes do mundo",
  keywords: ["restaurante", "comida", "comer", "jantar", "almoço"],
};

//se defirmos metadata no layout, ela sera espelhada pra todos os pages children

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
        <header className="text-xl font-bold leading-[3rem]">Restaurancy</header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[3rem] opacity-70">
          © {new Date().getFullYear()} Restaurancy
        </footer>
      </body>
    </html>
  );
}
