import Link from 'next/link';
import { Users, DollarSign, GraduationCap, Building } from 'lucide-react';
import { sanitizeTitle } from '@/lib/supabaseClient';

export default function DensePostRow({ post }: { post: any }) {
  const cleanTitle = sanitizeTitle(post.title);
  
  // Extract data from excerpt (Format: 🚨 9 | 💰 R$ 9.832,41 | 🎓 Superior)
  const parts = post.excerpt ? post.excerpt.split('|').map((p: string) => p.trim()) : [];
  const vagas = parts[0]?.replace('🚨', '').trim() || '-';
  const salario = parts[1]?.replace('💰', '').trim() || '-';
  const nivel = parts[2]?.replace('🎓', '').trim() || '-';
  
  const uf = post.labels?.find((l: string) => l.length === 2 && l === l.toUpperCase()) || 'BR';

  return (
    <Link href={`/${post.niche}/${post.slug}`} className="block bg-white hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors group px-4 py-4 md:px-6 md:py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Orgao & UF */}
        <div className="flex-1 min-w-0 flex items-start gap-3">
          <div className="bg-blue-100 text-blue-700 font-black text-[10px] px-2 py-1 rounded-md mt-0.5 whitespace-nowrap">
            {uf}
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-700 truncate">
              {cleanTitle.replace(/\[.*?\]\s*/g, '')}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
              <Building size={12} />
              <span>Concurso Público Aberto</span>
            </div>
          </div>
        </div>

        {/* Data Points */}
        <div className="flex items-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
          <div className="flex flex-col min-w-[80px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Users size={10} /> Vagas</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{vagas}</span>
          </div>
          
          <div className="flex flex-col min-w-[120px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={10} /> Salário</span>
            <span className="text-sm font-bold text-green-600 truncate">{salario}</span>
          </div>

          <div className="flex flex-col min-w-[100px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><GraduationCap size={10} /> Escolaridade</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{nivel}</span>
          </div>
          
          <div className="hidden lg:flex shrink-0">
             <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
               Ver Edital
             </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
