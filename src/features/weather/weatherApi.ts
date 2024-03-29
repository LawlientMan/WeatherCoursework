import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { WeatherDaily } from "@/shared/types/WeatherDaily";
import { CurrentConditions } from "@/shared/types/CurrentConditions";
import { HourlyWeather } from "@/shared/types/HourlyWeather";

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dataservice.accuweather.com",
    }),
    endpoints: (builder) => ({
        get5DaysWeather: builder.query<WeatherDaily, string>({
            query: (locationKey) => {
                return {
                    url: `/forecasts/v1/daily/5day/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
        getCurrentWeather: builder.query<CurrentConditions, string>({
            transformResponse: (response: CurrentConditions[], _meta, _arg) => response[0],
            query: (locationKey) => {
                return {
                    url: `/currentconditions/v1/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
        getHourlyWeather: builder.query<HourlyWeather[], string>({
            query: (locationKey) => {
                return {
                    url: `forecasts/v1/hourly/12hour/${locationKey}/`,
                    params: { 
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
    }),
});

export const { useGet5DaysWeatherQuery,
    useGetCurrentWeatherQuery, useGetHourlyWeatherQuery } = weatherApi;
