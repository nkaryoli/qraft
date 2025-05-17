import type {
    Options as QRCodeOptionsBase,
    DotType,
    CornerDotType,
    CornerSquareType,
    Gradient,
    DrawType,
    Mode,
    ErrorCorrectionLevel,
    TypeNumber,
} from "qr-code-styling";

export interface QRConfig extends Omit<QRCodeOptionsBase, 'qrOptions' | 'imageOptions'> {
    data: string;
    width?: number;
    height?: number;
    margin?: number;
    type?: DrawType;

    qrOptions?: {
        typeNumber?: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel?: ErrorCorrectionLevel;
    };

    image?: string;
    imageOptions?: {
        saveAsBlob?: boolean;
        hideBackgroundDots?: boolean;
        imageSize?: number;
        crossOrigin?: string;
        margin?: number;
    };

    dotsOptions?: {
        type?: DotType;
        color?: string;
        gradient?: Gradient;
        roundSize?: boolean;
    };

    backgroundOptions?: {
        round?: number;
        color?: string;
        gradient?: Gradient;
    };

    cornersSquareOptions?: {
        type?: CornerSquareType;
        color?: string;
        gradient?: Gradient;
    };

    cornersDotOptions?: {
        type?: CornerDotType;
        color?: string;
        gradient?: Gradient;
    };

    dotsOptionsHelper?: {
        colorType: {
            single: boolean;
            gradient: boolean;
        };
        gradient: {
            linear: boolean;
            radial: boolean;
            color1: string;
            color2: string;
            rotation: number;
        };
    };

    cornersSquareOptionsHelper?: {
        colorType: {
        single: boolean;
        gradient: boolean;
        };
        gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: number;
        };
    };

    cornersDotOptionsHelper: {
        colorType: { single: boolean; gradient: boolean };
        gradient: {
            linear: boolean;
            radial: boolean;
            color1: string;
            color2: string;
            rotation: number;
        };
    };
}

export type DotShapeType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';

export interface DotsOptions {
    type: DotType;
    color: string;
    gradient?: {
        type: 'linear' | 'radial';
        rotation: number;
        colorStops: { offset: number; color: string }[];
    };
}

export interface DotsOptionsHelper {
    colorType: {
        single: boolean;
        gradient: boolean;
    };
    gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: number;
    };
}

export type GradientType = {
    linear: boolean;
    radial: boolean;
    color1: string;
    color2: string;
    rotation: number;
};

export interface ImageOptionsType {
    hideBackgroundDots?: boolean;
    imageSize?: number;
    margin?: number;
    crossOrigin?: string;
};

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