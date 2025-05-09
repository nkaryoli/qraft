/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from '@/components/Layout';
import { useSession, useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const HomePage = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const { user } = useUser();
    const { session } = useSession();

    const [client, setClient] = useState<SupabaseClient | null>(null);

    useEffect(() => {
        const initSupabase = async () => {
            try{
                const token = await session?.getToken({ template: 'supabase' });
                if (!token) {
                    setLoading(false);
                    console.log("error fetching tocken");
                    return;
                }
                
                const supabaseWithAuth = createClient(supabaseUrl, supabaseAnonKey, {
                    global: {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                });
                setClient(supabaseWithAuth);
            } catch (error) {
                console.error('Error initializing Supabase:', error);
                setLoading(false);
            }
        };
        
        if (session) {
            initSupabase();
        } else {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (!user || !client) {
            setLoading(false);
            return;
        }

        const loadTasks = async () => {
            try {
                setLoading(true);
                const { data, error } = await client.from('tasks').select();

                if (error) {
                    console.error('Error loading tasks:', error);
                    setTasks([]);
                } else {
                    setTasks(data || []);
                }            
            } catch (error) {
                console.error('Unexpected error:', error);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [user, client]);

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!client) return;

        await client.from('tasks').insert({ name });
        setName('');
        // actualiza lista
        const { data } = await client.from('tasks').select();
        setTasks(data || []);
    };

    return (
        <Layout>
            <div className="p-4 max-w-md mx-auto">
                <h1 className="text-xl font-bold mb-4">Tasks</h1>

                {loading && <p>Loading...</p>}
                {!loading && tasks.length > 0 && tasks.map((task) => <p key={task.id}>{task.name}</p>)}
                {!loading && tasks.length === 0 && <p>No tasks found</p>}

                <form onSubmit={createTask} className="mt-4 flex gap-2">
                    <input
                        className="border p-2 flex-grow"
                        type="text"
                        name="name"
                        placeholder="Enter new task"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default HomePage;
