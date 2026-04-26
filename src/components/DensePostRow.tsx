import Link from 'next/link';
import { Users, DollarSign, GraduationCap, Building } from 'lucide-react';
import { sanitizeTitle } from '@/lib/supabaseClient';

export default function DensePostRow({ post }: { post: any }) {
  const cleanTitle = sanitizeTitle(post.title);
  
  // Extract data from excerpt (Format: 🚨 9 | 💰 R$ 9.832,41 | 🎓 Superior | 📅 15/05)
  const parts = post.excerpt && post.excerpt.includes('|') ? post.excerpt.split('|').map((p: string) => p.trim()) : [];
  
  const vagas = parts[0]?.replace('🚨', '').trim() || 'Confira';
  const salario = parts[1]?.replace('💰', '').trim() || 'Ver Edital';
  const nivel = parts[2]?.replace('🎓', '').trim() || 'Vários';
  const prazo = parts[3]?.replace('📅', '').trim() || 'Ver Edital';
  
  const uf = post.labels?.find((l: string) => l.length === 2 && l === l.toUpperCase()) || 'BR';

  return (
    <Link href={`/${post.niche}/${post.slug}`} className="block bg-white hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors group px-4 py-4 md:px-6 md:py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Orgao & UF */}
        <div className="flex-1 min-w-0 flex items-start gap-3 pr-4">
          <div className="bg-blue-100 text-blue-700 font-black text-[10px] px-2 py-1 rounded-md mt-0.5 shrink-0 whitespace-nowrap">
            {uf}
          </div>
          <div className="overflow-hidden min-w-0">
            <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-700 truncate w-full">
              {cleanTitle.replace(/\[.*?\]\s*/g, '')}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
              <Building size={12} className="shrink-0" />
              <span className="truncate">Concurso Público Aberto</span>
            </div>
          </div>
        </div>

        {/* Data Points - AGORA COM 4 COLUNAS */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap shrink-0">
          <div className="flex flex-col min-w-[70px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">Vagas</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{vagas}</span>
          </div>
          
          <div className="flex flex-col min-w-[100px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">Salário</span>
            <span className="text-sm font-bold text-green-600 truncate">{salario}</span>
          </div>

          <div className="flex flex-col min-w-[90px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">Escolaridade</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{nivel}</span>
          </div>

          <div className="flex flex-col min-w-[110px] bg-yellow-50 p-2 rounded-lg border border-yellow-100">
            <span className="text-[10px] font-black text-yellow-700 uppercase tracking-wider mb-0.5 flex items-center gap-1">Inscrições até</span>
            <span className="text-sm font-black text-yellow-900 truncate">{prazo}</span>
          </div>
          
          <div className="hidden xl:flex shrink-0">
             <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
               Ver Edital
             </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
