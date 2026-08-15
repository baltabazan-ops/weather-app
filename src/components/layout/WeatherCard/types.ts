export interface infoWeather {
  label: string;
  icon: string;
}

export const iconWeather: Record<number, infoWeather> = {
  0: { label: "Soleado", icon: "/src/assets/images/icon-sunny.webp" },
  1: { label: "Soleado", icon: "/src/assets/images/icon-sunny.webp" },
  2: { label: "Nublado", icon: "/src/assets/images/icon-overcast.webp" },
  3: { label: "Nublado", icon: "/src/assets/images/icon-overcast.webp" },
  45: { label: "Niebla", icon: "/src/assets/images/icon-fog.webp" },
  48: { label: "Niebla", icon: "/src/assets/images/icon-fog.webp" },
  51: { label: "Llovizna", icon: "/src/assets/images/icon-drizzle.webp" },
  53: { label: "Llovizna", icon: "/src/assets/images/icon-drizzle.webp" },
  55: { label: "Llovizna", icon: "/src/assets/images/icon-drizzle.webp" },
  57: { label: "Llovizna", icon: "/src/assets/images/icon-drizzle.webp" },
  61: { label: "Lluvia", icon: "/src/assets/images/icon-rain.webp" },
  63: { label: "Lluvia", icon: "/src/assets/images/icon-rain.webp" },
  65: { label: "Lluvia", icon: "/src/assets/images/icon-rain.webp" },
  71: { label: "Nieve", icon: "/src/assets/images/icon-snow.webp" },
  95: { label: "Tormenta", icon: "/src/assets/images/icon-storm.webp" },
  96: { label: "Tormenta", icon: "/src/assets/images/icon-storm.webp" },
};
