import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { SEO_CONFIG } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  openGraph: {
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteName = 'CONCURSOS';
  const accentColor = 'text-blue-600';
  const logoBg = 'bg-blue-600';
  const gaId = SEO_CONFIG.gaId;

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
      <body className="min-h-screen flex flex-col bg-white">
        {/* Header Responsivo e Clean */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className={`w-8 h-8 md:w-10 md:h-10 ${logoBg} rounded-lg md:rounded-xl flex items-center justify-center text-white font-black text-lg md:text-xl group-hover:rotate-6 transition-transform`}>
                {siteName.charAt(0)}
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900">
                {siteName}<span className={accentColor}> FONT</span>
              </span>
            </Link>

            {/* Nav escondida no mobile para evitar quebra */}
            <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-gray-900">Início</Link>
              <Link href="/concursos" className="hover:text-gray-900">Editais</Link>
              <Link href="/concursos" className="hover:text-gray-900">Inscrições</Link>
            </nav>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* <Link href="#" className="hidden sm:block text-xs font-bold text-gray-500 hover:text-gray-900">Entrar</Link> */}
              <a 
                href={`https://wa.me/556792943130?text=Olá%20Sofia,%20quero%20me%20inscrever%20na%20Newsletter%20Font!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${logoBg} text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black hover:opacity-90 transition-all shadow-md flex items-center space-x-2`}
              >
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="hidden xs:inline">WHATSAPP</span>
                <span className="inline xs:hidden">WHATS</span>
              </a>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-50 border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              © {new Date().getFullYear()} CONCURSOS FONT - Arthur Lopes & Sofia IA
            </div>
            <div className="flex justify-center space-x-6 text-[10px] font-bold text-gray-300">
              {/* <Link href="#">Privacidade</Link>
              <Link href="#">Termos</Link>
              <Link href="#">Suporte</Link> */}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
