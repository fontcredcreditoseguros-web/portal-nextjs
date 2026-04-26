const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('c:/Users/55679/OneDrive/Documentos/portal-nextjs/.env.local', 'utf8');
const envVars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim())));

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .limit(1);
    
    if (error) {
        console.error(error);
        return;
    }

    console.log('--- Colunas da tabela "posts" ---');
    if (data && data.length > 0) {
        console.log(Object.keys(data[0]).join(', '));
    } else {
        console.log('Nenhum dado encontrado para verificar colunas.');
    }
}

checkSchema();
