import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
            publishableKey={PUBLISHABLE_KEY}
            afterSignOutUrl="/"
        >
            <App />
            <Toaster />
        </ClerkProvider>
    </StrictMode>,
);
