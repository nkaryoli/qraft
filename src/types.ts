export interface QRConfig {
    width?: number;
    height?: number;
    data: string;
    image?: string;
    dotsOptions?: DotsOptions;
    dotsOptionsHelper?: DotsOptionsHelper;
    backgroundOptions?: {
        color: string;
        round?: number;
        gradient?: Gradient;
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

export type DotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';

export type GradientOption = 'linear' | 'radial';

export type DotsOptions = {
    type: DotType;
    color: string;
    gradient?: Gradient;
};

export type Gradient = {
    type: GradientOption;
    rotation: number;
    colorStops: {
        offset: number;
        color: string;
    }[];
};

export type DotsOptionsHelper = {
    colorType: {
        single: boolean;
        gradient: boolean;
    };
    gradient: GradientType;
}; 

export type GradientType = {
    linear: boolean;
    radial: boolean;
    color1: string;
    color2: string;
    rotation: number;
};

export interface qrOptions {
    typeNumber: string;
    mode: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export interface imageOptions {
    hideBackgroundDots?: boolean;
    imageSize?: number;
    margin?: number;
    saveAsBlob?: boolean;
}

export interface dotsOptions {
    type: 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
    color: string;
    gradient?: {
        type: 'linear' | 'radial';
        rotation: string;
        colorStops: Array<{ offset: number; color: string }>;
    };
}

export interface dotsOptionsHelper {
    colorType: { single: boolean; gradient: boolean };
    gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: string;
    };
}

export interface backgroundOptions {
    color: string;
    round?: number;
    gradient?: {
        type: 'linear' | 'radial';
        rotation: string;
        colorStops: Array<{ offset: number; color: string }>;
    };
}

export interface backgroundOptionsHelper {
    colorType: { single: boolean; gradient: boolean };
    gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: string;
    };
}

export interface cornersSquareOptions {
    type: '' | 'square' | 'dot' | 'extra-rounded';
    color?: string;
    gradient?: {
        type: 'linear' | 'radial';
        rotation: string;
        colorStops: Array<{ offset: number; color: string }>;
    };
}

export interface cornersSquareOptionsHelper {
    colorType: { single: boolean; gradient: boolean };
    gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: string;
    };
}

export interface cornersDotOptions {
    type: '' | 'square' | 'dot';
    color?: string;
    gradient?: {
        type: 'linear' | 'radial';
        rotation: string;
        colorStops: Array<{ offset: number; color: string }>;
    };
}

export interface cornersDotOptionsHelper {
    colorType: { single: boolean; gradient: boolean };
    gradient: {
        linear: boolean;
        radial: boolean;
        color1: string;
        color2: string;
        rotation: string;
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

export interface json {
    type: 'canvas';
    shape: 'square';
    width: 300;
    height: 300;
    data: 'https://qr-code-styling.com';
    margin: 0;
    qrOptions: {
        typeNumber: '0';
        mode: 'Byte';
        errorCorrectionLevel: 'Q';
    };
    imageOptions: {
        saveAsBlob: true;
        hideBackgroundDots: true;
        imageSize: 0.4;
        margin: 0;
    };
    image: '10cc19bd484118dbcd0a7886a38ceddc.png';
    dotsOptions: { type: 'extra-rounded'; color: '#6a1a4c'; roundSize: true };
    dotsOptionsHelper: {
        colorType: { single: true; gradient: false };
        gradient: {
            linear: true;
            radial: false;
            color1: '#6a1a4c';
            color2: '#6a1a4c';
            rotation: '0';
        };
    };
    backgroundOptions: { round: 0; color: '#ffffff' };
    backgroundOptionsHelper: {
        colorType: { single: true; gradient: false };
        gradient: {
            linear: true;
            radial: false;
            color1: '#ffffff';
            color2: '#ffffff';
            rotation: '0';
        };
    };
    cornersSquareOptions: { type: 'extra-rounded'; color: '#000000' };
    cornersSquareOptionsHelper: {
        colorType: { single: true; gradient: false };
        gradient: {
            linear: true;
            radial: false;
            color1: '#000000';
            color2: '#000000';
            rotation: '0';
        };
    };
    cornersDotOptions: { type: ''; color: '#000000' };
    cornersDotOptionsHelper: {
        colorType: { single: true; gradient: false };
        gradient: {
            linear: true;
            radial: false;
            color1: '#000000';
            color2: '#000000';
            rotation: '0';
        };
    };
}
