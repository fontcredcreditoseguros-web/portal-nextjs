import { Search, Flame, TrendingUp, Bell } from 'lucide-react';

export default function ConcursosHero({ siteName }: { siteName: string }) {
  return (
    <section className="bg-slate-50 border-b border-gray-100 relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24">
      {/* Subtle background detail */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/[0.02] -skew-x-12 translate-x-32" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">
                12 Novos Editais Hoje
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter text-slate-900">
              Sua Carreira Pública <br />
              <span className="text-blue-600">Começa Aqui.</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Análises de bancas, alertas no WhatsApp e a cobertura jornalística mais completa do Brasil.
            </p>

            <form action="/busca" method="GET" className="relative group max-w-2xl mx-auto lg:mx-0">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={22} />
              </div>
              <input 
                name="q"
                type="text" 
                placeholder="Busque por cargo, órgão ou estado..."
                className="w-full pl-14 pr-32 py-4.5 md:py-5 rounded-2xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base shadow-xl placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl text-xs font-black hover:bg-blue-700 transition-colors"
              >
                BUSCAR
              </button>
            </form>
          </div>

          {/* Stats/Trending Section - Refined for Light Mode */}
          <div className="w-full lg:w-auto grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:space-y-4">
             <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col items-center lg:items-start lg:w-48">
                <Flame className="text-orange-500 mb-2" size={24} />
                <div className="text-2xl font-black text-slate-900">85</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Editais Abertos</div>
             </div>
             <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col items-center lg:items-start lg:w-48">
                <Bell className="text-blue-500 mb-2" size={24} />
                <div className="text-2xl font-black text-slate-900">2026</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Previsões Elite</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
