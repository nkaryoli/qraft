import type { BadgeConfig } from '@/types';

export const badgeTemplates: Record<string, BadgeConfig> = {
    classic: {
        design: {
            templateId: 'classic',
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a',
            primaryColor: '#2563eb',
            cornerRadius: 4,
            shadow: true,
            layout: 'classic'
        },
        content: {
            profileImageUrl: '',
            employeeName: '',
            position: '',
            department: '',
            organization: '',
            contactInfo: {
                email: '',
                phone: '',
                additionalFields: {},
            },
        },
        qrConfig: {
            data: '',
            color: '#2563eb',
            backgroundColor: '#f3f4f6',
            includeLogoInQR: false,
            position: 'bottom'
        },
    },
    modern: {
        design: {
            templateId: 'modern',
            backgroundColor: '#1a1a1a',
            textColor: '#ffffff',
            primaryColor: '#db073d',
            cornerRadius: 16,
            shadow: true,
            layout: 'modern'
        },
        content: {
            profileImageUrl: '',
            employeeName: '',
            position: '',
            department: '',
            organization: '',
            contactInfo: {
                email: '',
                phone: '',
                additionalFields: {},
            },
        },
        qrConfig: {
            data: '',
            color: '#db073d',
            backgroundColor: '#ffffff',
            includeLogoInQR: true,
            position: 'side'
        },
    },
    minimal: {
        design: {
            templateId: 'minimal',
            backgroundColor: '#0d1317',
            textColor: '#eaeaea',
            primaryColor: '#0d6986',
            cornerRadius: 8,
            shadow: false,
            layout: 'minimal'
        },
        content: {
            profileImageUrl: '',
            employeeName: '',
            position: '',
            department: '',
            organization: '',
            contactInfo: {
                email: '',
                phone: '',
                additionalFields: {},
            },
        },
        qrConfig: {
            data: '',
            color: '#000000',
            backgroundColor: '#ffffff',
            includeLogoInQR: false,
            position: 'overlay'
        },
    },
};