import type { QRConfig } from '@/types';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ColorPicker from '@/components/ColorPiker';
import { Label } from '@radix-ui/react-label';

interface BackgroundOptionsProps {
    config: QRConfig;
    onChange: (options: QRConfig['backgroundOptions']) => void;
}

const BackgroundOptions = ({ config, onChange }: BackgroundOptionsProps) => {
    return (
        <AccordionItem
            value="background-options"
            className="border border-muted/70 bg-background/40 rounded-xl"
        >
            <AccordionTrigger className="bg-muted/70 p-2">Background Options</AccordionTrigger>
            <AccordionContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bgColor">Background Color</Label>
                        <ColorPicker
                            color={config.backgroundOptions?.color || '#ffffff'}
                            onChange={(color) =>
                                onChange({
                                    ...config.backgroundOptions,
                                    color,
                                })
                            }
                        />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default BackgroundOptions;
