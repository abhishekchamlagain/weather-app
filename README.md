# Weather App

A simple React weather app built with Vite and Tailwind CSS. Users can search for any city and view live weather details from the OpenWeather API.

## Features

- Search weather by city name
- Shows temperature, condition, city, humidity, wind speed, and pressure
- Displays a weather icon based on the current condition
- Shows Kathmandu weather by default
- Shows an error message when the city name is invalid
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- Tailwind CSS
- OpenWeather API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

### 3. Open in browser

Vite will show a local URL such as:

```bash
http://localhost:5173/
```

## How It Works

- Type a city name in the search box.
- Click the Search button or press Enter.
- The app fetches weather data from OpenWeather and updates the screen.

## API Note

The app uses an OpenWeather API key inside the code. If you want to use your own key, replace the key in `src/App.jsx`.

## Screenshot

Add a screenshot here later if you want to show the UI on GitHub.

## License

This project is for learning and practice.
