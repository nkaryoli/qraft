import { motion, useScroll, useSpring } from 'framer-motion';
import Banner from './components/Baner';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import HeroSection from './components/HeroSection';

const HomePage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />
            <HeroSection />
            <Banner />
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <FeaturesSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <HowItWorks />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Testimonials />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <CTASection />
            </motion.div>
        </>
    );
};

export default HomePage;