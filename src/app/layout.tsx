import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "Concursos Elite | A Sua Aprovação Começa Aqui",
  description: "As melhores notícias, editais analisados e estratégias para você conquistar sua vaga em 2026.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Foco exclusivo no Portal de Concursos
  const siteName = 'CONCURSOS';
  const accentColor = 'text-blue-600';
  const logoBg = 'bg-blue-600';
  const gaId = 'G-L3Z9YV2J6B';

  return (
    <html lang="pt-BR">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className={`w-10 h-10 ${logoBg} rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform`}>
                {siteName.charAt(0)}
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900">
                {siteName}<span className={accentColor}>ELITE</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-gray-900">Início</Link>
              <Link href="#" className="hover:text-gray-900">Editais Abertos</Link>
              <Link href="#" className="hover:text-gray-900">Inscrições</Link>
              <Link href="#" className="hover:text-gray-900">Materiais Gratuitos</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="#" className="text-xs font-bold text-gray-500 hover:text-gray-900">Entrar</Link>
              <a 
                href={`https://wa.me/556792943130?text=Olá%20Sofia,%20quero%20me%20inscrever%20na%20Newsletter%20Elite!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${logoBg} text-white px-6 py-3 rounded-2xl text-xs font-black hover:opacity-90 transition-all shadow-lg flex items-center space-x-2`}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>NEWSLETTER WHATSAPP</span>
              </a>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              © {new Date().getFullYear()} CONCURSOS ELITE - Arthur Lopes & Sofia IA
            </div>
            <div className="flex justify-center space-x-6 text-xs font-bold text-gray-300">
              <Link href="#">Privacidade</Link>
              <Link href="#">Termos</Link>
              <Link href="#">Suporte</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
