import { useEffect, useState } from "react";
import { BadgePreview } from "../badge/components/BadgePreview";
import { useSupabase } from "@/hooks/useSupabaseAuth";
import type { BadgeConfig } from "@/types";
import { decodeBadgeFromURL } from "@/api/apiBadge";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const BadgeViewer = () => {
  const [badge, setBadge] = useState<BadgeConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();
  const { id } = useParams();

  useEffect(() => {
    if (!supabase) return;

    const loadBadge = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from('badges')
            .select('config')
            .eq('id', id)
            .single();

          if (error) throw error;
          setBadge(data.config as BadgeConfig);
          return;
        }

        const decodedBadge = await decodeBadgeFromURL(supabase);
        if (!decodedBadge) {
          setError('Badge not found');
          return;
        }
        setBadge(decodedBadge);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load badge');
      }
    };

    loadBadge();
  }, [supabase, id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive bg-destructive/10 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!badge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4">
      <div className="flex-1 flex items-center justify-center">
        <BadgePreview config={badge} />
      </div>
      
      <footer className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <a 
          href="https://qraft-two.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          Powered by Qraft
          <ExternalLink size={14} />
        </a>
      </footer>
    </div>
  );
}

export default BadgeViewer;