module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pixel-bg': '#1a1a2e',
        'pixel-secondary': '#16213e',
        'pixel-accent': '#e94560',
        'pixel-text': '#eaeaea',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
