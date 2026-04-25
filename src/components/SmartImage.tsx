"use client";

import { useState } from "react";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  keywords?: string;
  className?: string;
}

const getDeterministicFallbackUrl = (text: string) => {
  if (!text) return `https://picsum.photos/seed/concursos/800/600`;
  
  // Algoritmo DJB2 para melhor dispersão de hash
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash) + text.charCodeAt(i);
  }
  
  // Converte para string positiva para servir de seed
  const seed = Math.abs(hash).toString();
  
  return `https://picsum.photos/seed/${seed}/800/600`;
};

export default function SmartImage({ src, alt, keywords, className }: SmartImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  
  const handleError = () => {
    setErrorCount((prev) => prev + 1);
  };

  // Nível 2: Headline Card
  if (errorCount >= 2) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 text-center ${className}`}>
        <div className="mb-4 bg-white/20 p-4 rounded-full">
          <svg className="w-8 h-8 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 8" />
          </svg>
        </div>
        <h3 className="font-bold text-xl leading-tight tracking-tight drop-shadow-md">
          {alt}
        </h3>
        <div className="mt-4 w-12 h-1 bg-white/30 rounded-full" />
      </div>
    );
  }

  // Nível 1: Fallback Determinístico (Picsum com DJB2)
  if (errorCount === 1 || !src) {
    const fallbackUrl = getDeterministicFallbackUrl(alt);
    return (
      <img
        src={fallbackUrl}
        alt={alt}
        className={className}
        onError={handleError}
      />
    );
  }

  // Nível 0: Original
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
