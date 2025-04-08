export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          logoFlyIn: 'logoFlyIn 1.4s ease-out forwards',
        },
        keyframes: {
          logoFlyIn: {
            '0%': { opacity: 0, transform: 'translateY(-50px) scale(0.8)' },
            '80%': { transform: 'translateY(0) scale(1.1)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        },
      },
    },
    plugins: [],
  };
  