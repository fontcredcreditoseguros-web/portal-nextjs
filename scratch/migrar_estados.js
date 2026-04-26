const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Carregar chaves
const env = fs.readFileSync('c:/Users/55679/OneDrive/Documentos/portal-nextjs/.env.local', 'utf8');
const envVars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim())));

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY; // Usando a chave mestra
const supabase = createClient(supabaseUrl, supabaseKey);

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

async function migrar() {
    console.log('🚀 Iniciando Migração Retroativa de Estados...');
    
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title')
        .is('uf', null);

    if (error) {
        console.error('Erro ao buscar posts:', error);
        return;
    }

    console.log(`Encontrados ${posts.length} posts sem UF definido.`);

    for (const post of posts) {
        let ufEncontrada = null;
        
        // Tenta achar a UF no título (ex: "- MS", " em MS", "/MS")
        for (const uf of UFS) {
            const regex = new RegExp(`[\\s\\-/\\(]${uf}([\\s\\W]|$)`, 'i');
            if (regex.test(post.title)) {
                ufEncontrada = uf;
                break;
            }
        }

        if (ufEncontrada) {
            const { error: updateError } = await supabase
                .from('posts')
                .update({ uf: ufEncontrada })
                .eq('id', post.id);
            
            if (updateError) {
                console.error(`Erro ao atualizar post ${post.id}:`, updateError);
            } else {
                console.log(`✅ Post "${post.title}" -> ${ufEncontrada}`);
            }
        }
    }

    console.log('✨ Migração concluída!');
}

migrar();
