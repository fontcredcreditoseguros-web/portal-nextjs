const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('c:/Users/55679/OneDrive/Documentos/portal-nextjs/.env.local', 'utf8');
const envVars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim())));

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMS() {
    const { data, error } = await supabase
        .from('posts')
        .select('title, excerpt')
        .ilike('title', '%MS%');
    
    if (error) {
        console.error(error);
        return;
    }

    console.log('--- Posts com "MS" no título ---');
    data.forEach(p => console.log(`- ${p.title} (Radar: ${p.excerpt?.includes('|')})`));
    
    const { data: data2 } = await supabase
        .from('posts')
        .select('title, excerpt')
        .ilike('content', '% Mato Grosso do Sul %');
    
    console.log('\n--- Posts com "Mato Grosso do Sul" no conteúdo ---');
    data2?.forEach(p => console.log(`- ${p.title}`));
}

checkMS();
