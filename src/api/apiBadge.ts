import type { Badge, BadgeInput } from '@/supabase/types';
import type { BadgeConfig } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const QRBadgeAPI = (client: SupabaseClient) => ({

  async getQRBadges(userId: string): Promise<Badge[]> {
    const { data, error } = await client
      .from('badges')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data || [];
  },

  async create(input: BadgeInput): Promise<BadgeConfig> {

    const { data, error } = await client
      .from('badges')
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Error creating badge: ${error.message}`);

    return data;
  },

  async update(id: string, updates: Partial<BadgeConfig>): Promise<BadgeConfig> {
    const { data, error } = await client
      .from('sbadges')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Error updating badge: ${error.message}`);

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await client.from('badges').delete().eq('id', id);
    if (error) throw new Error(`Error deleting badge: ${error.message}`);
  },

})

export async function shareBadge(supabase: SupabaseClient, badge: BadgeConfig): Promise<string> {
  if (badge.content.profileImageUrl || badge.content.logoUrl) {
    const { data, error } = await supabase
      .from('badges')
      .insert({
        config: badge,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return `${window.location.origin}/viewer/${data.id}`;
  }

  return encodeBadgeToURL(badge);
}

export function encodeBadgeToURL(badge: BadgeConfig): string {
  const badgeWithoutImages = {
    ...badge,
    content: {
      ...badge.content,
      profileImageUrl: '',
      logoUrl: ''
    }
  };

  const compressed = JSON.stringify(badgeWithoutImages);
  return `${window.location.origin}/viewer#${encodeURIComponent(compressed)}`;
}

export async function decodeBadgeFromURL(supabase?: SupabaseClient): Promise<BadgeConfig | null> {
  const pathParts = window.location.pathname.split('/');
  const badgeId = pathParts[pathParts.length - 1];

  if (badgeId && supabase) {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('config')
        .eq('id', badgeId)
        .single();

      if (error) throw error;
      return data.config as BadgeConfig;
    } catch (error) {
      console.error('Error fetching badge from database:', error);
    }
  }

  const hash = window.location.hash.substring(1);
  if (!hash) return null;

  try {
    return JSON.parse(decodeURIComponent(hash)) as BadgeConfig;
  } catch (error) {
    console.error('Error decoding badge from URL:', error);
    return null;
  }
}