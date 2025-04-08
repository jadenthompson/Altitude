export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          gradient: 'gradientShift 15s ease infinite',
        },
        keyframes: {
          gradientShift: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
        },
      },
    },
    plugins: [],
  };
  