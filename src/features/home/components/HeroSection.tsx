import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GenerateQRHome from './GenerateQRHome';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const [showInput, setShowInput] = useState<boolean>(false);

    return (
        <div className="w-full text-foreground">
            <section className="relative pb-24 pt-52 px-4 sm:px-6 lg:px-8 space-y-6 xl:min-h-[85vh]">
                <motion.div 
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="secondary" className="mb-4 text-sm font-medium">
                                Revolutionizing Digital Identification
                            </Badge>
                        </motion.div>

                        <motion.h1 
                            className="text-4xl md:text-6xl font-bold tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Create Stunning and Customized <br/>
                            <motion.span 
                                className="text-primary"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                QR Codes
                            </motion.span> and{' '}
                            <motion.span 
                                className="text-primary"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Badges
                            </motion.span>
                        </motion.h1>

                        <motion.p 
                            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            The all-in-one solution for professional digital identification, 
                            instant access, and brand consistency.
                        </motion.p>

                        <motion.div 
                            className="mt-10 w-full max-w-sm px-9 "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            {showInput ? (
                                <GenerateQRHome />
                            ) : (
                                <>
                                    <Button 
                                        size="lg" 
                                        onClick={() => setShowInput(true)}
                                        className="relative overflow-hidden group w-full"
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-primary/20"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        Get Started Free 
										<ArrowRight className="ml-2 h-4 w-4  group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default HeroSection;