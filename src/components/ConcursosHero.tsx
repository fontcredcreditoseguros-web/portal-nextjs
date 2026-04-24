import { Search, Flame, Bell, TrendingUp } from 'lucide-react';

export default function ConcursosHero({ siteName }: { siteName: string }) {
  return (
    <section className="bg-blue-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800/30 skew-x-12 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-32 translate-y-32 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-700/50">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                12 Novos Editais Publicados Hoje
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
              Sua Carreira Pública <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">Começa Aqui.</span>
            </h1>
            
            <p className="text-xl text-blue-100/80 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Acompanhe editais em tempo real, análises de bancas e as melhores pautas jornalísticas do mundo dos concursos.
            </p>

            <div className="relative group max-w-2xl">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-blue-300 group-focus-within:text-blue-500 transition-colors">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Qual concurso você está buscando hoje?"
                className="w-full pl-16 pr-6 py-6 rounded-3xl bg-white text-gray-900 focus:outline-none focus:ring-8 focus:ring-blue-500/20 transition-all text-lg shadow-2xl placeholder:text-gray-400"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-blue-200/60 font-bold text-xs uppercase tracking-widest">
              <span className="flex items-center"><TrendingUp size={16} className="mr-2" /> PM-SP</span>
              <span className="relative flex h-2 w-2 bg-blue-700 rounded-full translate-y-1"></span>
              <span className="flex items-center"><TrendingUp size={16} className="mr-2" /> Correios</span>
              <span className="relative flex h-2 w-2 bg-blue-700 rounded-full translate-y-1"></span>
              <span className="flex items-center"><TrendingUp size={16} className="mr-2" /> RFB 2026</span>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-md">
             <HeroStat icon={<Flame className="text-orange-400" />} title="85" sub="Editais Abertos" />
             <HeroStat icon={<Bell className="text-blue-400" />} title="2.4k" sub="Vagas Novas" />
             <div className="col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-4">Plantão de Notícias</h4>
                <div className="space-y-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <p className="text-sm font-bold truncate">Edital da Caixa: Provas confirmadas...</p>
                   </div>
                   <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <p className="text-sm font-bold truncate">Polícia Federal: Previsão de 2027...</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
       <div className="mb-4">{icon}</div>
       <div className="text-3xl font-black mb-1">{title}</div>
       <div className="text-[10px] font-black uppercase tracking-widest text-blue-300">{sub}</div>
    </div>
  );
}
