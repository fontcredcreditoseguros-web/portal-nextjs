import { supabase } from '@/lib/supabaseClient';
import PostCard from '@/components/PostCard';
import { Search, MapPin, GraduationCap, Building2, Flame } from 'lucide-react';

export const revalidate = 60;

async function getPosts(niche: string = 'concursos') {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('niche', niche)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(15);

  if (error) return [];
  return posts;
}

export default async function ConcursosHome() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Central estilo Gran Concursos */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              A sua aprovação <br/> começa aqui.
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Editais analisados, notícias exclusivas e o melhor conteúdo para você conquistar sua vaga em 2026.
            </p>
            
            {/* Barra de Busca Profissional */}
            <div className="relative max-w-2xl group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Pesquisar concurso, banca ou cargo..."
                className="w-full pl-14 pr-4 py-5 rounded-2xl bg-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all text-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Rápidas */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Flame className="text-orange-500" />, label: 'Editais Abertos' },
            { icon: <MapPin className="text-blue-500" />, label: 'Por Região' },
            { icon: <GraduationCap className="text-green-500" />, label: 'Nível Médio' },
            { icon: <Building2 className="text-purple-500" />, label: 'Top Bancas' }
          ].map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="p-3 bg-gray-50 rounded-xl">{cat.icon}</div>
              <span className="font-bold text-gray-700">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de Notícias */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900 flex items-center">
            <span className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></span>
            Últimas Notícias
          </h2>
          <button className="text-blue-600 font-bold hover:underline">Ver tudo</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destaque Principal */}
          {featuredPost && (
            <div className="lg:col-span-2">
               <PostCard post={featuredPost} />
            </div>
          )}

          {/* Lista Lateral de Curtas */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6 text-gray-500 uppercase tracking-widest text-sm">Mais Lidas</h3>
            {otherPosts.slice(0, 4).map((post: any) => (
              <div key={post.id} className="group flex space-x-4 cursor-pointer">
                <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Há 2 horas</span>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white mt-8 shadow-xl">
              <h4 className="text-2xl font-black mb-4 leading-tight">Quer ser aprovado?</h4>
              <p className="text-blue-100 text-sm mb-6">Receba as pautas secretas e editais em primeira mão no seu e-mail.</p>
              <input type="text" placeholder="Seu melhor e-mail" className="w-full p-3 rounded-xl bg-white/10 border border-white/20 mb-4 placeholder:text-white/40" />
              <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-blue-50 transition-all">Quero me inscrever</button>
            </div>
          </div>
        </div>

        {/* Restante do Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {otherPosts.slice(4).map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
