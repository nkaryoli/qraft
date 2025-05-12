import GenerateQRForm from './components/GenerateQRForm';
import TemplateSection from './components/templateSection/TemplateSection';

const HomePage = () => {

    return (
        <>
            <section className="flex flex-col items-center justify-center w-full min-h-96 mt-32 px-6 md:px-20">
                <h1 className='font-extrabold text-5xl text-center mb-6'>Create and Personalize your QR Code</h1>
                <p className='max-w-lg text-2xl text-center mb-9'>Customize, scan, and share your QR codes in seconds. Effortless and free!!</p>
                <GenerateQRForm/> 
            </section>
            <TemplateSection/>
        </>
    );
};

export default HomePage;
