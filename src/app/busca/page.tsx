import { supabase } from '@/lib/supabaseClient';
import PostCard from '@/components/PostCard';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Busca sempre em tempo real

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || '';

  let posts: any[] = [];
  let error: any = null;

  let queryBuilder = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .eq('niche', 'concursos')
    .order('published_at', { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
  } else {
    queryBuilder = queryBuilder.limit(50);
  }

  const { data, error: dbError } = await queryBuilder;
  posts = data || [];
  error = dbError;

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest mb-4 block">
            ← Voltar para a Início
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 flex items-center">
            <Search className="mr-4 text-blue-600" size={40} />
            Resultados para: <span className="text-blue-600 ml-2">"{query}"</span>
          </h1>
          <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-[10px]">
            {posts.length} {posts.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-300" size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Nada encontrado</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Não encontramos nenhum artigo para "{query}". Tente buscar por termos mais genéricos como "Polícia", "Nível Médio" ou o nome de um estado.
            </p>
            <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-blue-700 transition-colors shadow-lg inline-block">
              VOLTAR PARA O INÍCIO
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
