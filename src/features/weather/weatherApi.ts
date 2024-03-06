import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { WeatherDaily } from "@/shared/types/WeatherDaily";

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dataservice.accuweather.com/forecasts/v1",
    }),
    endpoints: (builder) => ({
        getTodaysWeather: builder.query<WeatherDaily, string>({
            query: (locationKey) => {
                console.log('run weather search :' + locationKey)
                return {
                    url: `/daily/1day/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }
        ),
    }),
});

export const { useGetTodaysWeatherQuery } = weatherApi;
