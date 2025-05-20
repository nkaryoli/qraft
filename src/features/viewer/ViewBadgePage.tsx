import { useQRBadge } from "@/hooks/useQRBadge";

import { useEffect, useState } from "react";
import { BadgePreview } from "../badge/components/BadgePreview";
import type { Badge } from "@/supabase/types";

const ViewBadgePage = () => {
	const [loading, setLoading] = useState(true);
		const [error, setError] = useState<string | null>(null);
	
		const { loadBadges } = useQRBadge();
		const [ badges, setBadges ] = useState<Badge[]>([]);
		
		useEffect(() => {
			const fetchBadges = async () => {
				setLoading(true);
				try {
					const data = await loadBadges();
					setBadges(data);
				} catch (error) {
					console.error('Error loading badges:', error);
					setError('Failed to load badges');
				} finally {
					setLoading(false);
				}
			}
			fetchBadges();
		}, [loadBadges]);	
	
		if (loading) return <div className="text-center p-8">Loading badge...</div>;
		if (error) return <div className="text-center p-8 text-destructive">{error}</div>;
		if (!badges) return <div className="text-center p-8">No badge data found</div>;
	
		console.log('Badge data:', badges);
		return (
			<div className="max-w-md mx-auto p-4">
				{
					badges.map((badge) => (
						<div key={badge.id} className="mb-4">
							<BadgePreview config={badge.config} />
						</div>
					))
				}
			</div>
		);
}

export default ViewBadgePage