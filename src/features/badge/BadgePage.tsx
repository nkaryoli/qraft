import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BadgeIcon, Sparkles, Upload } from 'lucide-react';
import ColorPicker from '@/components/ColorPiker';
import { BadgePreview } from './components/BadgePreview';
import { useQRBadge } from '@/hooks/useQRBadge';
import { ShareBadgeButton } from './components/ShareBadgeButton';
import type { BadgeConfig } from '@/types';
import { motion } from 'framer-motion';

const BadgePage = () => {
    const [config, setConfig] = useState<BadgeConfig>({
        design: {
            templateId: 'default',
            backgroundColor: '#0d1317',
            textColor: '#eaeaea',
            primaryColor: '#0d6986',
            cornerRadius: 8,
            shadow: true,
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
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileImgRef = useRef<HTMLInputElement>(null);

    const handleDesignChange = (
        key: keyof BadgeConfig['design'],
        value: string | number | boolean,
    ) => {
        setConfig((prev) => ({
            ...prev,
            design: { ...prev.design, [key]: value },
        }));
    };

    const handleContentChange = (key: keyof BadgeConfig['content'], value: string) => {
        setConfig((prev) => ({
            ...prev,
            content: { ...prev.content, [key]: value },
        }));
    };

    const handleQRConfigChange = (key: keyof BadgeConfig['qrConfig'], value: string | boolean) => {
        setConfig((prev) => ({
            ...prev,
            qrConfig: { ...prev.qrConfig, [key]: value },
        }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setConfig((prev) => ({
                    ...prev,
                    content: { ...prev.content, logoUrl: event.target?.result as string },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setConfig((prev) => ({
                    ...prev,
                    content: { ...prev.content, profileImageUrl: event.target?.result as string },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const { handleSaveBadge } = useQRBadge();

    return (
        <div className="flex flex-col items-center gap-8 lg:gap-14 py-32">
            <motion.div
                className="text-center space-y-4 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="relative flex items-center justify-center gap-2 text-primary mb-4"
                    animate={{
                        scale: [1, 1.02, 1],
                        rotate: [0, -2, 2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                >
                    <BadgeIcon size={82} />
                    <Sparkles
                        size={24}
                        className="absolute"
                        style={{ filter: 'drop-shadow(0 0 8px var(--primary))' }}
                    />
                </motion.div>

                <motion.h1
                    className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-white"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                >
                    Create Your Digital Badge
                </motion.h1>

                <motion.p
                    className="text-lg text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Design a professional digital badge with custom colors, your organization's
                    logo, and integrated QR code functionality.
                </motion.p>
            </motion.div>

            <motion.div
                className="flex flex-col lg:flex-row gap-8 lg:gap-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.div
                    className="w-full max-w-md flex flex-col items-center justify-center bg-gradient-to-b from-background via-muted/80 to-black/80 p-11 rounded-xl"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.h2
                        className="text-2xl mb-6 w-full text-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Badge Preview
                    </motion.h2>
                    <BadgePreview config={config} />
                </motion.div>

                <motion.div
                    className="space-y-6 p-11 bg-gradient-to-b from-background via-muted/80 to-black/80 rounded-xl w-full h-full"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-2xl mb-4">Badge Design</h2>
                    <Tabs defaultValue="design">
                        <TabsList className="w-full lg:w-lg">
                            <TabsTrigger value="design">Design</TabsTrigger>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="qr">QR Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="design"
                            className="space-y-4 bg-background p-6 rounded-lg h-full"
                        >
                            <div className="space-y-2">
                                <Label>Template</Label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {['default', 'modern', 'classic'].map((template) => (
                                        <div
                                            key={template}
                                            className={`border rounded-md p-2 cursor-pointer ${config.design.templateId === template ? 'ring-2 ring-primary' : ''}`}
                                            onClick={() =>
                                                handleDesignChange('templateId', template)
                                            }
                                        >
                                            <div className="h-20 bg-card rounded" />
                                            <p className="text-xs text-center mt-1">{template}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Background Color</Label>
                                <ColorPicker
                                    color={config.design.backgroundColor}
                                    onChange={(color) =>
                                        handleDesignChange('backgroundColor', color)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Text Color</Label>
                                <ColorPicker
                                    color={config.design.textColor}
                                    onChange={(color) => handleDesignChange('textColor', color)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Primary Color</Label>
                                <ColorPicker
                                    color={config.design.primaryColor}
                                    onChange={(color) => handleDesignChange('primaryColor', color)}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="content"
                            className="space-y-4 p-6 bg-background rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="space-y-3">
                                    <Label>Organization</Label>
                                    <Input
                                        value={config.content.organization}
                                        onChange={(e) =>
                                            handleContentChange('organization', e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-0.5">
                                    <Label>Logo</Label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleLogoUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <Button
                                        variant="outline"
                                        className="w-full mt-2"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Logo
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={config.content.employeeName}
                                    onChange={(e) =>
                                        handleContentChange('employeeName', e.target.value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Input
                                    value={config.content.position}
                                    onChange={(e) =>
                                        handleContentChange('position', e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Input
                                    value={config.content.department}
                                    onChange={(e) =>
                                        handleContentChange('department', e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Label>Profile icture</Label>
                                <input
                                    type="file"
                                    ref={fileImgRef}
                                    onChange={handleProfileImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    className="w-40 mt-2"
                                    onClick={() => fileImgRef.current?.click()}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload File
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="qr" className="space-y-4 p-6 bg-background rounded-lg">
                            <div className="space-y-2">
                                <Label>QR Data (URL or text)</Label>
                                <Input
                                    value={config.qrConfig.data}
                                    onChange={(e) => handleQRConfigChange('data', e.target.value)}
                                    placeholder="https://example.com/profile/john-doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>QR Color</Label>
                                <ColorPicker
                                    color={config.qrConfig.color}
                                    onChange={(color) => handleQRConfigChange('color', color)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>QR Background</Label>
                                <ColorPicker
                                    color={config.qrConfig.backgroundColor}
                                    onChange={(color) =>
                                        handleQRConfigChange('backgroundColor', color)
                                    }
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="includeLogo"
                                    checked={config.qrConfig.includeLogoInQR}
                                    onChange={(e) =>
                                        handleQRConfigChange('includeLogoInQR', e.target.checked)
                                    }
                                />
                                <Label htmlFor="includeLogo">Include Logo in QR Center</Label>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="gap-2 w-full  border-secondary/70 hover:border-secondary hover:bg-secondary/10 text-secondary"
                            onClick={() => handleSaveBadge(config)}
                        >
                            Save Badge Design
                        </Button>
                        <ShareBadgeButton config={config} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BadgePage;
