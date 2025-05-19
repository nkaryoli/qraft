import Banner from './components/Baner';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import HeroSection from './components/HeroSection';

const HomePage = () => {
    return (
        <>
            <HeroSection/>
            <Banner/>
            <FeaturesSection/>
            <HowItWorks/>
            <Testimonials/>
            <CTASection/>
        </>
    );
};

export default HomePage;
