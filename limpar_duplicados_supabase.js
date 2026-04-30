/**
 * LIMPEZA CIRÚRGICA DE DUPLICADOS — SUPABASE
 * 
 * Estratégia: Para cada grupo de posts com mesmo título base (sem o sufixo numérico),
 * manter APENAS o mais recente e deletar os demais.
 * 
 * Protocolo de segurança: Lista ANTES de deletar, requer confirmação via argumento --confirmar
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  // Usa SERVICE_ROLE para poder deletar — se não existir, usa ANON
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CONFIRMAR = process.argv.includes('--confirmar');
const NICHO = process.argv.find(a => a.startsWith('--nicho='))?.split('=')[1] || null;

function normalizarTitulo(titulo) {
  if (!titulo) return '';
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    // Remove sufixos numéricos comuns dos slugs: "titulo-do-post-123"
    .replace(/\s+\d+$/, '')
    .substring(0, 80); // Compara só os primeiros 80 chars
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║   🧹 LIMPADOR DE DUPLICADOS — SUPABASE       ║');
  console.log(`║   Modo: ${CONFIRMAR ? '🔴 EXCLUSÃO REAL' : '🟡 SIMULAÇÃO (seguro)'}                    ║`);
  console.log(`║   Nicho: ${NICHO || 'TODOS'}                           ║`);
  console.log('╚══════════════════════════════════════════════╝\n');

  if (!CONFIRMAR) {
    console.log('⚠️  MODO SIMULAÇÃO ATIVO — nada será deletado.');
    console.log('   Para executar a limpeza real, adicione: --confirmar\n');
  }

  // 1. Buscar todos os posts publicados
  let query = supabase
    .from('posts')
    .select('id, title, slug, niche, published_at, content')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (NICHO) query = query.eq('niche', NICHO);

  const { data: posts, error } = await query;

  if (error) {
    console.error('❌ Erro ao buscar posts:', error.message);
    process.exit(1);
  }

  console.log(`📊 Total de posts encontrados: ${posts.length}\n`);

  // 2. Agrupar por título normalizado
  const grupos = {};
  for (const post of posts) {
    const chave = normalizarTitulo(post.title);
    if (!grupos[chave]) grupos[chave] = [];
    grupos[chave].push(post);
  }

  // 3. Identificar grupos com duplicatas
  const gruposDuplicados = Object.entries(grupos).filter(([, posts]) => posts.length > 1);

  console.log(`🔍 Grupos com títulos similares: ${gruposDuplicados.length}`);
  console.log(`📝 Posts únicos (sem duplicata): ${Object.values(grupos).filter(g => g.length === 1).length}\n`);

  let totalParaDeletar = 0;
  const idsParaDeletar = [];

  for (const [titulo, grupo] of gruposDuplicados) {
    // O primeiro (índice 0) é o mais recente (ordenamos por published_at DESC)
    const [manter, ...deletar] = grupo;

    console.log(`\n📌 Grupo: "${titulo.substring(0, 60)}..."`);
    console.log(`   ✅ MANTER  → [${manter.niche}] ${manter.slug}`);
    for (const d of deletar) {
      console.log(`   ❌ DELETAR → [${d.niche}] ${d.slug}`);
      idsParaDeletar.push(d.id);
    }
    totalParaDeletar += deletar.length;
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 RESUMO: ${totalParaDeletar} posts serão deletados, ${posts.length - totalParaDeletar} serão mantidos.`);
  console.log(`${'═'.repeat(50)}\n`);

  if (!CONFIRMAR) {
    console.log('✅ Simulação concluída. Para executar, rode com: node limpar_duplicados_supabase.js --confirmar');
    return;
  }

  // 4. DELETAR em lotes de 50 para não sobrecarregar a API
  if (idsParaDeletar.length === 0) {
    console.log('🎉 Nenhum duplicado encontrado! O banco está limpo.');
    return;
  }

  console.log(`\n🔴 INICIANDO EXCLUSÃO DE ${idsParaDeletar.length} POSTS DUPLICADOS...`);
  
  const LOTE = 50;
  let deletados = 0;
  
  for (let i = 0; i < idsParaDeletar.length; i += LOTE) {
    const lote = idsParaDeletar.slice(i, i + LOTE);
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .in('id', lote);

    if (deleteError) {
      console.error(`❌ Erro ao deletar lote ${i/LOTE + 1}:`, deleteError.message);
    } else {
      deletados += lote.length;
      console.log(`✅ Lote ${Math.floor(i/LOTE) + 1}: ${lote.length} posts deletados. (Total: ${deletados}/${idsParaDeletar.length})`);
    }
  }

  console.log(`\n🎉 LIMPEZA CONCLUÍDA! ${deletados} posts duplicados removidos.`);
  console.log(`📊 Posts restantes no banco: ${posts.length - deletados}`);
}

main().catch(console.error);
