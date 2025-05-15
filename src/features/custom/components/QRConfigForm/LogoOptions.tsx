import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface LogoOptionsProps {
    onChange: (image: string) => void;
}

export const LogoOptions = ({ onChange }: LogoOptionsProps) => (
    <AccordionItem
        value="logo-options"
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
                                onChange(event.target?.result as string);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                    className="hidden"
                />
                <label htmlFor="image" className="border border-muted bg-card py-1 px-5 rounded-md">
                    Select File
                </label>
            </div>
        </AccordionContent>
    </AccordionItem>
);
