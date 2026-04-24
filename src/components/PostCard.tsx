'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image_url: string;
    niche: string;
    published_at: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/${post.niche}/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={post.image_url || '/placeholder.jpg'} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e: any) => {
            const title = post.title.toLowerCase();
            if (title.includes('polícia') || title.includes('prf') || title.includes('pf') || title.includes('segurança')) {
              e.target.src = 'https://images.pexels.com/photos/9324332/pexels-photo-9324332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Viatura/Polícia
            } else {
              e.target.src = 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Justiça/Governo
            }
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
          {post.niche}
        </div>
      </Link>
      
      <div className="p-6">
        <div className="text-xs text-gray-400 mb-2">
          {format(new Date(post.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
        </div>
        <Link href={`/${post.niche}/${post.slug}`}>
          <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <Link 
          href={`/${post.niche}/${post.slug}`}
          className="text-sm font-bold text-blue-600 flex items-center hover:underline"
        >
          Ler artigo completo
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
