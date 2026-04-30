import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { SEO_CONFIG } from '@/lib/seo.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.baseUrl;

  // Buscar todos os posts publicados DO NICHO DESTE PORTAL
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at, niche')
    .eq('is_published', true)
    .eq('niche', 'concursos');

  const postEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${baseUrl}/${post.niche}/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/concursos`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ];

  return [...staticEntries, ...postEntries];
}
