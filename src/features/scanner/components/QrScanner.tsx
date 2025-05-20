import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const QrScanner = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [scannerActive, setScannerActive] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    const isUrl = (str: string) => {
        const pattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i; // Regex para URL
        return pattern.test(str);
    };

    useEffect(() => {
        if (scannerActive) {
            scannerRef.current = new Html5QrcodeScanner(
                'reader',
                { qrbox: { width: 250, height: 250 }, fps: 5 },
                false,
            );

            scannerRef.current.render(
                (result: string) => {
                    setScanResult(result);
                    setScannerActive(false);
                },
                (err: string) => console.log('QR Error:', err),
            );
        }

        setTimeout(() => {
            const swapLink = document.getElementById('reader__dashboard_section_swaplink');
            if (swapLink) {
                swapLink.style.width = 'calc(100% - 20px)';
                swapLink.style.display = 'flex';
                swapLink.style.justifyContent = 'center';
                swapLink.style.justifySelf = 'center';
            }

            const infoImg = document.querySelector('#reader img');
            if (infoImg instanceof HTMLElement) {
                infoImg.style.display = 'none';
            }
        }, 100);
    }, [scannerActive]);

    return (
        <div className="max-w-[450px] p-2 bg-gradient-to-br from-primary via-background to-muted rounded-2xl ">
            <div className="bg-background rounded-2xl">
                <div className="flex flex-col justify-end items-center gap-5 py-10 h-fit w-full px-5 rounded-xl">
                    {scanResult ? (
                        <div className="flex flex-col justify-center w-[310px] sm:w-[380px] h-fit gap-4 text-background overflow-hidden rounded-xl">
                            <span>Reading successful!!</span>
                            {isUrl(scanResult) ? (
                                <Link
                                    className="text-sm text-background w-[310px] sm:w-[380px] bg-primary-foreground overflow-hidden rounded-xl p-4"
                                    to={scanResult}
                                >
                                    {scanResult}
                                </Link>
                            ) : (
                                <p className="text-sm text-background w-full h-fit bg-card rounded-md p-4">
                                    {scanResult}
                                </p>
                            )}
                            <Button onClick={() => setScanResult(null)} className="w-72" size="lg">
                                Scan new QR Code
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center w-[310px] md:w-[390px] rounded-xl">
                            {!scannerActive && (
                                <Button
                                    onClick={() => setScannerActive(true)}
                                    size="lg"
                                    className="w-64"
                                >
                                    Start Scan
                                </Button>
                            )}
                            {scannerActive && (
                                <motion.div
                                    key={scannerActive.toString()}
                                    initial={{ height: 0, backgroundColor: '#000000' }}
                                    animate={{ height: 400, backgroundColor: '#F9F1F5' }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="flex flex-col items-center justify-end w-[310px] sm:w-[350px]"
                                    id="reader"
                                ></motion.div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrScanner;
