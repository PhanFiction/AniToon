module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace],
      },
      backgroundImage: {
        'gradient-white': 'linear-gradient(180deg, rgba(255, 255, 255, 0.10126057258841037) 0, rgba(255, 255, 255, 0) 100%)',
      },
      colors: {
        blue: '#007bff',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#e83e8c',
        red: '#dc3545',
        orange: '#fd7e14',
        yellow: '#ffc107',
        green: '#28a745',
        teal: '#20c997',
        cyan: '#17a2b8',
        white: '#fff',
        gray: '#6c757d',
        grayDark: '#343a40',
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#dc3545',
        light: '#f8f9fa',
        dark: '#343a40',
        bluePurple: '#2d2b44',
        darkBluePurple: '#201f31',
        'white-05': 'rgba(255, 255, 255, 0.05)',
      }
    },
  },
}
