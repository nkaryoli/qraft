import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { memo, useEffect, useState } from 'react';
import { Heart, ScanQrCode } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { dark } from '@clerk/themes';

const SignInBtn = ({ isMobile, onClick }: { isMobile: boolean; onClick: () => void }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const buttonSize = isMobile === true ? 'default' : 'lg';
    const buttonLabel = isMobile === true ? <FaUser /> : 'Sign in';

    return (
        <div className="ml-4">
            {isClient && (
                <>
                    <SignedOut>
                        <Button
                            size={buttonSize}
                            onClick={onClick}
                            className="transition-opacity duration-200"
                        >
                            {buttonLabel}
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <div className="relative transition-opacity duration-200">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <UserButton
                                    fallback="/"
                                    appearance={{
                                        baseTheme: [dark],
                                        variables: {
                                            colorPrimary: '#db073d',
                                            colorBackground: '#0d1317',
                                            colorTextOnPrimaryBackground: '#ffffff',
                                        },
                                        elements: {
                                            userButtonPopoverFooter: {
                                                display: 'none',
                                            },
                                            footer: {
                                                display: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="My QR Codes"
                                            labelIcon={<ScanQrCode size={16} />}
                                            href="/dashboard"
                                        />
                                        <UserButton.Link
                                            label="Favorite Themes"
                                            labelIcon={<Heart size={16} />}
                                            href="/about"
                                        />
                                        <UserButton.Action label="manageAccount" />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </div>
                            <div
                                className="absolute inset-0 rounded-full pointer-events-none 
									hover:drop-shadow-[0px_0px_6px_rgba(219,7,61,0.5)] 
									group-hover:drop-shadow-[0px_0px_10px_rgba(219,7,61,0.7)]
									transition-all duration-300"
                            ></div>
                        </div>
                    </SignedIn>
                </>
            )}
        </div>
    );
};

export default memo(SignInBtn);
