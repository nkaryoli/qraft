import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            duration: 2,
            ease: "easeOut"
        },
        },
    };

    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
        transition: { 
            duration: 0.8,
            ease: "easeOut"
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 pt-32 pb-20">
        <motion.div
            className="text-center space-y-4 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
        >
            <motion.div
                className="flex items-center justify-center gap-2 text-primary mb-4"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                <HelpCircle size={62} />
                </motion.div>
                    <motion.h1
                        className="text-4xl font-bold tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Find answers to common questions about our QR code and badge generation services
                    </motion.p>
                </motion.div>

        <motion.div
            className="w-full max-w-3xl px-4"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="flex flex-col items-center">
                <Accordion type="single" collapsible className="w-full max-w-2xl space-y-2 bg-gradient-to-br from-primary/30 via-background to-muted/30 p-2 rounded-lg">
                    <AccordionItem value="what-is-qraft" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                        <AccordionTrigger className="text-xl font-medium">
                            What is Qraft?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Qraft is a comprehensive platform that allows you to create customized QR codes and digital identification badges. Whether you're an individual looking to create unique QR codes or an organization managing employee badges, Qraft provides the tools you need.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="qr-features" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        What features can I customize in my QR codes?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        With Qraft, you can customize various aspects of your QR codes including:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-lg">
                        <li>Colors and gradients</li>
                        <li>Dot styles and patterns</li>
                        <li>Corner designs</li>
                        <li>Background options</li>
                        <li>Logo integration</li>
                        <li>Size and format</li>
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-badges" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        How do digital identification badges work?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        Digital badges serve as modern identification credentials. Organizations can:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-lg">
                        <li>Choose and customize badge templates</li>
                        <li>Invite members to create profiles</li>
                        <li>Generate QR codes for easy verification</li>
                        <li>Manage all badges through a dashboard</li>
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="org-management" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        How do I manage my organization's badges?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        As an organization administrator, you can:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-lg">
                        <li>Select and customize badge templates</li>
                        <li>Send invitations to team members</li>
                        <li>Review and approve badge requests</li>
                        <li>Manage member permissions</li>
                        <li>Track badge usage and analytics</li>
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        How secure is my data?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        We take security seriously. Your data is protected through:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-lg">
                        <li>Secure authentication via Clerk</li>
                        <li>Encrypted data storage in Supabase</li>
                        <li>Regular security updates</li>
                        <li>Strict access controls</li>
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="getting-started" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        How do I get started?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground">
                        Getting started is easy:
                        <ol className="list-decimal ml-6 mt-2 space-y-1 text-lg">
                        <li>Create an account using your email</li>
                        <li>Choose between creating QR codes or badges</li>
                        <li>Follow our simple customization wizard</li>
                        <li>Download or share your creations</li>
                        </ol>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="technical-requirements" className="bg-gradient-to-b from-background to-black rounded-lg px-6">
                    <AccordionTrigger className="text-xl font-medium">
                        What are the technical requirements?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        Qraft is a web-based application that works on:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-lg">
                        <li>Any modern web browser</li>
                        <li>Desktop and mobile devices</li>
                        <li>No software installation required</li>
                        <li>Stable internet connection needed</li>
                        </ul>
                    </AccordionContent>
                    </AccordionItem>
            </Accordion>
            </motion.div>
        </motion.div>
        </div>
    );
};

export default FAQPage;
