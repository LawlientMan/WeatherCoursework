import { IRootState } from '@/config/store';
import { setCurrentLocation } from '@/features/locations/locationSlice';
import { useGetLocationByKeyQuery, useLazyGetLocationByKeyQuery } from '@/features/locations/locationsApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useInitialLoadOfLocationFromUrl = () => {
    const { locationKey } = useParams();
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const shouldRun = locationKey && !selectedLocation;

    const [getLocationByKeyPromice, result] = useLazyGetLocationByKeyQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        async function searchAndSetupLocation() {
            if (!selectedLocation && locationKey) {
                const { data } = await getLocationByKeyPromice(locationKey);
                if (data) {
                    dispatch(setCurrentLocation(data))
                }
            }
        }
        searchAndSetupLocation()

    }, []);

    return { isFetching: result?.isFetching, error: result?.error, isNotFound: shouldRun && result?.data == null };
};