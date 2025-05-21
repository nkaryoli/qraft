import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
    const navigate = useNavigate();
    const { isLoaded, isSignedIn } = useAuth();

    const handleClick = () => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            navigate('/signin', { state: { redirect: '/customize' } });
            return;
        }
        
        navigate('/customize');
    };
    return (
        <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="bg-accent rounded-lg p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-foreground">
                                Ready to streamline your organization's identification system?
                            </h2>
                            <p className="text-accent-foreground/80 mb-6">
                                Join thousands of organizations who trust our platform for their QR
                                badge needs. Simple pricing, no hidden fees.
                            </p>
                            <Button
                                size="lg"
                                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                onClick={handleClick}
                            >
                                {isLoaded ? (
                                    <>
                                        Start Your Free Trial
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                ) : (
                                    'Loading...'
                                )}
                            </Button>
                        </div>

                        <div className="hidden md:block relative">
                            <img
                                src="/qraft-qr-demo.png"
                                alt="QR Badge examples"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
