const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('c:/Users/55679/OneDrive/Documentos/portal-nextjs/.env.local', 'utf8');
const envVars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim())));

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSPEditais() {
    const { data, error } = await supabase
        .from('posts')
        .select('title, excerpt')
        .eq('uf', 'SP');
    
    if (error) {
        console.error(error);
        return;
    }

    console.log(`--- Posts encontrados para SP: ${data.length} ---`);
    data.forEach(p => {
        const isRadar = p.excerpt?.includes('|');
        console.log(`- [${isRadar ? 'RADAR/EDITAL' : 'ARTIGO'}] ${p.title}`);
    });
}

checkSPEditais();
