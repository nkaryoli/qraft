import { Button } from '../../../components/ui/button';
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GenerateQRForm = () => {
    const navigate = useNavigate();

    const handleGenerateQR = () => {
        navigate('/Customization');
    }
    
    return (
        <div className="w-full max-w-xl bg-background rounded-xl p-3">
            <form className="flex w-full h-fit gap-2 bg-bg-200 rounded-md">
                <input
                    type="text"
                    placeholder="Type QR info here"
                    className="w-full border p-2 text-md text-text-200 font-bodyText rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size='lg' onClick={() => handleGenerateQR()}>
                    <ArrowRight />
                </Button>
            </form>
        </div>
    );
};

export default (GenerateQRForm);
