import { memo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useAuth } from '@clerk/clerk-react';

const WarningModal = ({
    isOpen,
    onClose,
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}) => {
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut({ redirectUrl: '/?sign-in=true' });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-xs"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            aria-modal="true"
            role="dialog"
        >
            <Card className="relative p-9">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-1 text-lg text-primary-foreground tracking-widest cursor-pointer"
                >
                    [x]
                </button>
                <CardContent>
                    <h1 className="text-primary-foreground">{message}</h1>
                </CardContent>
                <CardFooter className="flex justify-between gap-3">
                    <Button variant="secondary" className="w-full max-w-40" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="w-full max-w-40" onClick={handleLogout}>
                        Ok
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default memo(WarningModal);
