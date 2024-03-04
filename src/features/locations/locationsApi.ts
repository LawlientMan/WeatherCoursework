import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Location } from "../../shared/types/Location";
import { appConfig } from "@/config/appConfig";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dataservice.accuweather.com/locations/v1/cities/search/",
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], string>({
            query: (q) => {
                return {
                    url: '/',
                    params: { 
                        q,
                        apikey: appConfig.accuWeatherApiKey
                    },
                };
            }
        }
        ),
    }),
});

export const { useGetLocationsQuery } = locationsApi;
