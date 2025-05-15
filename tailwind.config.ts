import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '678px',
            lg: '976px',
            xl: '1300px',
        },
        extend: {
            fontFamily: {
                headerText: ['Sora', 'sans-serif'],
                bodyText: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
