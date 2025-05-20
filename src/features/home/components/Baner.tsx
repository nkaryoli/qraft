import { Briefcase, Hospital, School, Users } from 'lucide-react';

const Testimonials = () => {
    return (
        <section className="py-12 bg-gradient-to-t from-transparent via-background/30 to-transparent w-full flex justify-center">
            <div className="container px-4 md:px-6">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-6 w-6" />
                        <span className="font-semibold">Enterprise Co.</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <School className="h-6 w-6" />
                        <span className="font-semibold">Education Inc.</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Hospital className="h-6 w-6" />
                        <span className="font-semibold">Health Systems</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-6 w-6" />
                        <span className="font-semibold">Event Organizers</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
