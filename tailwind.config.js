export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          gradient: 'gradientShift 15s ease infinite',
          backgroundBlur: 'blurShift 20s ease-in-out infinite',
          clouds: 'cloudDrift 60s linear infinite',
          logoFlyIn: 'flyIn 1s ease-out, bounce 1s 1.1s ease-out',
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
          flyIn: {
            '0%': { transform: 'translateY(-100px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
          bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      },
    },
    plugins: [],
  };
  