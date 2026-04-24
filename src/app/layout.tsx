import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "Portal Elite | Inteligência em Conteúdo",
  description: "As melhores notícias e estratégias para a sua evolução.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const host = headerList.get('x-forwarded-host') || headerList.get('host') || '';

  // Customização de Marca por Domínio
  let siteName = 'CONCURSOS';
  let accentColor = 'text-blue-600';
  let logoBg = 'bg-blue-600';
  let gaId = 'G-L3Z9YV2J6B'; // Padrão Concursos

  const isCasamento = host.includes('casamento') || host.includes('relacionamentos');
  const isRiqueza = host.includes('riqueza') || host.includes('abencoada');

  if (isCasamento) {
    siteName = 'VIDA A DOIS';
    accentColor = 'text-rose-600';
    logoBg = 'bg-rose-600';
  } else if (isRiqueza) {
    siteName = 'RIQUEZA';
    accentColor = 'text-emerald-600';
    logoBg = 'bg-emerald-600';
  }

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
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <Link href="#" className="hover:text-gray-900">Novidades</Link>
              <Link href="#" className="hover:text-gray-900">Contato</Link>
            </nav>

            <button className={`${logoBg} text-white px-6 py-3 rounded-2xl text-xs font-black hover:opacity-90 transition-all shadow-lg`}>
              ASSINAR AGORA
            </button>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              © {new Date().getFullYear()} {siteName} ELITE - Arthur Lopes & Sofia IA
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
