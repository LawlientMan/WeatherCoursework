import { useGetHourlyWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';

const WeatherHourly = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetHourlyWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    return (
        <>
            <div>WeatherHourly</div>
            <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
        </>
    )
}

export default WeatherHourly