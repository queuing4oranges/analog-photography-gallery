// tailwind.config.js
export default {
    content: [
        './app/**/*.{js,jsx,ts,tsx}', // Next.js app dir
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            // colors: {
            //     primary: '#1e40af',
            //     secondary: '#facc15',
            // },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
}