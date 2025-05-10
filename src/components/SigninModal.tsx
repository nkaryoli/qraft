import { SignIn } from "@clerk/clerk-react";
import { memo } from "react";

const SigninModal =({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    
    return (
        <div 
            className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
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
                    signUpFallbackRedirectUrl='/'
                    fallback='/'
                />
            </div>
        </div>
    );
};

export default memo(SigninModal);