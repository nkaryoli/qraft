import { motion } from "framer-motion";
import QrScanner from "./components/QrScanner";


const QrScannerPage = () => {
  return (

      <section className='h-fit min-h-[calc(100dvh-64px)] py-14 flex flex-col items-center justify-center bg-scanner pt-32'>
        <div className="max-w-[1280px] w-full space-y-9 overflow-hidden">
          <div className="w-full flex flex-col justify-center items-center gap-3">
            <motion.h1
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-2xl md:text-6xl text-primary-100 text-center font-bold w-full max-w-[450px] md:max-w-[550px] lg:max-w-full"
                >
                Scan & Discover!!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-xl text-text-200 text-center w-full max-w-[650px] p-4 mb-9 md:mb-0"
            >
              Scan any QR code in seconds and access its content instantly.  
              It’s fast, easy, and secure!
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-fit lg:h-full flex items-center justify-center"
          >
            <QrScanner/>
          </motion.div>
        </div>
      </section>
  )
};

export default QrScannerPage;