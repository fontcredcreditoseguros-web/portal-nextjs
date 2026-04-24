import { Search, Flame, TrendingUp } from 'lucide-react';

export default function ConcursosHero({ siteName }: { siteName: string }) {
  return (
    <section className="bg-[#0a192f] text-white relative overflow-hidden pt-12 pb-24">
      {/* Elementos Decorativos Sutis (Menos agressivos) */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-500/5 skew-x-12 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -translate-x-24 translate-y-24 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full mb-6 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">
                Plantão de Editais: 12 atualizações hoje
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter">
              A Sua Carreira Pública <br />
              <span className="text-blue-400">Começa Aqui.</span>
            </h1>
            
            <p className="text-lg text-blue-100/60 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Editais analisados, alertas no WhatsApp e as melhores pautas jornalísticas.
            </p>

            <div className="relative group max-w-xl">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-blue-300/50 group-focus-within:text-blue-400 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Qual concurso você busca?"
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-base shadow-2xl placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
             <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl w-48">
                <Flame className="text-orange-400 mb-2" size={24} />
                <div className="text-2xl font-black">85</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-blue-300">Editais Abertos</div>
             </div>
             <div className="space-y-3 max-w-xs">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-400">Tendências</h4>
                <div className="flex flex-col space-y-2">
                   <span className="flex items-center text-xs font-bold text-blue-100/40"><TrendingUp size={14} className="mr-2" /> PM-SP Edital Previsto</span>
                   <span className="flex items-center text-xs font-bold text-blue-100/40"><TrendingUp size={14} className="mr-2" /> Correios Inscrições</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
