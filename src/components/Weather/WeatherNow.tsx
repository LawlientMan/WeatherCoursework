import { useGetCurrentWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';

const WeatherNow = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGetCurrentWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    return (
        <>
            <div>WeatherNow</div>
            <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
        </>
    )
}

export default WeatherNow