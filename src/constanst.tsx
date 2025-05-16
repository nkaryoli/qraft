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
    dotsOptions: {
        color: '#000000',
        type: 'square',
    },
    dotsOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#db073d',
            color2: '#dba507',
            rotation: 45,
        },
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    cornersSquareOptions: {
        type: 'square',
        color: '#000000',
    },
    cornersSquareOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#db073d',
            color2: '#db073d',
            rotation: 0
        }
    },
    cornersDotOptions: {
        type: 'square',
        color: '#000000'
    },
    cornersDotOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#0d6986',
            color2: '#0d6986',
            rotation: 0
        }
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 0,
        saveAsBlob: true
    },
};