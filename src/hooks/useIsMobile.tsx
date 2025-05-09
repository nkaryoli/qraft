import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint: number = 976) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        let timeoutId: number;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                setIsMobile(window.innerWidth < breakpoint);
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};
