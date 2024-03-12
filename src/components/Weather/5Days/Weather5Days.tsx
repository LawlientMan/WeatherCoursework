import WeatherIcon from '@/components/Weather/common/WeatherIcon';
import { useGet5DaysWeatherQuery } from '@/features/weather/weatherApi';
import { IRootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';

const Weather5Days = () => {
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const { data, error, isFetching } = useGet5DaysWeatherQuery(selectedLocation?.Key || '', { skip: !selectedLocation })

    return (
        <>
            <div>Weather5Days</div>
            <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
        </>
    )
}

export default Weather5Days