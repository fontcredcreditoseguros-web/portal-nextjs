import { supabase } from '@/lib/supabaseClient';
import { SEO_CONFIG } from '@/lib/seo.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, niche')
    .eq('niche', 'concursos')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(20);

  const site_url = SEO_CONFIG.baseUrl;

  const feedItems = (posts || []).map((post) => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${site_url}/${post.niche}/${post.slug}</link>
        <guid isPermaLink="true">${site_url}/${post.niche}/${post.slug}</guid>
        <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt || ''}]]></description>
      </item>
    `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${SEO_CONFIG.siteName}</title>
      <link>${site_url}</link>
      <description>${SEO_CONFIG.defaultDescription}</description>
      <atom:link href="${site_url}/feed.xml" rel="self" type="application/rss+xml"/>
      <language>pt-BR</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${feedItems}
    </channel>
  </rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
