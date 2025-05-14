export interface QRConfig {
    width?: number;
    height?: number;
    data: string;
    image?: string;
    dotsOptions?: {
        color: string;
        type: 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
    };
    backgroundOptions?: {
        color: string;
    };
    imageOptions?: {
        crossOrigin: string;
        margin: number;
    };
    cornersSquareOptions?: {
        type: 'square' | 'dot' | 'extra-rounded';
        color?: string;
    };
    cornersDotOptions?: {
        type: 'square' | 'dot';
        color?: string;
    };
}

export interface QRCodeRecord {
    id: string;
    user_id: string;
    organization_id?: string;
    title: string;
    content: string;
    config: QRConfig;
    is_badge: boolean;
    badge_data?: BadgeData;
    created_at: string;
    updated_at: string;
}

export interface BadgeData {
    full_name: string;
    position: string;
    department?: string;
    employee_id?: string;
    avatar_url?: string;
    // TODO: agregar atributos de diseño
}

export interface BadgeTemplate {
    id: string;
    organization_id: string;
    name: string;
    config: {
        background: string;
        textColor: string;
        layout: 'horizontal' | 'vertical';
        // TODO: agregar atributos de diseño
    };
    qr_config: QRConfig;
}
