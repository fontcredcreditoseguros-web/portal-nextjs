import { supabase } from '@/lib/supabaseClient';
import DensePostRow from '@/components/DensePostRow';
import PostCard from '@/components/PostCard';
import { MapPin, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function ConcursosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const uf = estado?.toUpperCase();

  let query = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .eq('niche', 'concursos');

  if (uf) {
    // Busca exata pela coluna UF (100% de precisão)
    query = query.eq('uf', uf);
  }

  const { data: posts } = await query.order('published_at', { ascending: false });
  
  // Lógica de Separação Inteligente com Filtro de Validade
  const currentYear = new Date().getFullYear();
  
  const radarPosts = (posts || []).filter(p => {
    const hasStructuredData = p.excerpt && p.excerpt.includes('|');
    if (!hasStructuredData) return false;

    // Filtro Ultra-Rigoroso: Proíbe qualquer ano entre 2010 e 2025 no título
    // Isso remove "PGE 2021", "Detran 2023", etc.
    const hasOldYear = /20(1[0-9]|2[0-5])\b/.test(p.title);
    if (hasOldYear) return false;

    return true;
  });

  const newsPosts = (posts || []).filter(p => {
    const isRadar = radarPosts.some(r => r.id === p.id);
    return !isRadar;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <Link href="/" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest mb-4 block">
            ← Voltar para a Início
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center">
                {uf ? (
                  <>
                    <MapPin className="mr-3 text-blue-600" size={32} />
                    Concursos em <span className="text-blue-600 ml-2">{uf}</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="mr-3 text-blue-600" size={32} />
                    Todos os <span className="text-blue-600 ml-2">Editais</span>
                  </>
                )}
              </h1>
              <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-[10px]">
                {radarPosts.length} {radarPosts.length === 1 ? 'edital aberto encontrado' : 'editais abertos encontrados'}
              </p>
            </div>
            
            {/* Seletor Rápido de Região (Opcional) */}
            <div className="flex flex-wrap gap-2">
               {['SP', 'RJ', 'MG', 'DF', 'PR', 'RS', 'SC', 'BA', 'PE', 'CE', 'PA', 'GO', 'MS', 'MT'].map(state => (
                 <Link 
                   key={state}
                   href={`/concursos?estado=${state}`}
                   className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${uf === state ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600'}`}
                 >
                   {state}
                 </Link>
               ))}
            </div>
          </div>
        </div>

        {(radarPosts.length > 0 || newsPosts.length > 0) ? (
          <div className="space-y-12">
            
            {/* Radar de Editais */}
            {radarPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                   <div className="w-2 h-6 bg-blue-600 rounded-full" />
                   <h2 className="text-xl font-black text-gray-900">Radar de Editais Abertos</h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {radarPosts.map((post) => (
                    <DensePostRow key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Notícias */}
            {newsPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                   <div className="w-2 h-6 bg-orange-500 rounded-full" />
                   <h2 className="text-xl font-black text-gray-900">Artigos e Notícias</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="text-gray-300" size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Sem editais em {uf} no momento</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm font-medium">
              Não encontramos editais abertos especificamente para o estado selecionado. Tente buscar na região ou veja todos os editais do Brasil.
            </p>
            <Link href="/concursos" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-blue-700 transition-colors shadow-lg inline-block uppercase tracking-widest">
              Ver Todos os Editais
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
