import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [cityInput, setCityInput] = useState("Kathmandu");
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState({
    temp: 25,
    condition: "Sunny",
    city: "Kathmandu",
    humidity: 60,
    wind: 15,
    pressure: 1015,
    icon: "01d",
  });

  const getWeather = async () => {
    if (!cityInput.trim()) return;
    if (!apiKey) {
      setErrorMsg("Missing API key. Add VITE_OPENWEATHER_API_KEY in .env file.");
      return;
    }

    setErrorMsg("");
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(cityInput.trim())}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      setErrorMsg("City not found. Please enter a valid city name.");
      return;
    }

    setWeather({
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      city: data.name,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      pressure: data.main.pressure,
      icon: data.weather[0].icon,
    });
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      if (!apiKey) {
        setErrorMsg("Missing API key. Add VITE_OPENWEATHER_API_KEY in .env file.");
        return;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kathmandu&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setErrorMsg("");

      setWeather({
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        city: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        pressure: data.main.pressure,
        icon: data.weather[0].icon,
      });
    };

    loadDefaultWeather();
  }, [apiKey]);

  return (
    <>
      <section className="hero min-h-screen bg-base-200 text-center bg-[#e7ecef]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <div className="flex">
              <div className="flex items-center gap-4 ml-22 mt-30">
                <h1 className="text-4xl font-bold text-left">Weather App</h1>
                  <img src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png" alt="Weather icon" className="rounded-lg w-20 h-20" />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-30 ml-30">
                <input
                  type="text"
                  placeholder="Enter city name: Default is Kathmandu"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input input-bordered input-primary w-full sm:w-80 p-4 border-2 border-[#1791c8] bg-white/70 shadow-xl rounded-2xl"
                />
                <button
                  onClick={getWeather}
                  className="flex-shrink-0 rounded-2xl border-2 border-[#1791c8] bg-white/70 px-8 py-5 font-semibold leading-none text-[#1d3557] shadow-xl transition-colors duration-200 hover:bg-[#e7ecef] cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            {errorMsg ? (
              <p className="mt-4 text-sm font-medium text-red-600">{errorMsg}</p>
            ) : null}

            <p className="py-6">
              Get accurate and up-to-date weather information for your location
              or any city around the world. Stay informed about current
              conditions, forecasts, and more with our user-friendly weather
              app.
            </p>
          </div>
          <div className="flex items-center justify-center mt-25">
            <div className="temperature flex flex-col md:flex-row items-center gap-15 rounded-3xl bg-white/70 shadow-xl p-15">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={`${weather.condition} weather icon`}
                className="rounded-lg w-40 h-40"
              />
              <div className="temp-info text-left">
                <h2 className="temperature temp text-6xl font-bold text-[#274c77]">{weather.temp}°C</h2>
                <p className="weatherType condition text-2xl font-semibold text-[#1d3557]">{weather.condition}</p>
                <p className="city text-lg text-slate-600">{weather.city}</p>
              </div>

              <div className="humidity flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                  alt="Humidity icon"
                  className="rounded-lg w-10 h-10"
                />
                <p className="humidity text-slate-700">Humidity: {weather.humidity}%</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/891/891448.png"
                  alt="Wind icon"
                  className="rounded-lg w-10 h-10"
                />
                <p className="wind text-slate-700">Wind: {weather.wind} km/h</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/553/553416.png"
                  alt="Pressure icon"
                  className="rounded-lg w-10 h-10"
                />
                <p className="pressure text-slate-700">Pressure: {weather.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
