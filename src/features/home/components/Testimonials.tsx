import { Card, CardDescription } from '@/components/ui/card';
import Baner from './Baner';

const testimonials = [
    {
        name: 'Sarah Johnson',
        initials: 'SJ',
        position: 'HR Director at TechCorp',
        quote: 'Qraft has streamlined our employee identification process. The customization options are incredible and our team loves the professional look.',
    },
    {
        name: 'Michael Chen',
        initials: 'MC',
        position: 'Event Coordinator at Global Events',
        quote: 'For our last conference, we used Qraft for all attendee badges. The scanning feature made check-ins effortless and the design options were perfect.',
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card w-full rounded-xl">
            <div>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Trusted by <span className="text-primary">Leading Organizations</span>
                    </h2>
                    <Baner />
                    <p className="mt-4 text-lg text-muted-foreground">
                        See what our customers say about Qraft
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-[5%] lg:px-[10%]">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="p-6 border-accent/50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-lg font-medium text-foreground">
                                        {testimonial.initials}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.position}
                                    </p>
                                </div>
                            </div>
                            <CardDescription className='text-foreground'>{testimonial.quote}</CardDescription>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
