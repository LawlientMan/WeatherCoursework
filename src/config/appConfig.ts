interface AppConfig {
    accuWeatherApiKey: string;
    maxSavedRecentLocations: number;
    supportedFavoriteIcons: string[],
    supportedTemperatureUnits: TemperatureUnitSettings[]
}

interface TemperatureUnitSettings {
    unit: string;
    displayName: string
}

export const appConfig: AppConfig = {
    accuWeatherApiKey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
    maxSavedRecentLocations: 10,
    supportedFavoriteIcons: ['duckStar', 'star'],
    supportedTemperatureUnits: [
        { unit: 'C', displayName: "Celsius" },
        { unit: 'F', displayName: "Fahrenheit" },
    ]
};