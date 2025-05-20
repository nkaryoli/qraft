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

export type BadgeTemplate = {
    id: string;
    name: string;
    previewImage: string;
    defaultConfig: BadgeConfig;
};

export type BadgeConfig = {
    design: {
        templateId: string;
        backgroundColor: string;
        textColor: string;
        primaryColor: string;
        cornerRadius: number;
        shadow: boolean;
    };
    content: {
        profileImageUrl: string;
        logoUrl?: string;
        employeeName: string;
        position: string;
        department: string;
        organization: string;
        contactInfo: {
        email: string;
        phone?: string;
        additionalFields: Record<string, string>;
        };
    };
    qrConfig: {
        data: string;
        color: string; 
        backgroundColor: string;
        includeLogoInQR: boolean;
        logoSize?: number;
    };
};