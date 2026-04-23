import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Concursos Elite | O Portal do Futuro Servidor",
  description: "As melhores notícias, editais analisados e estratégias para a sua aprovação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L3Z9YV2J6B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L3Z9YV2J6B');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50">
        {/* Header Focado em Concursos */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform">
                C
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900">
                CONCURSOS<span className="text-blue-600">ELITE</span>
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-extrabold uppercase tracking-widest text-gray-500">
              <Link href="/" className="text-blue-600 border-b-2 border-blue-600 pb-1">Início</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Editais Abertos</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Inscrições</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Materiais Gratuitos</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-sm font-bold text-gray-500 hover:text-blue-600">Entrar</button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                ASSINAR SOFIA
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-900 text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-black mb-6">Concursos Elite</h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Transformando a preparação de milhares de brasileiros através da inteligência artificial e jornalismo de alta performance. 
              </p>
            </div>
            <div>
              <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6">Navegação</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">Carreiras Públicas</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Notícias por Estado</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Bancas Organizadoras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Concursos Elite - Arthur Lopes & Sofia IA.
          </div>
        </footer>
      </body>
    </html>
  );
}
