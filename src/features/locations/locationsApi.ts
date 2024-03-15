import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Location } from "../../shared/types/Location";
import { appConfig } from "@/config/appConfig";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dataservice.accuweather.com/locations/v1",
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], string>({
            query: (search) => {
                return {
                    url: '/cities/search/',
                    params: { 
                        q : search,
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }),
        getLocationByKey: builder.query<Location, string>({
            query: (key) => {
                console.log('getLocationByKey run');
                return {
                    url: `/${key}`,
                    params: {
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        })
    }),
});

export const { useGetLocationsQuery, useGetLocationByKeyQuery, useLazyGetLocationByKeyQuery } = locationsApi;
