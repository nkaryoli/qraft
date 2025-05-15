import type { QRConfig } from '../../../types';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import ColorPicker from '../../../components/ColorPiker';
import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';

interface QRConfigFormProps {
    config: QRConfig;
    onChange: (config: QRConfig) => void;
}

export function QRConfigForm({ config, onChange }: QRConfigFormProps) {
    const dotTypes = ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (key: string, value: any) => {
        onChange({
            ...config,
            [key]: value,
        });
    };

    return (
        <div className="space-y-1 w-full text-foreground">
            <Accordion type="single" collapsible className='space-y-1'>  {/* color de fondo */}
                <AccordionItem
                    value="item-1"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">Background Options</AccordionTrigger>
                    <AccordionContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div className="space-y-2 ">
                                <Label htmlFor="bgColor">Background Color</Label>
                                <ColorPicker
                                    color={config.backgroundOptions?.color|| '#000000'}
                                    onChange={(color) =>
                                        handleChange('backgroundOptions', {
                                            ...config.backgroundOptions,
                                            color,
                                        })
                                    }
                                />
                            </div>
                            
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {/* dots options: color y forma*/}
                <AccordionItem
                    value="item-2"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                > 
                    <AccordionTrigger className="bg-muted/70 p-2">Dots Options</AccordionTrigger>
                    <AccordionContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 ">
                                <Label htmlFor="dotColor">Color</Label>
                                <ColorPicker
                                    color={config.dotsOptions?.color || '#000000'}
                                    onChange={(color) =>
                                        handleChange('dotsOptions', {
                                            ...config.dotsOptions,
                                            color,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dotType">Dot Style</Label>
                                <Select
                                    value={config.dotsOptions?.type || 'rounded'}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onValueChange={(value: any) =>
                                        handleChange('dotsOptions', {
                                            ...config.dotsOptions,
                                            type: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select dot type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dotTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {/* logo options */}
                <AccordionItem
                    value="item-3"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">Logo (optional)</AccordionTrigger>
                    <AccordionContent className="pb-0">
                        <div className="p-4 flex items-center gap-2">
                            <label>Upload your own logo:</label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            handleChange('image', event.target?.result as string);
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                }}
                                className="hidden"
                            />
                            <label
                                htmlFor="image"
                                className="border border-muted bg-card py-1 px-5 rounded-md"
                            >
                                Select File
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* <div className="space-y-2">
                <Label>Dots Options</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="dotColor">Color</Label>
                        <ColorPicker
                            color={config.dotsOptions?.color || '#000000'}
                            onChange={(color) =>
                                handleChange('dotsOptions', {
                                    ...config.dotsOptions,
                                    color,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="dotType">Dot Style</Label>
                        <Select
                            value={config.dotsOptions?.type || 'rounded'}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onValueChange={(value: any) =>
                                handleChange('dotsOptions', {
                                    ...config.dotsOptions,
                                    type: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select dot type" />
                            </SelectTrigger>
                            <SelectContent>
                                {dotTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div> */}

            {/* <div className="space-y-2">
                <Label>Fondo</Label>
                <ColorPicker
                    color={config.backgroundOptions?.color || '#ffffff'}
                    onChange={(color) =>
                        handleChange('backgroundOptions', {
                            color,
                        })
                    }
                />
            </div> */}

            {/* <div className="space-y-2">
                <Label htmlFor="image">Logo (opcional)</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                handleChange('image', event.target?.result as string);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />
            </div> */}
        </div>
    );
}
