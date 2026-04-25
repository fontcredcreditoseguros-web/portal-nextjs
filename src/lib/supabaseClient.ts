import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function sanitizeTitle(title: string): string {
  if (!title) return "";
  
  let clean = title;
  
  // Limpeza de padrões genéricos de Concursos
  clean = clean.replace(/^CONCURSO(S)?\s+PÚBLICO(S)?\s*(DE|DA|DO)?\s*/gi, '');
  clean = clean.replace(/^(EDITAL|CONCURSO)\s*:\s*/gi, '');
  
  clean = clean.trim();
  if (clean.length < 3) return title; // Evita títulos vazios ou muito curtos
  
  // Capitalize
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
