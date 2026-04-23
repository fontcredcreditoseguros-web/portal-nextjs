import { supabase } from '@/lib/supabaseClient';
import PostCard from '@/components/PostCard';
import { Search, MapPin, GraduationCap, Building2, Flame, Heart, Wallet } from 'lucide-react';
import { headers } from 'next/headers';

export const revalidate = 60;

async function getPosts(niche: string) {
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

export default async function DynamicHome() {
  const headerList = headers();
  const host = headerList.get('host') || '';
  
  // Detecção Automática de Nicho por Domínio
  let niche = 'concursos';
  let siteName = 'CONCURSOS ELITE';
  let primaryColor = 'blue';
  let heroTitle = 'A sua aprovação começa aqui.';
  let heroSub = 'Editais analisados e estratégias para você conquistar sua vaga em 2026.';

  if (host.includes('casamento') || host.includes('relacionamentos')) {
    niche = 'relacionamentos';
    siteName = 'VIDA A DOIS';
    primaryColor = 'rose';
    heroTitle = 'O amor é uma construção diária.';
    heroSub = 'Dicas, reflexões e conselhos para um relacionamento inabalável.';
  } else if (host.includes('riqueza')) {
    niche = 'riqueza';
    siteName = 'RIQUEZA ABENÇOADA';
    primaryColor = 'emerald';
    heroTitle = 'Prosperidade com Propósito.';
    heroSub = 'Princípios bíblicos e estratégias financeiras para sua liberdade.';
  }

  const posts = await getPosts(niche);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const colorClasses: any = {
    blue: { bg: 'bg-blue-900', text: 'text-blue-600', btn: 'bg-blue-600', light: 'bg-blue-100', focus: 'focus:ring-blue-500/30' },
    rose: { bg: 'bg-rose-900', text: 'text-rose-600', btn: 'bg-rose-600', light: 'bg-rose-100', focus: 'focus:ring-rose-500/30' },
    emerald: { bg: 'bg-emerald-900', text: 'text-emerald-600', btn: 'bg-emerald-600', light: 'bg-emerald-100', focus: 'focus:ring-emerald-500/30' }
  };

  const theme = colorClasses[primaryColor];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Dinâmico */}
      <section className={`${theme.bg} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {heroSub}
            </p>
            
            <div className="relative max-w-2xl group">
              <div className={`absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:${theme.text}`}>
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder={`Pesquisar em ${siteName.toLowerCase()}...`}
                className={`w-full pl-14 pr-4 py-5 rounded-2xl bg-white text-gray-900 focus:outline-none focus:ring-4 ${theme.focus} transition-all text-lg shadow-2xl`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Rápidas Dinâmicas */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {niche === 'concursos' ? (
            <>
              <QuickCat icon={<Flame className="text-orange-500" />} label="Editais Abertos" />
              <QuickCat icon={<MapPin className="text-blue-500" />} label="Por Região" />
              <QuickCat icon={<GraduationCap className="text-green-500" />} label="Nível Médio" />
              <QuickCat icon={<Building2 className="text-purple-500" />} label="Top Bancas" />
            </>
          ) : niche === 'relacionamentos' ? (
            <>
              <QuickCat icon={<Heart className="text-rose-500" />} label="Casamento" />
              <QuickCat icon={<Flame className="text-orange-500" />} label="Namoro" />
              <QuickCat icon={<Search className="text-blue-500" />} label="Dicas de Ouro" />
              <QuickCat icon={<MapPin className="text-emerald-500" />} label="Eventos" />
            </>
          ) : (
            <>
              <QuickCat icon={<Wallet className="text-emerald-500" />} label="Finanças" />
              <QuickCat icon={<Building2 className="text-blue-500" />} label="Negócios" />
              <QuickCat icon={<Flame className="text-orange-500" />} label="Dízimos" />
              <QuickCat icon={<GraduationCap className="text-purple-500" />} label="Cursos" />
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900 flex items-center">
            <span className={`w-2 h-8 ${theme.btn} mr-3 rounded-full`}></span>
            Últimas do Portal
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredPost && <div className="lg:col-span-2"><PostCard post={featuredPost} /></div>}
          <aside className="space-y-6">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Destaques</h3>
            {otherPosts.slice(0, 5).map((post: any) => (
              <div key={post.id} className="group flex space-x-4 cursor-pointer">
                 <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={post.image_url} className="w-full h-full object-cover" />
                 </div>
                 <h4 className={`font-bold text-sm leading-tight group-hover:${theme.text} transition-colors line-clamp-2`}>{post.title}</h4>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

function QuickCat({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
      <span className="font-bold text-gray-700 text-sm">{label}</span>
    </div>
  );
}
