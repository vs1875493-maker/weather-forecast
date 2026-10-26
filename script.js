
const indianCities = [
  "Agra", "Ahmedabad", "Ajmer", "Allahabad", "Alwar", "Amritsar", "Asansol", "Aurangabad",
  "Bangalore", "Bareilly", "Bhopal", "Bhubaneswar", "Bhilai", "Bikaner", "Bilaspur", "Bokaro",
  "Chandigarh", "Chennai", "Coimbatore", "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur",
  "Faridabad", "Gaya", "Ghaziabad", "Gorakhpur", "Greater Noida", "Guwahati", "Gwalior",
  "Haridwar", "Hubli", "Hyderabad", "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu",
  "Jamnagar", "Jamshedpur", "Jhansi", "Jodhpur", "Kanpur", "Kochi", "Kolhapur", "Kolkata",
  "Kota", "Lucknow", "Ludhiana", "Madurai", "Mangalore", "Meerut", "Mira-Bhayandar", "Moradabad",
  "Mumbai", "Muzaffarpur", "Nagpur", "Nashik", "Navi Mumbai", "Noida", "Patna", "Pune",
  "Raipur", "Rajkot", "Ranchi", "Saharanpur", "Salem", "Siliguri", "Shimla", "Srinagar",
  "Surat", "Thane", "Thiruvananthapuram", "Tiruchirappalli", "Tirupati", "Udaipur", "Vadodara",
  "Varanasi", "Vijayawada", "Visakhapatnam", "Warangal", "Agartala", "Aizawl", "Bengaluru",
  "Bharuch", "Bhavnagar", "Chandrapur", "Durg", "Guntur", "Howrah", "Kalyan", "Mysore",
  "Nanded", "Puducherry", "Rourkela", "Secunderabad", "Solapur", "Trichy", "Ujjain", "Vapi",
  "Vellore", "Gurugram", "Shivamogga", "Kharagpur", "Karnal", "Jalgaon", "Nellore", "Panaji",
  "Basti", "Baranagar", "Firozabad", "Gaya", "Kanpur", "Bengaluru", "Bhubaneswar", "Jabalpur"
];

const WEATHER_CODE_MAP = {
  0: { label: "Clear sky", icon: "clear-day" },
  1: { label: "Mainly clear", icon: "partly-cloudy-day" },
  2: { label: "Partly cloudy", icon: "partly-cloudy-day" },
  3: { label: "Overcast", icon: "cloudy" },
  45: { label: "Fog", icon: "fog" },
  48: { label: "Depositing rime fog", icon: "fog" },
  51: { label: "Light drizzle", icon: "drizzle" },
  53: { label: "Drizzle", icon: "drizzle" },
  55: { label: "Heavy drizzle", icon: "rain" },
  56: { label: "Light freezing drizzle", icon: "rain" },
  57: { label: "Freezing drizzle", icon: "rain" },
  61: { label: "Slight rain", icon: "rain" },
  63: { label: "Rain", icon: "rain" },
  65: { label: "Heavy rain", icon: "rain" },
  66: { label: "Freezing rain", icon: "rain" },
  67: "Heavy freezing rain",
  71: { label: "Light snow", icon: "snow" },
  73: { label: "Snow", icon: "snow" },
  75: { label: "Heavy snow", icon: "snow" },
  77: { label: "Snow grains", icon: "snow" },
  80: { label: "Rain showers", icon: "rain" },
  81: { label: "Heavy showers", icon: "rain" },
  82: { label: "Violent showers", icon: "rain" },
  85: { label: "Snow showers", icon: "snow" },
  86: { label: "Heavy snow showers", icon: "snow" },
  95: { label: "Thunderstorm", icon: "thunderstorm" },
  96: { label: "Thunderstorm with hail", icon: "thunderstorm" },
  99: { label: "Severe thunderstorm", icon: "thunderstorm" }
};

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");
const citySuggestions = document.getElementById("citySuggestions");

function getMatchingCities(query) {
  const value = query.trim();

  if (!value) {
    return [];
  }

  return [...new Set(indianCities)]
    .filter((city) => city.toLowerCase().startsWith(value.toLowerCase()))
    .slice(0, 12);
}

function renderSuggestions() {
  const matches = getMatchingCities(cityInput.value);

  if (!matches.length) {
    citySuggestions.classList.remove("visible");
    citySuggestions.innerHTML = "";
    return;
  }

  citySuggestions.innerHTML = matches
    .map(
      (city) =>
        `<li class="suggestion-item" data-city="${city}">${city}</li>`
    )
    .join("");

  citySuggestions.classList.add("visible");

  citySuggestions.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", () => {
      cityInput.value = item.dataset.city;
      citySuggestions.classList.remove("visible");
      citySuggestions.innerHTML = "";
      cityInput.focus();
    });
  });
}

