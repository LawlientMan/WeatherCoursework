
interface AppConfig {
    accuWeatherApiKey: string;
}

export const appConfig: AppConfig = {
    accuWeatherApiKey: import.meta.env.VITE_ACCUWEATHER_API_KEY
};