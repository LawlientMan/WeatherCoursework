import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { WeatherDaily } from "@/shared/types/WeatherDaily";
import { CurrentConditions } from "@/shared/types/CurrentConditions";

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dataservice.accuweather.com",
    }),
    endpoints: (builder) => ({
        getTodaysWeather: builder.query<WeatherDaily, string>({
            query: (locationKey) => {
                console.log('run weather search :' + locationKey)
                return {
                    url: `/forecasts/v1/daily/1day/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
        getTenDaysWeather: builder.query<WeatherDaily, string>({
            query: (locationKey) => {
                console.log('run weather search :' + locationKey)
                return {
                    url: `/forecasts/v1/daily/10day/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
        getCurrentWeather: builder.query<CurrentConditions, string>({
            query: (locationKey) => {
                console.log('run weather CurrentConditions search :' + locationKey)
                return {
                    url: `/currentconditions/v1/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
    }),
});

export const { useGetTodaysWeatherQuery, useGetTenDaysWeatherQuery, useGetCurrentWeatherQuery } = weatherApi;