cityInput.addEventListener("input", () => {
  renderSuggestions();
});

cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    citySuggestions.classList.remove("visible");
    citySuggestions.innerHTML = "";
  }, 150);
});

cityInput.addEventListener("focus", () => {
  renderSuggestions();
});

function getWeatherLabel(code) {
  const weather = WEATHER_CODE_MAP[code];
  if (typeof weather === "string") {
    return weather;
  }

  return weather ? weather.label : "Unknown condition";
}

function getWeatherEmoji(code) {
  const weather = WEATHER_CODE_MAP[code];
  const label = weather && typeof weather !== "string" ? weather.label : "Clear sky";

  const emojiMap = {
    "Clear sky": "☀️",
    "Mainly clear": "🌤️",
    "Partly cloudy": "⛅",
    "Overcast": "☁️",
    "Fog": "🌫️",
    "Depositing rime fog": "🌫️",
    "Light drizzle": "🌦️",
    "Drizzle": "🌦️",
    "Heavy drizzle": "🌧️",
    "Light freezing drizzle": "🌧️",
    "Freezing drizzle": "🌧️",
    "Slight rain": "🌦️",
    "Rain": "🌧️",
    "Heavy rain": "🌧️",
    "Freezing rain": "🌧️",
    "Heavy freezing rain": "🌧️",
    "Light snow": "🌨️",
    "Snow": "❄️",
    "Heavy snow": "❄️",
    "Snow grains": "❄️",
    "Rain showers": "🌦️",
    "Heavy showers": "🌧️",
    "Violent showers": "⛈️",
    "Snow showers": "🌨️",
    "Heavy snow showers": "🌨️",
    "Thunderstorm": "⛈️",
    "Thunderstorm with hail": "⛈️",
    "Severe thunderstorm": "⛈️",
    "Unknown condition": "🌍"
  };

  return emojiMap[label] || "🌤️";
}

function getWeatherIcon(code) {
  const emoji = getWeatherEmoji(code);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="transparent"/>
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-size="62">${emoji}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city name.";
    weatherCard.hidden = true;
    return;
  }

  searchBtn.disabled = true;
  searchBtn.textContent = "Loading...";
  message.textContent = "Fetching weather data...";
  weatherCard.hidden = true;

  try {
    const geoURL = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geoURL.search = new URLSearchParams({
      name: city,
      count: "1",
      language: "en",
      format: "json"
    });

    const geoResponse = await fetch(geoURL);
    const geoData = await geoResponse.json();

    if (!geoResponse.ok) {
      throw new Error(geoData.reason || "Unable to search for this city.");
    }

    if (!geoData.results || !geoData.results.length) {
      throw new Error("City not found. Please check the spelling.");
    }

    const place = geoData.results[0];

    const weatherURL = new URL("https://api.open-meteo.com/v1/forecast");
    weatherURL.search = new URLSearchParams({
      latitude: String(place.latitude),
      longitude: String(place.longitude),
      current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,pressure_msl,weather_code",
      timezone: "auto"
    });

    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      throw new Error(weatherData.reason || "Unable to retrieve weather data.");
    }

    const current = weatherData.current;
    const description = getWeatherLabel(current.weather_code);

    document.getElementById("cityName").textContent =
      `${place.name}, ${place.country || place.admin1 || "Location"}`;

    document.getElementById("date").textContent =
      new Date().toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short"
      });

    document.getElementById("temperature").textContent =
      `${Math.round(current.temperature_2m)}°C`;

    document.getElementById("description").textContent = description;

    document.getElementById("feelsLike").textContent =
      `${Math.round(current.apparent_temperature)}°C`;

    document.getElementById("humidity").textContent =
      `${current.relative_humidity_2m}%`;

    document.getElementById("wind").textContent =
      `${current.wind_speed_10m} km/h`;

    document.getElementById("pressure").textContent =
      `${Math.round(current.pressure_msl)} hPa`;

    const icon = document.getElementById("weatherIcon");
    icon.onerror = () => {
      const fallbackEmoji = getWeatherEmoji(current.weather_code);
      icon.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
          <rect width="120" height="120" fill="transparent"/>
          <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-size="62">${fallbackEmoji}</text>
        </svg>
      `)}`;
    };
    icon.src = getWeatherIcon(current.weather_code);
    icon.alt = description;

    weatherCard.hidden = false;
    message.textContent = "Weather data loaded successfully!";
  } catch (error) {
    message.textContent = error.message.includes("Failed to fetch")
      ? "Network error. Check your internet connection and try again."
      : error.message;

    weatherCard.hidden = true;
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
});
