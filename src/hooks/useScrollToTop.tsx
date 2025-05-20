import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
    const { pathname } = useLocation();
    const [backToTop, setBackToTop] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            setBackToTop(scrollY > 200);

            setIsNearFooter(scrollY + windowHeight >= documentHeight - 90);
            };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return { scrollToTop, backToTop, isNearFooter };
};