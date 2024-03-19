import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { MutableRefObject, useState } from 'react'
import { Form } from 'react-bootstrap';

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationSearchItemsList from '@/components/LocationSearch/SearchMenu/SearchLocationOptions';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useListKeyboardNavigation } from '@/components/LocationSearch/hooks/useListKeyboardNavigation';
import { IRootState } from '@/config/store';
import { setCurrentLocation } from '@/features/locations/locationSlice';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteLocationOptions from '@/components/LocationSearch/SavedSearchMenu/SavedLocationOptions';
import ErrorSearchMenu from '@/components/LocationSearch/components/ErrorSearchMenu';


interface LocationSearchProps {
}

const LocationSearch = ({ }: LocationSearchProps) => {
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [lastRunSearchText, setLastRunSearchText] = useState('');

    const showLocationSearchOptions = menuOpen && searchText && searchText == lastRunSearchText;
    const showSavedLocations = menuOpen && !searchText;

    const { data, error, isFetching } = useGetLocationsQuery(lastRunSearchText, { skip: !showLocationSearchOptions })
    const favoriteLocations = useSelector((state: IRootState) => state.locations.favoriteLocations);
    const recentLocations = useSelector((state: IRootState) => state.locations.recentLocations);

    const recentLocationsWithoutFavorites = recentLocations
        .filter(el => !favoriteLocations.find(f => f.Key === el.Key));

    const resetState = () => {
        setMenuOpen(false);
        setSearchText('');
        setLastRunSearchText('');
        resetActiveOption();
    }

    const handleOutsideClick = () => {
        resetState();
    }

    const dataOptionsLength = showSavedLocations
        ? (favoriteLocations.length + recentLocationsWithoutFavorites.length)
        : (showLocationSearchOptions && data ? data.length : null)

    const getActiveLocationOption = () => {
        if (activeOption < 0) return null;

        if (showSavedLocations) {
            return favoriteLocations.length > activeOption
                ? favoriteLocations[activeOption]
                : recentLocationsWithoutFavorites[activeOption - favoriteLocations.length];
        } else if (showLocationSearchOptions && data) {
            return data[activeOption];
        }

        return null;
    }

    const searchElementRef = useOutsideClick(handleOutsideClick) as (MutableRefObject<HTMLFormElement | null>);
    const [onKeyDown, activeOption, resetActiveOption] = useListKeyboardNavigation(dataOptionsLength);
    const isSelectedOption = activeOption >= 0;

    const setSelectedLocation = (location: Location) => {
        dispatch(setCurrentLocation(location));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSelectedOption) {
            setLastRunSearchText(searchText);
            resetActiveOption();
        }
        else {
            const location = getActiveLocationOption();
            if (location) {
                resetState();
                setSelectedLocation(location);

                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            }
        }
    }

    const handleLocationSelect = (location: Location) => {
        resetState();
        setSelectedLocation(location);
    }

    return (
        <>
            <Form
                ref={searchElementRef}
                onSubmit={handleSubmit}
                className="location-search"
                onKeyDown={onKeyDown}
            >
                <LocationSearchInput
                    isLoading={isFetching}
                    isMenuOpen={menuOpen}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={() => setMenuOpen(true)}
                />

                {showSavedLocations &&
                    <FavoriteLocationOptions
                        activeOption={activeOption}
                        onLocationSelected={handleLocationSelect}
                        favoriteLocations={favoriteLocations}
                        recentLocations={recentLocationsWithoutFavorites}
                    />
                }

                {showLocationSearchOptions && !isFetching && (
                    <>
                        {error
                            ? <ErrorSearchMenu />
                            : <LocationSearchItemsList
                                locations={data}
                                activeOption={activeOption}
                                onLocationSelected={handleLocationSelect} />
                        }
                    </>
                )}
            </Form>
        </>
    )
}

export default LocationSearch