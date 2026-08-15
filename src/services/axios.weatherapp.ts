import axios from "axios";

export interface DailyItem {
  day: string;
  dayComplete: string;
  year: string;
  tempMax: number;
  tempMin: number;
  weathercode: number;
}

export interface HourlyItem {
  temperature: number;
  time: string;
  weathercode: number;
}

export interface SlipData {
  city: string;
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  weatherData?: {
    temperature: number;
    tempMax: number;
    tempMin: number;
    humidity: number;
    windspeed: number;
    precipitation: number;
    weathercode: number;
    time: string;
    daily: DailyItem[];
    hourly: HourlyItem[];
  };
}

export interface ClimateResponse {
  results: SlipData[];
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    humidity: number;
    weathercode: number;
    time: string;
    windspeed: number;
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    weathercode: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
  };
}

const url = `https://geocoding-api.open-meteo.com/v1/search?name=`;

export async function fetchClimate(query: string): Promise<SlipData[]> {
  try {
    const response = await axios.get<ClimateResponse>(
      url + encodeURIComponent(query) + `&count=1`,
    );

    const results = response.data.results;
    if (!results || results.length === 0) return [];

    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Mensaje detallado en Google", error.response?.data);
    } else {
      console.log("Error buscando la ciudad", error);
    }
    throw error;
  }
}

const myUrl = (lat: number, long: number) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_hours=12`;

export async function fetchWeatherData(
  lat: number,
  long: number,
): Promise<SlipData["weatherData"]> {
  try {
    const response = await axios.get<ClimateResponse>(myUrl(lat, long));

    const data = response.data;

    const hourlyData: HourlyItem[] = data.hourly.time.map(
      (time: string, index: number) => {
        return {
          rawTime: time,
          time: new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
          temperature: data.hourly.temperature_2m[index] ?? 0,
          weathercode: data.hourly.weathercode[index] ?? 0,
        };
      },
    );

    const dailyData: DailyItem[] = data.daily.time.map(function (
      date: string,
      index: number,
    ) {
      const dateObj = new Date(date + "T00:00:00");
      const fullDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const dayName = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const dayNameComplete = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
      });
      return {
        day: dayName,
        dayComplete: dayNameComplete,
        year: fullDate,
        tempMax: Math.round(data.daily.temperature_2m_max[index]),
        tempMin: Math.round(data.daily.temperature_2m_min[index]),
        weathercode: data.daily.weathercode[index],
      };
    });

    return {
      temperature: data.current_weather.temperature,
      tempMax: data.daily.temperature_2m_max[0],
      tempMin: data.daily.temperature_2m_min[0],
      humidity: data.hourly.relative_humidity_2m[0],
      windspeed: data.current_weather.windspeed,
      precipitation: data.hourly.precipitation[0],
      weathercode: data.daily.weathercode[0],
      time: data.daily.time[0],
      daily: dailyData,
      hourly: hourlyData,
    };
  } catch (error) {
    console.error("Error al obtener los datos de clima solicitados", error);
    throw error;
  }
}

export async function cityWhithWeather(query: string): Promise<SlipData[]> {
  try {
    const cities = await fetchClimate(query);

    if (!cities || cities.length === 0) return [];

    const city = cities[0];

    const finallyCity = await fetchWeatherData(city.latitude, city.longitude);

    city.weatherData = finallyCity;

    return [city];
  } catch (error) {
    console.log("Ciudad no encontrada", error);
    throw error;
  }
}
