import type { BadgeConfig, QRConfig } from "@/types";

export type ThemeConfig = {
    background: string;
};

export type Organization = {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    theme: ThemeConfig;
    owner_id: string;
    created_at: string;
    updated_at: string;
};

export type OrganizationInput = {
    name: string;
    slug: string;
    logo_url: string | null;
    theme: ThemeConfig;
    owner_id: string;
};

export type QRCode = {
    id: number;
    title?: string;
    qr_data: string;
    user_id: string;
    qr_template: QRConfig;
};

export type QRCodeInput = {
    title?: string;
    qr_data: string;
    user_id: string;
    qr_template: QRConfig;
};

export type Badge = {
    id: string;
    created_at: string;
    config: BadgeConfig;
    user_id: string;
    expires_at: string;
};

export type BadgeInput = {
    config: BadgeConfig;
    user_id: string;
    expires_at: string;
};
