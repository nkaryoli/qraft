import { CircleHelp, House, ImageUpscale, Info, ScanLine, ScanQrCode } from 'lucide-react';

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
