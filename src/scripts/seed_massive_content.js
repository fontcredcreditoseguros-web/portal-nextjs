const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zzvehyteevkbbetmzfsn.supabase.co';
const supabaseAnonKey = 'sb_publishable_ncpwL2_ojtP69-irhXtpJg_QIhXM4zK';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const posts = [
  // SUDESTE
  {
    title: "Concurso Prefeitura de Indaiatuba (SP): 50 Vagas com Salários de R$ 5,9k",
    slug: "concurso-prefeitura-indaiatuba-sp-2026",
    excerpt: "Indaiatuba abre edital com diversas vagas para a administração municipal. Confira o cronograma.",
    content: "<h1>Prefeitura de Indaiatuba abre concurso em 2026</h1><p>Excelente oportunidade no interior de SP. São 50 vagas em diversos cargos.</p><h2>Resumo</h2><ul><li>Vagas: 50</li><li>Salário: até R$ 5.998,65</li><li>Inscrições: até 28/04</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Câmara de Presidente Prudente (SP) abre concurso com Salário de R$ 22k",
    slug: "concurso-camara-presidente-prudente-sp-2026",
    excerpt: "Oportunidade de ouro no legislativo de Presidente Prudente. Salários de elite para diversos níveis.",
    content: "<h1>Câmara de Presidente Prudente: Edital Publicado</h1><p>Vagas para quem busca estabilidade e alta remuneração no legislativo paulista.</p><h2>Detalhes</h2><ul><li>Vagas: 4</li><li>Salário: até R$ 22.010,63</li><li>Inscrições: até 21/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Câmara de Santa Isabel (SP) abre vaga com Salário de R$ 9,9k",
    slug: "concurso-camara-santa-isabel-sp-2026",
    excerpt: "Oportunidade no legislativo de Santa Isabel. Confira os requisitos.",
    content: "<h1>Concurso Câmara de Santa Isabel 2026</h1><p>Edital aberto para cargos de nível superior e técnico.</p><ul><li>Inscrições: até 25/05</li><li>Salário: R$ 9.916,51</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  // SUL
  {
    title: "Prefeitura de Rolândia (PR) abre 230 Vagas com Salários de R$ 15k",
    slug: "concurso-prefeitura-rolandia-pr-2026",
    excerpt: "Grande concurso no Paraná oferece centenas de vagas em todas as áreas.",
    content: "<h1>Rolândia (PR) abre edital com mais de 200 vagas</h1><p>Um dos maiores concursos do estado no momento.</p><ul><li>Vagas: 230</li><li>Salário: até R$ 15.694,36</li><li>Inscrições: até 12/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Prefeitura de Cambira (PR) abre Concurso com Salário de R$ 13k",
    slug: "concurso-prefeitura-cambira-pr-2026",
    excerpt: "Oportunidade no interior do Paraná para diversas áreas de atuação.",
    content: "<h1>Prefeitura de Cambira: Inscrições Abertas</h1><ul><li>Vagas: 22</li><li>Salário: até R$ 13.918,48</li><li>Inscrições: até 12/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Prefeitura de Santa Mariana (PR) oferece 107 Vagas e R$ 16k de Salário",
    slug: "concurso-prefeitura-santa-mariana-pr-2026",
    excerpt: "Mais uma grande oportunidade no Paraná para o serviço público municipal.",
    content: "<h1>Edital Santa Mariana (PR) 2026</h1><ul><li>Vagas: 107</li><li>Salário: até R$ 16.592,42</li><li>Inscrições: até 11/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  // NORDESTE
  {
    title: "PGE de Alagoas abre Concurso com Salário de R$ 35.877,28",
    slug: "concurso-pge-al-2026-salarios-elite",
    excerpt: "A Procuradoria Geral do Estado de Alagoas publicou edital de elite. Confira os detalhes.",
    content: "<h1>PGE-AL: Oportunidade de Altíssima Autoridade</h1><p>Vagas para Procurador com um dos melhores salários do país.</p><ul><li>Vagas: 20</li><li>Salário: R$ 35.877,28</li><li>Inscrições: até 18/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "UNEAL (AL) abre 41 Vagas para Docentes com Salário de R$ 5,3k",
    slug: "concurso-uneal-al-2026-professor",
    excerpt: "A Universidade Estadual de Alagoas abriu concurso para professores efetivos.",
    content: "<h1>UNEAL abre edital para professores</h1><ul><li>Vagas: 41</li><li>Salário: até R$ 5.324,13</li><li>Inscrições: até 27/04</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "CRECI 9ª Região (BA) abre 15 Vagas com Inscrições até Maio",
    slug: "concurso-creci-ba-2026-vagas",
    excerpt: "Conselho Regional de Corretores de Imóveis da Bahia abre novo edital.",
    content: "<h1>CRECI-BA abre novo concurso</h1><ul><li>Vagas: 15</li><li>Salário: até R$ 3.522,36</li><li>Inscrições: até 20/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  // CENTRO-OESTE
  {
    title: "Câmara de Senador Canedo (GO) abre 25 Vagas e Salário de R$ 11k",
    slug: "concurso-camara-senador-canedo-go-2026",
    excerpt: "Oportunidade legislativa em Goiás com ótimas remunerações.",
    content: "<h1>Edital Câmara de Senador Canedo 2026</h1><ul><li>Vagas: 25</li><li>Salário: até R$ 11.903,79</li><li>Inscrições: até 19/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Funpresp-Jud (DF) abre Concurso com Inscrições Abertas até Maio",
    slug: "concurso-funpresp-jud-df-2026",
    excerpt: "Oportunidade no Distrito Federal para a previdência complementar da magistratura.",
    content: "<h1>Funpresp-Jud abre edital 2026</h1><ul><li>Vagas: 4</li><li>Salário: até R$ 11.495,66</li><li>Inscrições: até 07/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "Câmara de São Luís de Montes Belos (GO) oferece R$ 7,4k de Salário",
    slug: "concurso-camara-montes-belos-go-2026",
    excerpt: "Mais uma oportunidade no legislativo goiano. Confira o edital.",
    content: "<h1>Câmara de Montes Belos (GO) abre concurso</h1><ul><li>Vagas: 8</li><li>Salário: até R$ 7.460,33</li><li>Inscrições: até 15/06</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  // NORTE
  {
    title: "UFPA (PA) abre Concurso para Docentes com Salário de R$ 24k",
    slug: "concurso-ufpa-2026-professor-titular",
    excerpt: "A Universidade Federal do Pará publicou edital de elite para professor titular.",
    content: "<h1>UFPA abre edital para Professor Titular</h1><p>Uma das maiores remunerações acadêmicas do país.</p><ul><li>Vagas: 1</li><li>Salário: R$ 24.802,62</li><li>Inscrições: até 25/05</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "SEMED Vitória do Xingu (PA) abre 212 Vagas na Educação",
    slug: "concurso-semed-vitoria-xingu-pa-2026",
    excerpt: "Grande volume de vagas para a área da educação no interior do Pará.",
    content: "<h1>Vitória do Xingu abre 212 vagas para Educação</h1><ul><li>Vagas: 212</li><li>Inscrições: até 08/05</li><li>Salário: até R$ 2.565,31</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  },
  {
    title: "UNIFESSPA (PA) abre 35 Vagas com Salários de até R$ 8,3k",
    slug: "concurso-unifesspa-pa-2026-vagas",
    excerpt: "Universidade Federal do Sul e Sudeste do Pará abre novo edital para técnicos.",
    content: "<h1>UNIFESSPA abre concurso 2026</h1><ul><li>Vagas: 35</li><li>Salário: até R$ 8.340,33</li><li>Inscrições: até 26/04 (Urgente!)</li></ul>",
    niche: "concursos", is_published: true, published_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('Iniciando alimentação massiva (30 editais)...');
  for (const post of posts) {
    const { data, error } = await supabase.from('posts').insert(post);
    if (error) {
      console.error(`Erro ao inserir ${post.title}:`, error.message);
    } else {
      console.log(`Sucesso: ${post.title}`);
    }
  }
  console.log('Alimentação massiva concluída!');
}

seed();
