import type { QRConfig } from '@/types';
import { Accordion } from '@/components/ui/accordion';
import BackgroundOptions from './BackgroundOptions';

import { LogoOptions } from './LogoOptions';
import { DotsOptionsForm } from './DotsOptions';

interface QRConfigFormProps {
    config: QRConfig;
    onChange: (config: QRConfig) => void;
}

const QRConfigForm = ({ config, onChange }: QRConfigFormProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (key: string, value: any) => {
        onChange({
            ...config,
            [key]: value,
        });
    };

    return (
        <div className="space-y-1 w-full text-foreground">
            <Accordion type="single" collapsible className="space-y-1">
                <BackgroundOptions 
                    config={config} 
                    onChange={(options) => handleChange('backgroundOptions', options)} 
                />
                
                <DotsOptionsForm
                    dotsOptions={config.dotsOptions || { type: 'rounded', color: '#000000' }}
                    dotsOptionsHelper={config.dotsOptionsHelper || {
                        colorType: { single: true, gradient: false },
                            gradient: {
                                linear: true,
                                radial: false,
                                color1: '#000000',
                                color2: '#000000',
                                rotation: '0'
                            }
                        }
                    }
                    onChange={(options) => handleChange('dotsOptions', options)}
                    onChangeHelper={(helper) => handleChange('dotsOptionsHelper', helper)}
                />
                
                <LogoOptions 
                    onChange={(image) => handleChange('image', image)} 
                />
            </Accordion>
        </div>
    );
};

export default QRConfigForm;