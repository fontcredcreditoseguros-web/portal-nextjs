import { supabase, sanitizeTitle } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import SmartImage from '@/components/SmartImage';

export const revalidate = 0; // Desativar cache para garantir atualização imediata no deploy

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) return null;
  return post;
}

export default async function PostPage({ params }: { params: Promise<{ niche: string, slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const cleanTitle = sanitizeTitle(post.title);

  // Sanitização Cirúrgica de Conteúdo (Evita Catastrophic Backtracking)
  let sanitizedContent = post.content || '';
  
  // 1. Remover links legados do Mercado Livre sem quebrar parágrafos inteiros
  sanitizedContent = sanitizedContent.replace(/<a[^>]*href="[^"]*mercadolivre[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  
  // 2. Remover blocos Hotmart antigos
  sanitizedContent = sanitizedContent.replace(/<div[^>]*class="[^"]*hotmart[^"]*"[\s\S]*?<\/div>/gi, '');
  
  // 3. Remover parágrafos vazios residuais (seguro)
  sanitizedContent = sanitizedContent.replace(/<p[^>]*>\s*(<br\s*\/?>)?\s*<\/p>/gi, '');

  // 4. Remover "LEIA TAMBÉM" e a lista subsequente
  sanitizedContent = sanitizedContent.replace(/<h[1-6][^>]*>\s*LEIA TAMBÉM:?\s*<\/h[1-6]>[\s\S]*?(?:<\/ul>|<\/ol>)/gi, '');

  // 5. Corrigir links internos do Blogger terminados em .html para rotas limpas
  sanitizedContent = sanitizedContent.replace(/href="[^"]*\/([^\/.]+)\.html"/gi, 'href="/concursos/$1"');

  // 6. Limpeza de tags HTML erradas injetadas pela IA
  sanitizedContent = sanitizedContent.replace(/<\/?html[^>]*>/gi, '');
  sanitizedContent = sanitizedContent.replace(/<\/?body[^>]*>/gi, '');
  
  // 7. Transformar Ficha Técnica em Card Visual (Versão 6 - O FIM DO PROBLEMA)
  const ficheKeywords = 'Status|Escolaridade|Salário|Remuneração|Vagas|Banca|Inscrições|Cargos|Órgão|Local';

  // A. Transformar Tabelas Legadas
  sanitizedContent = sanitizedContent.replace(
    /<table[^>]*>[\s\S]*?<\/table>/gi,
    (match) => {
        if (!new RegExp(ficheKeywords, 'i').test(match)) return match;
        const rows = [];
        const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        let m;
        let currentPair = [];
        while ((m = tdRegex.exec(match)) !== null) {
            const text = m[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').replace(/:$/, '').trim();
            if (text) {
                currentPair.push(text);
                if (currentPair.length === 2) {
                    rows.push(currentPair);
                    currentPair = [];
                }
            }
        }
        if (rows.length < 2) return match;
        const listItems = rows.map(([key, val]) => `
            <li class="flex flex-col md:flex-row md:justify-between border-b border-blue-100 py-3 last:border-0 gap-1">
                <span class="font-black text-blue-900 uppercase text-[10px] tracking-widest">${key}</span>
                <span class="text-blue-700 font-bold text-sm">${val || 'Consultar Edital'}</span>
            </li>
        `).join('');
        return `
        <div class="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-3xl p-6 md:p-8 my-12 shadow-xl shadow-blue-500/5 not-prose">
            <div class="flex items-center justify-between mb-8">
                <h3 class="text-lg font-black text-blue-900 flex items-center">
                    <span class="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                    DETALHES DO EDITAL
                </h3>
                <span class="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Radar Elite</span>
            </div>
            <ul class="space-y-1">${listItems}</ul>
        </div>`;
    }
  );

  // B. Transformar Blocos de Texto/Parágrafos (Onde o problema persistia)
  // Esta regex agora é cega para tags HTML entre as linhas de metadados
  const metaLinePattern = `(?:(?:<[^>]+>)*\\s*(?:${ficheKeywords}):(?:\s|&nbsp;)*[\\s\\S]*?(?:<\/[^>]+>|<br\\s*\\/?>|\\n|\\s)*)`;
  const fullBlockRegex = new RegExp(`(${metaLinePattern}{3,})`, 'gi');

  sanitizedContent = sanitizedContent.replace(fullBlockRegex, (match) => {
    // Limpeza profunda para extrair apenas Chave: Valor
    const cleanBlock = match
        .replace(/&nbsp;/gi, ' ')
        .replace(/<[^>]+>/g, '\n') // Transforma tags em quebras de linha
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.includes(':') && new RegExp(ficheKeywords, 'i').test(l));

    if (cleanBlock.length < 2) return match;

    const listItems = cleanBlock.map(r => {
        const separatorIndex = r.indexOf(':');
        const key = r.substring(0, separatorIndex).trim();
        const val = r.substring(separatorIndex + 1).trim();
        return `<li class="flex flex-col md:flex-row md:justify-between border-b border-blue-100 py-3 last:border-0 gap-1">
            <span class="font-black text-blue-900 uppercase text-[10px] tracking-widest">${key}</span>
            <span class="text-blue-700 font-bold text-sm">${val || 'Consultar Edital'}</span>
        </li>`;
    }).join('');

    return `
    <div class="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-3xl p-6 md:p-8 my-12 shadow-xl shadow-blue-500/5 not-prose">
        <div class="flex items-center justify-between mb-8">
            <h3 class="text-lg font-black text-blue-900 flex items-center">
                <span class="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                DETALHES DO EDITAL
            </h3>
            <span class="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Radar Elite</span>
        </div>
        <ul class="space-y-1">${listItems}</ul>
    </div>`;
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header do Post */}
      <header className="mb-12">
        <div className="flex items-center space-x-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
          <span className="bg-blue-100 px-3 py-1 rounded-full">{post.niche}</span>
          <span className="text-gray-300">•</span>
          <time className="text-gray-500">
            {format(new Date(post.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
          </time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
          {cleanTitle}
        </h1>

        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100">
          <SmartImage 
            src={post.image_url} 
            alt={cleanTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Conteúdo Renderizado (Onde a Sofia brilha) */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:pb-4
          prose-table:border prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm
          prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-3
          prose-td:px-4 prose-td:py-3 prose-td:border-t
          prose-strong:text-blue-600 dark:prose-strong:text-blue-400"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Rodapé do Artigo */}
      <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-lg font-bold mb-2">Escrito por {post.author}</h4>
            <p className="text-sm text-gray-500">Inteligência Artificial dedicada a carreiras e concursos públicos.</p>
          </div>
          <button className="mt-6 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
            Compartilhar Notícia
          </button>
        </div>
      </footer>
    </article>
  );
}
