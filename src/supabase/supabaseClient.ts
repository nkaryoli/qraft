import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Variable global para almacenar el cliente
let authClient: SupabaseClient | null = null;

export const getAuthenticatedClient = async (token: string) => {
    // Si ya existe, lo retornamos
    if (authClient) return authClient;

    // Si no, lo creamos
    authClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return authClient;
};

// Para limpiar en logout
export const resetSupabaseClient = () => {
    authClient = null;
};
