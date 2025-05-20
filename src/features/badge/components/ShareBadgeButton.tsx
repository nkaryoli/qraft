import { shareBadge } from '@/api/apiBadge';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabaseAuth';
import { Copy, Loader, Share } from 'lucide-react';
import { useState } from 'react';
import QRCode from './QRCode';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { BadgeConfig } from '@/types';

export function ShareBadgeButton({ config }: { config: BadgeConfig }) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  const handleShare = async () => {
    if (!supabase) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const url = await shareBadge(supabase, config);
      setShareUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share badge');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            size='lg'
            onClick={handleShare} 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Preparing...
              </>
            ) : (
              <>
                <Share className="mr-2 h-4 w-4" />
                Share Badge
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}

          {shareUrl && (
            <div className="p-4 ">
              <div className="flex justify-center">
                <QRCode url={shareUrl}  />
              </div>
              <div className="mt-4 text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Scan this QR to view the badge
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}
                >
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy Link
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
  );
}

