import {
    AlertDialog,
    AlertDialogHeader,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from './ui/alert-dialog';

import { RocketIcon } from 'lucide-react';
import { Button } from './ui/button';

export function RequireAuthAlert({
    open,
    onOpenChange,
    actionName = 'personalizar tu QR',
    onClick,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actionName?: string;
    onClick: () => void;
}) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <RocketIcon className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <AlertDialogTitle className="text-center text-xl">
                        Acceso Exclusivo
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {`To ${actionName}, you need an account. Unlock powerful customization options!`}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="sm:justify-center gap-3 pt-4">
                    <AlertDialogCancel className="mt-0">Continue as a guest</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={onClick}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Sign Up / Sign In
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
