import { supabase } from '@/lib/supabaseClient';
import PostCard from '@/components/PostCard';
import ConcursosHero from '@/components/ConcursosHero';
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
  const host = headerList.get('x-forwarded-host') || headerList.get('host') || '';
  
  // Detecção Automática de Nicho por Domínio
  let niche = 'concursos';
  let siteName = 'CONCURSOS ELITE';
  let primaryColor = 'blue';
  let heroTitle = 'A sua aprovação começa aqui.';
  let heroSub = 'Editais analisados e estratégias para você conquistar sua vaga em 2026.';

  const isCasamento = host.includes('casamento') || host.includes('relacionamentos');
  const isRiqueza = host.includes('riqueza') || host.includes('abencoada');

  if (isCasamento) {
    niche = 'relacionamentos';
    siteName = 'VIDA A DOIS';
    primaryColor = 'rose';
    heroTitle = 'O amor é uma construção diária.';
    heroSub = 'Dicas, reflexões e conselhos para um relacionamento inabalável.';
  } else if (isRiqueza) {
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
      {niche === 'concursos' ? (
        <ConcursosHero siteName={siteName} />
      ) : (
        <section className={`${theme.bg} text-white py-24 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                {heroTitle}
              </h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                {heroSub}
              </p>
              
              <div className="relative max-w-2xl group">
                <div className={`absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:${theme.text}`}>
                  <Search size={24} />
                </div>
                <input 
                  type="text" 
                  placeholder={`Pesquisar em ${siteName.toLowerCase()}...`}
                  className={`w-full pl-16 pr-6 py-6 rounded-3xl bg-white text-gray-900 focus:outline-none focus:ring-8 ${theme.focus} transition-all text-lg shadow-2xl`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

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
              <Link key={post.id} href={`/${post.niche}/${post.slug}`} className="group flex space-x-4 cursor-pointer">
                 <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                 </div>
                 <h4 className={`font-bold text-sm leading-tight group-hover:${theme.text} transition-colors line-clamp-2`}>{post.title}</h4>
              </Link>
            ))}

            {/* Radar Sofia CTA */}
            <div className={`${theme.bg} p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl mt-12`}>
               <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-4">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Radar da Sofia Online</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">Quer ser aprovado em 2026?</h3>
                  <p className="text-sm text-white/70 mb-6">Receba editais da sua cidade e cargo dos sonhos direto no WhatsApp por apenas <span className="text-white font-bold">R$ 9,90/mês</span>.</p>
                  <a 
                    href={`https://wa.me/556792943130?text=Olá%20Sofia,%20quero%20ativar%20meu%20Radar%20Elite%20para%20Concursos!`}
                    target="_blank"
                    className="block text-center bg-white text-blue-900 py-4 rounded-2xl font-black text-xs hover:scale-105 transition-transform shadow-xl"
                  >
                    ATIVAR MEU RADAR AGORA
                  </a>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Sponsored / Ads Slot */}
            <div className="bg-white p-6 rounded-3xl border border-dashed border-gray-300">
               <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-4 block text-center">Patrocinado</span>
               <div className="group cursor-pointer">
                  <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                     <img src="https://images.pexels.com/photos/5900222/pexels-photo-5900222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-bold text-sm mb-2">Gabarite a banca CESPE/Cebraspe com este método exclusivo</h4>
                  <a href="https://go.hotmart.com/X105437183M" target="_blank" className="text-xs font-black text-blue-600 hover:underline">Ver Material →</a>
               </div>
            </div>
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
