import { shareBadge } from '@/api/apiBadge';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabaseAuth';
import { Check, Copy, Loader, Share } from 'lucide-react';
import { useState } from 'react';
import QRCode from './QRCode';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import type { BadgeConfig } from '@/types';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ShareBadgeButtonProps {
    config: BadgeConfig;
    disabled?: boolean;
}

export function ShareBadgeButton({ config, disabled }: ShareBadgeButtonProps) {
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const supabase = useSupabase();

    const handleShare = async () => {
        if (!supabase) {
            toast.error('Please sign in to share badges');
            return;
        }

        setLoading(true);
        try {
            const url = await shareBadge(supabase, config);
            setShareUrl(url);
            toast('Badge ready to share! 🎉', {
                description: 'You can now share your badge via QR code or link.',
                duration: 4000,
                style: { backgroundColor: '#eaeaea', color: '#07485b' }
            });
        } catch (err) {
            console.error('Error generating share link:', err);
            toast.error('Failed to generate share link', {
                style: { backgroundColor: '#eaeaea', color: '#07485b' }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast('Link copied! 📋', {
                description: 'The badge link is now in your clipboard.',
                duration: 4000,
                style: { backgroundColor: '#eaeaea', color: '#07485b' }
            });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy link', {
                style: { backgroundColor: '#eaeaea', color: '#07485b' }
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    size="lg" 
                    onClick={handleShare} 
                    disabled={loading || disabled}
                    className="group transition-all duration-300"
                >
                    <motion.div
                        className="flex items-center gap-2"
                        whileTap={{ scale: 0.97 }}
                    >
                        {loading ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Preparing...
                            </>
                        ) : (
                            <>
                                <Share className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                Share Badge
                            </>
                        )}
                    </motion.div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Badge</DialogTitle>
                    <DialogDescription>
                        Share your badge via QR code or copy the link
                    </DialogDescription>
                </DialogHeader>
                
                {shareUrl && (
                    <motion.div 
                        className="p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-center">
                            <QRCode url={shareUrl} />
                        </div>
                        <div className="mt-4 text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Scan this QR to view the badge
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => handleCopy(shareUrl)}
                                className="group"
                            >
                                {copied ? (
                                    <motion.span
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="h-3.5 w-3.5 text-green-500" />
                                        Copied!
                                    </motion.span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Copy className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                                        Copy Link
                                    </span>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </DialogContent>
        </Dialog>
    );
}