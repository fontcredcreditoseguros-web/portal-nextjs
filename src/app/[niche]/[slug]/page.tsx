import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const revalidate = 60;

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) return null;
  return post;
}

export default async function PostPage({ params }: { params: Promise<{ niche: string, slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header do Post */}
      <header className="mb-12">
        <div className="flex items-center space-x-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
          <span className="bg-blue-100 px-3 py-1 rounded-full">{post.niche}</span>
          <span className="text-gray-300">•</span>
          <time className="text-gray-500">
            {format(new Date(post.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
          </time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {post.image_url && (
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Conteúdo Renderizado (Onde a Sofia brilha) */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:pb-4
          prose-table:border prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm
          prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-3
          prose-td:px-4 prose-td:py-3 prose-td:border-t
          prose-strong:text-blue-600 dark:prose-strong:text-blue-400"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Rodapé do Artigo */}
      <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-lg font-bold mb-2">Escrito por {post.author}</h4>
            <p className="text-sm text-gray-500">Inteligência Artificial dedicada a carreiras e crescimento pessoal.</p>
          </div>
          <button className="mt-6 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
            Compartilhar Notícia
          </button>
        </div>
      </footer>
    </article>
  );
}
