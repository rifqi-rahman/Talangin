# Talangin Website

Official promotion website for Talangin - a smart shared expense and split-bill management iOS app.

## About Talangin

Talangin is a modern iOS app for managing shared expenses with friends and family. It's similar to Splitwise but with a better user experience, modern iOS design, and privacy-first approach.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: GSAP-powered animations for engaging user experience
- **Brand Colors**: Custom color system based on Water and Olive themes
- **Modern UI**: Clean, intuitive interface showcasing app features

## Color System

### Water Theme
- `systemWaterLight`: #D6EDF5
- `systemWaterDark`: #244975
- `systemWater02Light`: #3C79C3
- `systemWater02Dark`: #59CDF5

### Olive Theme
- `systemOliveLight`: #DFEEC9
- `systemOliveDark`: #3C5111
- `systemOlive02Light`: #7BA426
- `systemOlive02Dark`: #99CA4C

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- ScrollTrigger (GSAP plugin)

## Getting Started

Simply open `index.html` in a web browser to view the website. No build process required.

### Local Development

1. Clone this repository
2. Open `index.html` in your browser
3. For live reload during development, you can use any static server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

## Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styles and responsive design
├── script.js       # GSAP animations and interactions
├── .gitignore      # Git ignore rules
└── README.md       # Project documentation
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See LICENSE file for details.