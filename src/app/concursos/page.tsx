import { supabase } from '@/lib/supabaseClient';
import DensePostRow from '@/components/DensePostRow';
import PostCard from '@/components/PostCard';
import { MapPin, LayoutGrid, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Todos os 27 UFs do Brasil
const TODOS_UFS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO',
  'MA','MG','MS','MT','PA','PB','PE','PI','PR',
  'RJ','RN','RO','RR','RS','SC','SE','SP','TO'
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; nacional?: string }>;
}): Promise<Metadata> {
  const { estado, nacional } = await searchParams;
  const uf = estado?.toUpperCase();

  if (nacional === '1') {
    return {
      title: 'Concursos Nacionais 2026 | Concursos Font',
      description: 'Todos os editais de concursos federais abertos e previstos em 2026. Receita Federal, Polícia Federal, PRF, Banco Central e mais.',
    };
  }
  if (uf) {
    return {
      title: `Concursos em ${uf} 2026 | Concursos Font`,
      description: `Todos os editais e concursos públicos abertos e previstos no estado de ${uf} em 2026. Vagas, salários e prazos atualizados diariamente.`,
    };
  }
  return {
    title: 'Editais e Concursos Abertos 2026 | Concursos Font',
    description: 'Radar nacional de concursos públicos. Editais abertos e previstos em todos os estados do Brasil. Atualizado diariamente.',
  };
}

export default async function ConcursosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; nacional?: string }>;
}) {
  const { estado, nacional } = await searchParams;
  const uf = estado?.toUpperCase();
  const isNacional = nacional === '1';

  let query = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .eq('niche', 'concursos');

  if (isNacional) {
    query = query.eq('is_national', true);
  } else if (uf) {
    query = query.eq('uf', uf);
  }

  const { data: posts, error } = await query.order('published_at', { ascending: false });

  if (error) {
    console.error("Supabase Error on /concursos:", error);
  }

  // Separação em 3 seções por LABELS (fallback para quando não há coluna status)
  const postsAbertos   = (posts || []).filter(p => (p.status === 'Aberto' || (p.labels && p.labels.includes('Aberto'))));
  const postsPrevistos = (posts || []).filter(p => (p.status === 'Previsto' || (p.labels && p.labels.includes('Previsto'))) && p.excerpt?.includes('|'));
  const postsArtigos   = (posts || []).filter(p => !p.excerpt?.includes('|'));

  const tituloFiltro = isNacional ? 'FEDERAL' : uf;

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-10">
          <Link href="/" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest mb-4 block">
            ← Voltar para a Início
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center">
                {isNacional ? (
                  <>
                    <Globe className="mr-3 text-blue-600" size={32} />
                    Concursos <span className="text-blue-600 ml-2">Federais</span>
                  </>
                ) : uf ? (
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
                {postsAbertos.length} {postsAbertos.length === 1 ? 'edital aberto' : 'editais abertos'} · {postsPrevistos.length} previstos
              </p>
            </div>

            {/* FILTROS DE ESTADO */}
            <div className="flex flex-wrap gap-1.5">
              {/* Botão Federal */}
              <Link
                href="/concursos?nacional=1"
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all flex items-center gap-1 ${
                  isNacional
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                🌎 FEDERAL
              </Link>

              {/* Todos os 27 Estados */}
              {TODOS_UFS.map(state => (
                <Link
                  key={state}
                  href={`/concursos?estado=${state}`}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${
                    uf === state
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {(postsAbertos.length > 0 || postsPrevistos.length > 0 || postsArtigos.length > 0) ? (
          <div className="space-y-14">

            {/* SEÇÃO 1: EDITAIS ABERTOS */}
            {postsAbertos.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-6 bg-green-500 rounded-full" />
                  <h2 className="text-xl font-black text-gray-900">🟢 Inscrições Abertas</h2>
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wide">
                    {postsAbertos.length} editais
                  </span>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {postsAbertos.map((post) => (
                    <DensePostRow key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* SEÇÃO 2: EDITAIS PREVISTOS */}
            {postsPrevistos.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-6 bg-orange-400 rounded-full" />
                  <h2 className="text-xl font-black text-gray-900">🔜 Em Breve</h2>
                  <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wide">
                    {postsPrevistos.length} previstos
                  </span>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {postsPrevistos.map((post) => (
                    <DensePostRow key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* SEÇÃO 3: ARTIGOS E NOTÍCIAS */}
            {postsArtigos.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-6 bg-blue-400 rounded-full" />
                  <h2 className="text-xl font-black text-gray-900">📰 Artigos e Notícias</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postsArtigos.map((post) => (
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
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Sem editais em {tituloFiltro || 'sua busca'} no momento
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm font-medium">
              Nosso Motor de Concursos atualiza a lista diariamente. Volte amanhã ou veja todos os editais do Brasil.
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
