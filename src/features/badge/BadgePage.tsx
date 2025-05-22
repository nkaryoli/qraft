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
import { toast } from 'sonner';
import { badgeTemplates } from './components/BadgeTemplates';
import { cn } from '@/lib/utils';

const TemplatePreview = ({ 
    template, 
    isSelected, 
    onClick 
}: { 
    template: BadgeConfig; 
    isSelected: boolean;
    onClick: () => void;
}) => {
    const layouts = {
        classic: (
            <div className="flex flex-col items-center justify-center gap-1 h-full w-32">
                <div className="w-7 h-9  bg-primary mb-1" />
                <div className="h-2 w-16 rounded bg-primary" />
                <div className="h-1 w-7 rounded bg-primary/50" />
                <div className="h-1 w-9 rounded bg-primary/50" />
                <div className="mt-2 w-5 h-5 border-2 border-primary" />
            </div>
        ),
        modern: (
            <div className="flex items-center justify-between h-full p-2">
                <div className="flex flex-col items-start gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary mb-2" />
                    <div className="h-2 w-12 rounded bg-primary mb-1" />
                    <div className="h-1 w-8 rounded bg-primary/50" />
                    <div className="h-1 w-8 rounded bg-primary/50" />
                </div>
                <div className='flex flex-col items-center'>
                    <div className="w-9 h-9 border-2 border-primary" />
                    <div className="h-4 w-4 border-2 border-primary mt-2" />
                </div>
            </div>
        ),
        minimal: (
            <div className="relative h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 border-2 border-primary" />
                    <div className="h-2 w-16 rounded bg-primary" />
                    <div className="h-1 w-12 rounded bg-primary/50" />
                </div>
                <div className="absolute top-2 right-2 w-4 h-4 border-2 border-primary" />
            </div>
        ),
    };

    return (
        <motion.div
            className={cn(
                "border rounded-lg p-4 cursor-pointer hover:bg-accent/5 transition-all",
                isSelected && "ring-2 ring-primary"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            <div 
                className="h-24 rounded-md mb-2 overflow-hidden"
                style={{
                    background: template.design.backgroundColor,
                    border: `2px solid ${template.design.primaryColor}`,
                }}
            >
                {layouts[template.design.layout]}
            </div>
            <p className="text-xs font-medium text-center capitalize">
                {template.design.templateId}
            </p>
        </motion.div>
    );
};

const BadgePage = () => {
    const [config, setConfig] = useState<BadgeConfig>({
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


    const validateBadgeConfig = (config: BadgeConfig, showToast = true): boolean => {
    if (!config.content.employeeName.trim()) {
        if (showToast) {
                toast('Missing Information 🚫', {
                    description: 'Please add an employee name',
                    duration: 4000,
                    style: { backgroundColor: '#eaeaea', color: '#07485b' }
                });
            }
        return false;
    }
    if (!config.content.organization.trim()) {
        if (showToast) {
            toast('Missing Information 🚫', {
                    description: 'Please add an organization name',
                    duration: 4000,
                    style: { backgroundColor: '#eaeaea', color: '#07485b' }
                });
        }
        return false;
    }
    if (!config.qrConfig.data.trim()) {
        if (showToast) {
            toast('Missing Information 🚫', {
                    description: 'Please add QR code data',
                    duration: 4000,
                    style: { backgroundColor: '#eaeaea', color: '#07485b' }
                });
        }
        return false;
    }
    return true;
};

    const handleSaveClick = async (config: BadgeConfig) => {
        if (!validateBadgeConfig(config, true)) return;
        
        try {
            await handleSaveBadge(config);
            toast.success('Badge saved successfully!');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to save badge');
        }
    };

    const handleTemplateChange = (templateId: string) => {
        const template = badgeTemplates[templateId];
        const userContent = config.content;
        const userQRData = config.qrConfig.data;
        
        setConfig({
            ...template,
            content: {
                ...template.content,
                ...userContent,
            },
            qrConfig: {
                ...template.qrConfig,
                data: userQRData,
            },
        });
    };



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
                    className="w-fit h-fit flex flex-col items-center bg-gradient-to-b from-background via-muted/80 to-black/80 p-11 rounded-xl"
                    
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
                        <TabsList className="w-full">
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
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    {Object.entries(badgeTemplates).map(([id, template]) => (
                                        <TemplatePreview
                                            key={id}
                                            template={template}
                                            isSelected={config.design.templateId === id}
                                            onClick={() => handleTemplateChange(id)}
                                        />
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
                            onClick={() => handleSaveClick(config)}
                        >
                            Save Badge Design
                        </Button>
                        <ShareBadgeButton config={config} disabled={!validateBadgeConfig(config, false)} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BadgePage;
