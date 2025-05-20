import { motion } from 'framer-motion';
import QrScanner from './components/QrScanner';
import { ScanLine } from 'lucide-react';

const QrScannerPage = () => {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-background/50 via-muted/30 to-background/50 pt-32 pb-20">
            <div className="max-w-[1280px] w-full space-y-9 px-4">
                <div className="text-center space-y-4">
                    <motion.div
                        className="flex items-center justify-center gap-2 text-primary mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ScanLine size={82} className="animate-pulse" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl font-bold tracking-tight"
                    >
                        Scan & Discover
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg text-muted-foreground max-w-[650px] mx-auto"
                    >
                        Scan any QR code in seconds and access its content instantly. It's fast,
                        easy, and secure!
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-fit mx-auto"
                >
                    <div className="relative p-4 bg-card rounded-xl shadow-2xl">
                        <QrScanner />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default QrScannerPage;
