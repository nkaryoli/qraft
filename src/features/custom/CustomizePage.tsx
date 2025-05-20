import { QrCode } from 'lucide-react';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import { QRProvider } from '@/hooks/QRContext';
import { motion } from 'framer-motion';

const CustomizePage = () => {
    return (
        <QRProvider>
            <div className="flex flex-col items-start pt-32 pb-20 gap-14">
                <motion.div
                    className="text-center space-y-4 max-w-3xl mx-auto px-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="relative flex items-center justify-center gap-2 text-primary mb-4"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <QrCode size={82} className="animate-pulse" />
                    </motion.div>

                    <motion.h1
                        className="text-4xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Create Your Custom QR Code
                    </motion.h1>

                    <motion.p
                        className="text-lg text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Design a unique QR code that matches your brand. Customize colors, add your
                        logo, and make it stand out.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <QRCustomizer />
                    </motion.div>

                    <motion.div
                        className="lg:sticky top-32 h-full w-full lg:w-auto"
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <QRPreview />
                    </motion.div>
                </motion.div>
            </div>
        </QRProvider>
    );
};

export default CustomizePage;
