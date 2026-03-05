# Madhu's Birthday Website 🎉

A beautiful, interactive birthday celebration website for Madhu created with React and Vite. This website is fully responsive and works on both mobile and desktop devices.

## Features ✨

- **Home Page**: Attractive greeting with animation, confetti, and floating balloons
- **Tamil Page**: Tamil wishes and poetry with editable text area
- **Malayalam Page**: Malayalam wishes and quotes with editable text area
- **Telugu Page**: Telugu wishes and poetry with editable text area
- **English Page**: English birthday wishes with editable text area
- **Talking Tom Page**: Interactive animated Talking Tom character that delivers birthday wishes

## Project Structure 📁

```
madhu-birthday/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TamilPage.jsx
│   │   ├── MalayalamPage.jsx
│   │   ├── TeluguPage.jsx
│   │   ├── EnglishPage.jsx
│   │   └── TalkingTomPage.jsx
│   ├── styles/
│   │   ├── HomePage.css
│   │   ├── LanguagePage.css
│   │   └── TalkingTomPage.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation & Setup 🚀

1. Navigate to the project folder:
```bash
cd d:\madhu
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to:
```
http://localhost:3000
```

## Usage 💡

1. **First Page**: View the animated birthday greeting for Madhu on March 6
2. **Navigate**: Use the "Next →" and "← Back" buttons to navigate between pages
3. **Add Wishes**: Each language page has a text area where you can add custom wishes in that language
4. **Talking Tom**: On the final page, click on the Talking Tom character to hear different birthday wishes

## Building for Production 📦

To create a production build:
```bash
npm run build
```

The optimized build will be created in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

## Technologies Used 🛠️

- **React** - UI library
- **Vite** - Build tool
- **CSS3** - Styling with animations and gradients
- **JavaScript** - Interactivity

## Customization 🎨

You can easily customize:

- **Colors**: Edit the gradient backgrounds in each CSS file
- **Birthday Date**: Modify the date "March 6" in `HomePage.jsx`
- **Name**: Change "Madhu" throughout the files
- **Wishes**: Update the wishes in each language page
- **Talking Tom Wishes**: Add more wishes in the `wishes` array in `TalkingTomPage.jsx`

## Mobile & Desktop Compatibility 📱💻

The website is fully responsive with:
- Mobile-first design
- Touch-friendly buttons
- Optimized layouts for all screen sizes
- Works on Android phones, iPhones, tablets, and laptops

## Features Detail 🎁

### Home Page
- Attractive gradient background
- Animated greeting text with bounce effect
- Falling confetti animation
- Floating balloons
- Birthday message

### Language Pages
- Beautiful gradient backgrounds (different colors for each language)
- Pre-written wishes in native scripts
- Editable text area for custom wishes
- Character counter
- Decorative emoji elements

### Talking Tom
- Fully animated cat character
- Blinking eyes and talking mouth
- Interactive speech balloon
- Multiple birthday wishes to display
- Mobile-responsive design

## Tips 💡

1. You can edit the text content in each language page to add your own wishes
2. The Talking Tom wishes can be customized by editing the `wishes` array
3. All colors and animations can be modified in the CSS files
4. The website works great with screenshots and sharing on social media

## License 📄

Created with ❤️ for Madhu's Birthday

Enjoy! 🎊🎈🎂
