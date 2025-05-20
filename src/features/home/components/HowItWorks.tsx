import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleGetStarted = () => {
        if (!user) {
            navigate('/signin');
            return;
        }
        navigate('/customize');
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-tl from-black via-background to-black mb-24 max-w-7xl rounded-xl">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
                        Get started in minutes with our simple three-step process.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <span className="text-xl font-bold text-primary">1</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Create Organization</h3>
                        <p className="text-muted-foreground">
                            Sign up and create your organization profile with your logo and
                            branding.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <span className="text-xl font-bold text-primary">2</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Add Members</h3>
                        <p className="text-muted-foreground">
                            Import or add your members with their information and assign roles.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <span className="text-xl font-bold text-primary">3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Generate Badges</h3>
                        <p className="text-muted-foreground">
                            Choose a template, customize it, and generate QR badges for your
                            members.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleGetStarted}
                    >
                        Get Started Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
