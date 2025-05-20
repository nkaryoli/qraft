import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRCode = ({ url }: { url: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;
    
    const currentRef = qrRef.current;
    currentRef.innerHTML = '';
    
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      dotsOptions: {
        color: '#000000',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff'
      }
    });

    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }

    return () => {
      if (currentRef) {
        currentRef.innerHTML = '';
      }
    };
  }, [url]);

  return <div ref={qrRef} />;
}

export default QRCode;