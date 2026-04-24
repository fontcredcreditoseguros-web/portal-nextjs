const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zzvehyteevkbbetmzfsn.supabase.co';
const supabaseAnonKey = 'sb_publishable_ncpwL2_ojtP69-irhXtpJg_QIhXM4zK';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const posts = [
  {
    title: "Concurso ALE-RR 2026: Salários de até R$ 39.000 (Inscrições Abertas!)",
    slug: "concurso-ale-rr-2026-inscricoes-abertas",
    excerpt: "A Assembleia Legislativa de Roraima abriu concurso com remunerações impressionantes. Veja como garantir sua vaga.",
    content: "<h1>Assembleia Legislativa de Roraima abre Edital 2026</h1><p>Oportunidade histórica para quem busca estabilidade e altos salários. O concurso da ALE-RR oferece vagas para diversos níveis com salários que chegam a R$ 39.231,00.</p><h2>Vagas e Salários</h2><ul><li>Procurador: R$ 39.231,00</li><li>Analista: R$ 10.000,00</li><li>Técnico: R$ 5.000,00</li></ul><p>As inscrições podem ser feitas até o dia 06 de maio.</p>",
    image_url: "",
    niche: "concursos",
    is_published: true,
    published_at: new Date().toISOString()
  },
  {
    title: "Delegado PCDF 2026: Edital com 150 Vagas e Salário de R$ 26k",
    slug: "concurso-pcdf-2026-delegado-vagas",
    excerpt: "A Polícia Civil do Distrito Federal publicou edital para Delegado. Confira os requisitos e cronograma.",
    content: "<h1>Polícia Civil do DF abre vagas para Delegado</h1><p>Um dos concursos mais aguardados da área policial. São 150 vagas para o cargo de Delegado de Polícia.</p><h2>Resumo do Concurso</h2><ul><li>Vagas: 150</li><li>Salário Inicial: R$ 26.500,00</li><li>Inscrições até: 10 de maio</li></ul><p>A prova exige formação em Direito e prática jurídica.</p>",
    image_url: "",
    niche: "concursos",
    is_published: true,
    published_at: new Date().toISOString()
  },
  {
    title: "URGENTE: Inscrições para o TJ-SC Terminam Amanhã (25/04)!",
    slug: "concurso-tj-sc-inscricoes-terminando",
    excerpt: "Última chamada para o Tribunal de Justiça de Santa Catarina. Não perca o prazo para salários de R$ 10k.",
    content: "<h1>TJ-SC: Prazo de inscrição se encerra amanhã</h1><p>Se você ainda não garantiu sua inscrição para o Tribunal de Justiça de Santa Catarina, corra! O prazo termina nesta sexta-feira, 25 de abril.</p><h2>Detalhes da Oportunidade</h2><p>Vagas para Analista e Técnico com remunerações excelentes e ótimos benefícios.</p>",
    image_url: "",
    niche: "concursos",
    is_published: true,
    published_at: new Date().toISOString()
  },
  {
    title: "Concurso ESA 2026: Exército Abre Milhares de Vagas Nacionais",
    slug: "concurso-esa-2026-exercito-vagas",
    excerpt: "As inscrições para a Escola de Sargentos das Armas estão abertas. Saiba tudo sobre as provas.",
    content: "<h1>ESA 2026: Carreira Militar para Jovens de Todo o Brasil</h1><p>O Exército Brasileiro abriu o edital para a ESA. Vagas para as áreas de Combatente, Logística, Saúde e Música.</p><h2>Requisitos</h2><ul><li>Idade: 17 a 24 anos</li><li>Nível: Ensino Médio completo</li><li>Salário após formação: R$ 5.000+</li></ul>",
    image_url: "",
    niche: "concursos",
    is_published: true,
    published_at: new Date().toISOString()
  },
  {
    title: "Marinha do Brasil abre vagas para Oficiais 2026. Inscrições aqui!",
    slug: "concurso-marinha-oficiais-2026",
    excerpt: "Oportunidade na Marinha para diversas formações de nível superior. Confira o edital.",
    content: "<h1>Carreira de Oficial na Marinha do Brasil</h1><p>A Marinha publicou edital para o Quadro Complementar de Oficiais. Vagas para Engenharia, Administração e mais.</p>",
    image_url: "",
    niche: "concursos",
    is_published: true,
    published_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('Iniciando alimentação de conteúdo...');
  for (const post of posts) {
    const { data, error } = await supabase.from('posts').insert(post);
    if (error) {
      console.error(`Erro ao inserir ${post.title}:`, error.message);
    } else {
      console.log(`Sucesso: ${post.title}`);
    }
  }
  console.log('Alimentação concluída!');
}

seed();
