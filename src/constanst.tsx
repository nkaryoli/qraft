import { CircleHelp, House, ImageUpscale, Info, ScanLine, ScanQrCode } from 'lucide-react';
import type { QRConfig } from './types';

export const navigationLinks = [
    { to: '/', label: 'Home', icon: <House size={20} /> },
    { to: '/qrGenerator', label: 'Create QR', icon: <ScanQrCode size={20} /> },
    { to: '/qrScanner', label: 'QR Reader', icon: <ScanLine size={20} /> },
    { to: '/dashboard', label: 'Create a Badge', icon: <ImageUpscale size={20} /> },
    { to: '/about', label: 'About', icon: <Info size={20} /> },
    { to: '/faq', label: 'Faqs', icon: <CircleHelp size={20} /> },
];

export const desktopNavLinks = [
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'Faqs' },
];

export const serviceLinks = [
    { to: '/qrGenerator', label: 'Create QR', icon: <ScanQrCode size={16} /> },
    { to: '/qrScanner', label: 'QR Reader', icon: <ScanLine size={16} /> },
    { to: '/dashboard', label: 'Create a Badge', icon: <ImageUpscale size={16} /> },
];
export const defaultQRConfig: QRConfig = {
    width: 250,
    height: 250,
    data: '',
    type: 'svg', // Añadido para coincidir con DrawType
    margin: 10, // Valor por defecto recomendado
    qrOptions: { // Añadido para coincidir con la librería
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
    },
    dotsOptions: {
        type: 'square',
        color: '#000000'
    },
    backgroundOptions: {
        color: '#ffffff'
    },
    cornersSquareOptions: {
        type: 'square',
        color: '#000000'
    },
    cornersDotOptions: {
        type: 'square',
        color: '#000000'
    },
    // Helpers (específicos de tu UI)
    dotsOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 45
        }
    },
    cornersSquareOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0
        }
    },
    cornersDotOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0
        }
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 0
    }
};