'use client';

import React, { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);
  const [fallbackStep, setFallbackStep] = useState(0); // 0: Original, 1: Specific Fallback, 2: Headline Card

  const handleImageError = () => {
    if (fallbackStep === 0) {
      setFallbackStep(1);
    } else {
      setImageError(true);
    }
  };

  // Imagem de reserva específica baseada em palavras-chave
  let fallbackUrl = 'https://images.pexels.com/photos/208444/pexels-photo-208444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Brasília (Padrão)
  const title = post.title.toLowerCase();
  
  if (title.includes('polícia') || title.includes('prf') || title.includes('pf') || title.includes('segurança')) {
    // Usando o ID exato encontrado pelo Arthur (Agente PRF de costas)
    fallbackUrl = 'https://images.pexels.com/photos/27200234/pexels-photo-27200234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  }

  return (
    <article className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/${post.niche}/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageError ? (
          <img 
            src={fallbackStep === 0 ? (post.image_url || '/placeholder.jpg') : fallbackUrl} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-6 text-center relative">
             <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white">
              {post.niche}
            </div>
            <h3 className="text-white font-black text-lg md:text-xl leading-tight mb-2 drop-shadow-xl line-clamp-3">
              {post.title}
            </h3>
            <div className="w-10 h-1 bg-white/30 rounded-full mt-2"></div>
          </div>
        )}
        {!imageError && (
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {post.niche}
          </div>
        )}
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
