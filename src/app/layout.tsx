import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portal de Elite | Notícias e Inteligência",
  description: "O portal definitivo para concursos, relacionamentos e prosperidade bíblica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        {/* Header de Elite */}
        <header className="sticky top-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
              PORTAL<span className="text-blue-600">ELITE</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link href="/concursos" className="hover:text-blue-600 transition-colors">Concursos</Link>
              <Link href="/relacionamentos" className="hover:text-blue-600 transition-colors">Relacionamentos</Link>
              <Link href="/riqueza" className="hover:text-blue-600 transition-colors">Riqueza Abençoada</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                Assinar Sofia
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t border-gray-100 dark:border-gray-800 py-12 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold mb-4">Portal Elite</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Inteligência e automação a serviço da sua evolução. Onde a IA encontra o conteúdo de alta performance.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ninhos</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/concursos">Carreiras Públicas</Link></li>
                <li><Link href="/relacionamentos">Vida a Dois</Link></li>
                <li><Link href="/riqueza">Prosperidade Bíblica</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/termos">Termos de Uso</Link></li>
                <li><Link href="/privacidade">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Portal Elite - Arthur Lopes & Sofia IA. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
