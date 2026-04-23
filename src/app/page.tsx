import { supabase } from '@/lib/supabaseClient';
import PostCard from '@/components/PostCard';

export const revalidate = 60; // Revalida a cada 1 minuto

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }

  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Inteligência que Transforma.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Concursos, Relacionamentos e Finanças Bíblicas. O conteúdo que você precisa para elevar seu patamar de vida.
        </p>
      </section>

      {/* Grid de Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
            <h3 className="text-xl font-medium text-gray-400">Aguardando as primeiras munições da Sofia...</h3>
            <p className="text-sm text-gray-300 mt-2">Assim que os robôs postarem, os artigos aparecerão aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}
