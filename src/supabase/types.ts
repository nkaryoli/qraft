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
    qr_data: string;
    user_id: string;
    qr_template: {
        qrColor: string;
        backgroung: string;
    };
};

export type QRCodeInput = {
    qr_data: string;
    user_id: string;
    qr_template: {
        qrColor: string;
        backgroung: string;
    };
};
