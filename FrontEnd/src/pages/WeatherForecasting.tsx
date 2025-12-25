import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CurvyEdge from "../components/CurvyEdge";
import axios from "axios";
import L from "leaflet";

// Fix for default marker icon in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface WeatherData {
  date: string;
  day: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

// Component to handle map clicks
const MapClickHandler: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to update map center
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const WeatherForecasting: React.FC = () => {
  const [location, setLocation] = useState<string>("Lahore, Pakistan");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 31.5204,
    lng: 74.3587,
  });
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // API Keys
  // OpenWeatherMap API key
  const WEATHER_API_KEY = "434d63552997cafb603062473b494156";

  // Geocode using OpenStreetMap Nominatim (free, no API key needed)
  const geocodeLocation = async (query: string): Promise<any[]> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            "User-Agent": "AgriTech Weather App",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Geocoding error:", err);
      return [];
    }
  };

  // Reverse geocode to get location name from coordinates
  const reverseGeocode = async (coords: { lat: number; lng: number }) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
        {
          headers: {
            "User-Agent": "AgriTech Weather App",
          },
        }
      );
      if (response.data && response.data.display_name) {
        setLocation(response.data.display_name);
      }
      fetchWeatherData(coords);
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      fetchWeatherData(coords);
    }
  };

  // Handle location search input
  const handleSearchInput = async (value: string) => {
    setLocation(value);
    if (value.length > 2) {
      const results = await geocodeLocation(value);
      setSearchSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle location selection from suggestions
  const handleLocationSelect = (place: any) => {
    const newCoordinates = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    };
    setCoordinates(newCoordinates);
    setLocation(place.display_name);
    setShowSuggestions(false);
    fetchWeatherData(newCoordinates);
  };

  // Handle map click
  const handleMapClick = (lat: number, lng: number) => {
    const newCoordinates = { lat, lng };
    setCoordinates(newCoordinates);
    reverseGeocode(newCoordinates);
  };

  // Handle marker drag end
  const handleMarkerDragEnd = (e: any) => {
    const newCoordinates = {
      lat: e.target.getLatLng().lat,
      lng: e.target.getLatLng().lng,
    };
    setCoordinates(newCoordinates);
    reverseGeocode(newCoordinates);
  };

  // Fetch weather data from OpenWeatherMap
  const fetchWeatherData = async (coords: { lat: number; lng: number }) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}&units=metric`
      );

      // Process 5-day forecast data
      const forecastList = response.data.list;
      const dailyData: { [key: string]: any } = {};

      forecastList.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            date: dateKey,
            day: date.toLocaleDateString("en-US", { weekday: "short" }),
            temps: [item.main.temp],
            tempMin: item.main.temp_min,
            tempMax: item.main.temp_max,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          };
        } else {
          dailyData[dateKey].temps.push(item.main.temp);
          dailyData[dateKey].tempMin = Math.min(
            dailyData[dateKey].tempMin,
            item.main.temp_min
          );
          dailyData[dateKey].tempMax = Math.max(
            dailyData[dateKey].tempMax,
            item.main.temp_max
          );
        }
      });

      const processedData: WeatherData[] = Object.values(dailyData)
        .slice(0, 5)
        .map((day: any) => ({
          date: day.date,
          day: day.day,
          temp: Math.round(
            day.temps.reduce((a: number, b: number) => a + b, 0) /
              day.temps.length
          ),
          tempMin: Math.round(day.tempMin),
          tempMax: Math.round(day.tempMax),
          humidity: day.humidity,
          windSpeed: Math.round(day.windSpeed * 3.6), // Convert m/s to km/h
          description: day.description,
          icon: day.icon,
        }));

      setWeatherData(processedData);
    } catch (err: any) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Weather API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle location search button click
  const handleSearch = async () => {
    if (location.trim()) {
      const results = await geocodeLocation(location);
      if (results.length > 0) {
        handleLocationSelect(results[0]);
      } else {
        setError("Location not found. Please try a different location.");
      }
    }
  };

  // Handle day filter toggle
  const toggleDay = (index: number) => {
    setSelectedDays((prev) =>
      prev.includes(index)
        ? prev.filter((d) => d !== index)
        : [...prev, index]
    );
  };

  // Fetch initial weather data on mount
  useEffect(() => {
    fetchWeatherData(coordinates);
  }, []);

  // Filter weather data based on selected days
  const filteredWeatherData = weatherData.filter((_, index) =>
    selectedDays.includes(index)
  );

  return (
    <div className="weather-forecasting-page">
      {/* Hero Section */}
      <header className="hero hero-section position-relative">
        <div className="hero-overlay" />
        <div className="container hero-content text-center text-white">
          <small className="text-uppercase breadcrumb">Home / Weather Forecasting</small>
          <h1 className="display-5 fw-bold">Weather Forecasting</h1>
        </div>
        <CurvyEdge color="#fff" />
      </header>

      {/* Main Functionality Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Left Column - Map and Location Input */}
            <div className="col-lg-6">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="fa-solid fa-map-location-dot me-2"></i>
                    Select Location
                  </h5>
                </div>
                <div className="card-body">
                  {/* Location Input with Autocomplete */}
                  <div className="mb-3 position-relative">
                    <label className="form-label fw-bold">Enter Location</label>
                    <div className="input-group">
                      <input
                        ref={searchInputRef}
                        type="text"
                        className="form-control"
                        placeholder="Search for a location..."
                        value={location}
                        onChange={(e) => handleSearchInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                          }
                        }}
                        onFocus={() => {
                          if (searchSuggestions.length > 0) {
                            setShowSuggestions(true);
                          }
                        }}
                      />
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={handleSearch}
                        disabled={loading}
                      >
                        <i className="fa-solid fa-magnifying-glass me-2"></i>
                        Search
                      </button>
                    </div>
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div
                        className="list-group position-absolute w-100"
                        style={{
                          zIndex: 1000,
                          maxHeight: "200px",
                          overflowY: "auto",
                          marginTop: "2px",
                        }}
                      >
                        {searchSuggestions.map((place, index) => (
                          <button
                            key={index}
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleLocationSelect(place)}
                          >
                            <small>{place.display_name}</small>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Leaflet Map */}
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <MapContainer
                      center={[coordinates.lat, coordinates.lng]}
                      zoom={12}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[coordinates.lat, coordinates.lng]}
                        draggable={true}
                        eventHandlers={{
                          dragend: handleMarkerDragEnd,
                        }}
                      />
                      <MapClickHandler onMapClick={handleMapClick} />
                      <MapUpdater center={[coordinates.lat, coordinates.lng]} />
                    </MapContainer>
                  </div>

                  {error && (
                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Weather Results */}
            <div className="col-lg-6">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="fa-solid fa-cloud-sun-rain me-2"></i>
                    Weather Forecast
                  </h5>
                </div>
                <div className="card-body">
                  {/* Day Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Filter by Days:</label>
                    <div className="d-flex flex-wrap gap-2">
                      {weatherData.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`btn btn-sm ${
                            selectedDays.includes(index)
                              ? "btn-success"
                              : "btn-outline-success"
                          }`}
                          onClick={() => toggleDay(index)}
                        >
                          {weatherData[index]?.day || `Day ${index + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weather Cards */}
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3 text-muted">Fetching weather data...</p>
                    </div>
                  ) : filteredWeatherData.length > 0 ? (
                    <div className="row g-3">
                      {filteredWeatherData.map((weather, index) => (
                        <div key={index} className="col-12">
                          <div className="card border-0 shadow-sm">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {weather.day} - {new Date(weather.date).toLocaleDateString()}
                                  </h6>
                                  <p className="text-muted small mb-2 text-capitalize">
                                    {weather.description}
                                  </p>
                                  <div className="d-flex align-items-center gap-3">
                                    <div>
                                      <span className="display-6 fw-bold text-success">
                                        {weather.temp}°
                                      </span>
                                      <span className="text-muted">C</span>
                                    </div>
                                    <div className="text-muted small">
                                      <div>
                                        <i className="fa-solid fa-temperature-arrow-up text-danger me-1"></i>
                                        High: {weather.tempMax}°C
                                      </div>
                                      <div>
                                        <i className="fa-solid fa-temperature-arrow-down text-primary me-1"></i>
                                        Low: {weather.tempMin}°C
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <img
                                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                    alt={weather.description}
                                    style={{ width: "80px", height: "80px" }}
                                  />
                                </div>
                              </div>
                              <hr />
                              <div className="row text-center small">
                                <div className="col-6">
                                  <i className="fa-solid fa-droplet text-info me-1"></i>
                                  <span className="text-muted">Humidity:</span>{" "}
                                  <strong>{weather.humidity}%</strong>
                                </div>
                                <div className="col-6">
                                  <i className="fa-solid fa-wind text-secondary me-1"></i>
                                  <span className="text-muted">Wind:</span>{" "}
                                  <strong>{weather.windSpeed} km/h</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5 text-muted">
                      <i className="fa-solid fa-cloud-sun fa-3x mb-3"></i>
                      <p>No weather data available. Please select a location.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherForecasting;
