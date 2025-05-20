import { CircleHelp, House, Info, ScanLine, ScanQrCode } from 'lucide-react';
import type { QRConfig } from './types';

export const navigationLinks = [
    { to: '/', label: 'Home', icon: <House size={20} /> },
    { to: '/Customizer', label: 'Create QR', icon: <ScanQrCode size={20} /> },
    { to: '/qrScanner', label: 'QR Reader', icon: <ScanLine size={20} /> },
    { to: '/custom-badge', label: 'CreateBadge', icon: <Info size={20} /> },
    { to: '/faq', label: 'Faqs', icon: <CircleHelp size={20} /> },
];

export const desktopNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/customize', label: 'Create QR' },
    { to: '/qrScanner', label: 'QR Reader' },
    { to: '/custom-badge', label: 'Create Badge' },
    { to: '/faq', label: 'Faqs' },
];

export const defaultQRConfig: QRConfig = {
    width: 250,
    height: 250,
    data: '',
    type: 'svg',
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
    },
    dotsOptions: {
        type: 'square',
        color: '#000000',
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    cornersSquareOptions: {
        type: 'square',
        color: '#000000',
    },
    cornersDotOptions: {
        type: 'square',
        color: '#000000',
    },
    dotsOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 45,
        },
    },
    cornersSquareOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0,
        },
    },
    cornersDotOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0,
        },
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 0,
    },
};
