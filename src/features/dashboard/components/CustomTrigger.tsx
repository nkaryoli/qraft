import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftOpen } from 'lucide-react';

interface CustomTriggerProps {
    className: string;
}
const CustomTrigger: React.FC<CustomTriggerProps> = ({ className }) => {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className={`fixed top-18 cursor-pointer p-1 border border-transparent transition-colors hover:bg-card hover:border-secondary rounded-md hover:text-secondary z-50 ${className}`}
        >
            <PanelLeftOpen size={26} strokeWidth={1} />
        </button>
    );
};

export default CustomTrigger;
