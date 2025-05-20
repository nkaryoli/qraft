import { useEffect, useState } from 'react';

import { useQRBadge } from '@/hooks/useQRBadge';
import { BadgePreview } from '@/features/badge/components/BadgePreview';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Badge } from '@/supabase/types';

const OrganizationBadge = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { loadBadges } = useQRBadge();
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        const fetchBadges = async () => {
            setLoading(true);
            try {
                const data = await loadBadges();
                setBadges(data);
            } catch (error) {
                console.error('Error loading badges:', error);
                setError('Failed to load badges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchBadges();
    }, [loadBadges]);

    if (loading)
        return (
            <div className="space-y-9 p-6">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-6">
                    <Skeleton className="h-5 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[180px] w-[100px] m-11 mt-5 rounded-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );

    if (!badges.length)
        return (
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold text-foreground">Badges</h1>
                <div className="flex flex-col items-center justify-center p-12 rounded-lg border border-dashed bg-muted/50">
                    <p className="text-muted-foreground">No badges found</p>
                </div>
            </div>
        );

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold text-foreground">Organization Badges</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-medium text-muted-foreground">Team Members</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pl-20">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="transition-all duration-800 scale-[0.3] -mx-70 -my-40"
                        >
                            <BadgePreview config={badge.config} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrganizationBadge;
