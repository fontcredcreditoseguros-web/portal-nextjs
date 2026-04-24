import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default async function LegacyRedirect({ params }: { params: { legacy: string[] } }) {
  const path = params.legacy.join('/');
  
  // Extrair o slug da URL do Blogger (ex: /2026/04/meu-post.html)
  // O slug geralmente é a última parte antes do .html
  let slug = params.legacy[params.legacy.length - 1];
  if (slug.endsWith('.html')) {
    slug = slug.replace('.html', '');
  }

  // Tentar encontrar o post no banco pelo slug (ou parte dele)
  const { data: post } = await supabase
    .from('posts')
    .select('niche, slug')
    .ilike('slug', `%${slug}%`)
    .single();

  if (post) {
    redirect(`/${post.niche}/${post.slug}`);
  }

  // Se não encontrar, redireciona para a home
  redirect('/');
}
