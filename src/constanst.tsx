import { ImageUpscale, ScanLine, ScanQrCode } from 'lucide-react';

export const navigationLinks = [
	{ to: '/', label: 'Home' },
	{ to: '/about', label: 'About' },
	{ to: '/faq', label: 'faqs' },
];

export const desktopNavLinks = [
	{ to: '/about', label: 'About' },
	{ to: '/faq', label: 'faqs' },
];

export const serviceLinks = [
	{ to: '/qrGenerator', label: 'Create QR', icon: <ScanQrCode size={16}/>},
	{ to: '/qrScanner', label: 'QR Reader', icon: <ScanLine size={16} />},
	{ to: '/qrGenerator', label: 'Create a Badge', icon: <ImageUpscale size={16} />},
];
