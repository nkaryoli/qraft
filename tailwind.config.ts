import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
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
