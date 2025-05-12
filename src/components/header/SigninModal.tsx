import { SignIn } from "@clerk/clerk-react";
import { memo } from "react";
import { useLocation } from "react-router-dom";

const SigninModal =({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const location = useLocation();
    if (!isOpen) return null;
    
    return (
        <div 
            className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-xs'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            aria-modal="true"
            role="dialog"
        >
            <div onClick={(e) => e.stopPropagation()}>
                <SignIn 
                    fallbackRedirectUrl={location.pathname}
                />
            </div>
        </div>
    );
};

export default memo(SigninModal);