/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          gradient: 'gradientShift 15s ease infinite',
          backgroundBlur: 'blurShift 20s ease-in-out infinite',
          clouds: 'cloudDrift 60s linear infinite',
        },
        keyframes: {
          gradientShift: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
          blurShift: {
            '0%, 100%': { filter: 'blur(20px)' },
            '50%': { filter: 'blur(40px)' },
          },
          cloudDrift: {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 0%' },
          },
        },
      },
    },
    plugins: [],
  };
  