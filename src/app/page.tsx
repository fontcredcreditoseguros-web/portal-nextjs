import { supabase, sanitizeTitle } from '@/lib/supabaseClient';
import DensePostRow from '@/components/DensePostRow';
import PostCard from '@/components/PostCard';
import SmartImage from '@/components/SmartImage';
import ConcursosHero from '@/components/ConcursosHero';
import { Search, MapPin, GraduationCap, Building2, Flame } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

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
  const niche = 'concursos';
  const siteName = 'CONCURSOS ELITE';
  const primaryColor = 'blue';

  const posts = await getPosts(niche);
  
  // Lógica de Separação Inteligente
  const radarPosts = posts.filter(p => p.excerpt && p.excerpt.includes('|'));
  const newsPosts = posts.filter(p => !p.excerpt || !p.excerpt.includes('|'));

  const theme = { bg: 'bg-blue-900', text: 'text-blue-600', btn: 'bg-blue-600', light: 'bg-blue-100', focus: 'focus:ring-blue-500/30' };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Concursos (Fixo) */}
      <ConcursosHero siteName={siteName} />

      {/* Categorias Rápidas */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickCat icon={<Flame className="text-orange-500" />} label="Editais Abertos" href="/concursos" />
          <QuickCat icon={<MapPin className="text-blue-500" />} label="Por Região" href="/concursos" />
          <QuickCat icon={<GraduationCap className="text-green-500" />} label="Nível Médio" href="/concursos" />
          <QuickCat icon={<Building2 className="text-purple-500" />} label="Top Bancas" href="/concursos" />
        </div>
      </div>

      {/* Grid de Estados (PCI Killer) */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900">Concursos por Estado</h3>
              <p className="text-sm text-gray-400">Encontre oportunidades na sua região</p>
            </div>
            <Link href="/concursos" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">Ver Todos os Estados</Link>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 md:gap-3">
            {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((uf) => (
              <Link 
                key={uf} 
                href={`/concursos?estado=${uf}`}
                className="flex flex-col items-center justify-center py-3 md:py-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all group"
              >
                <span className="text-xs md:text-sm font-black">{uf}</span>
              </Link>
            ))}
          </div>
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
          <div className="lg:col-span-2 space-y-12">
            
            {/* Seção Radar (Editais Abertos) */}
            {radarPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                   <div className="w-2 h-6 bg-blue-600 rounded-full" />
                   <h3 className="text-xl font-black text-gray-900">Radar de Editais Abertos</h3>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                   {radarPosts.map((post) => (
                      <DensePostRow key={post.id} post={post} />
                   ))}
                </div>
              </section>
            )}

            {/* Seção Últimas Notícias */}
            {newsPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                   <div className="w-2 h-6 bg-orange-500 rounded-full" />
                   <h3 className="text-xl font-black text-gray-900">Últimas Notícias e Análises</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {newsPosts.slice(0, 4).map((post) => (
                      <PostCard key={post.id} post={post} />
                   ))}
                </div>
              </section>
            )}

          </div>
          
          <aside className="space-y-6">

            {/* Radar Sofia CTA - Valor R$ 9,90 */}
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

function QuickCat({ icon, label, href }: { icon: any, label: string, href?: string }) {
  const content = (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
      <span className="font-bold text-gray-700 text-sm">{label}</span>
    </div>
  );
  return href ? <Link href={href} className="block h-full">{content}</Link> : content;
}
