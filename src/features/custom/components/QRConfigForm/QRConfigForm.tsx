import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import BackgroundOptions from './BackgroundOptions';
import DotsOptionsForm from './DotsOptions';
import CornersSquareOptions from './CornerSquareOptions';
import CornersDotOptions from './CornersDotOptions';
import ImageOptions from './ImageOptions';
import { memo } from 'react';
import { useQR } from '@/hooks/QRContext';

const QRConfigForm = () => {
    const { qrConfig: config, handleChange } = useQR();

    return (
        <div className="space-y-1 w-full text-foreground">
            <Accordion type="single" collapsible className="space-y-1">
                <AccordionItem
                    value="background-options"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">
                        Background Options
                    </AccordionTrigger>
                    <AccordionContent asChild>
                        <BackgroundOptions
                            config={config}
                            onChange={(options) => handleChange('backgroundOptions', options)}
                        />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="dots-options"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">Dots Options</AccordionTrigger>
                    <AccordionContent asChild>
                        <DotsOptionsForm />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="corner-square-options"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">
                        Corner Squre Options
                    </AccordionTrigger>
                    <AccordionContent asChild>
                        <CornersSquareOptions
                            config={config}
                            onChange={(options) => handleChange('cornersSquareOptions', options)}
                            onChangeHelper={(helper) =>
                                handleChange('cornersSquareOptionsHelper', helper)
                            }
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="dots-square-options"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">
                        Dots Squre Options
                    </AccordionTrigger>
                    <AccordionContent asChild>
                        <CornersDotOptions
                            config={config}
                            onChange={(options) => handleChange('cornersDotOptions', options)}
                            onChangeHelper={(helper) =>
                                handleChange('cornersDotOptionsHelper', helper)
                            }
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="image-options"
                    className="border border-muted/70 bg-background/40 rounded-xl"
                >
                    <AccordionTrigger className="bg-muted/70 p-2">Logo Options</AccordionTrigger>
                    <AccordionContent asChild>
                        <ImageOptions
                            config={config}
                            onChange={(options) => handleChange('imageOptions', options)}
                            onImageChange={(image) => handleChange('image', image)}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default memo(QRConfigForm);
