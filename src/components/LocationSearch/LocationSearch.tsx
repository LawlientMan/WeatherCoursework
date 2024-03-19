import { locationsApi, useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { MutableRefObject, useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap';

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationSearchItemsList from '@/components/LocationSearch/SearchMenu/SearchLocationOptions';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useListKeyboardNavigation } from '@/components/LocationSearch/hooks/useListKeyboardNavigation';
import store, { IRootState } from '@/config/store';
import { locationsSlice, setCurrentLocation } from '@/features/locations/locationSlice';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteLocationOptions from '@/components/LocationSearch/SavedSearchMenu/SavedLocationOptions';
import { useNavigate } from 'react-router-dom';
import ErrorSearchMenu from '@/components/LocationSearch/components/ErrorSearchMenu';


interface LocationSearchProps {
}

const LocationSearch = ({ }: LocationSearchProps) => {
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [lastRunSearchText, setLastRunSearchText] = useState('');
    
    const showLocationSearchOptions = searchText && searchText == lastRunSearchText;

    const { data, error, isFetching } = useGetLocationsQuery(lastRunSearchText, { skip: !showLocationSearchOptions })
    const favoriteLocations = useSelector((state: IRootState) => state.locations.favoriteLocations);
    const recentLocations = useSelector((state: IRootState) => state.locations.recentLocations);

    const recentLocationsWithoutFavorites = recentLocations
        .filter(el => !favoriteLocations.find(f => f.Key === el.Key ));

    // move logic from several use state to useReducer 
    // !!! do not use store as a global object, export actions or use dispatch
    
    const resetState = () => {
        setMenuOpen(false);
        setSearchText('');
        setLastRunSearchText('');
        resetActiveOption();
    }

    const handleOutsideClick = () => {
        resetState();
    }

    const searchElementRef = useOutsideClick(handleOutsideClick) as (MutableRefObject<HTMLFormElement | null>);
    const [onKeyDown, activeOption, resetActiveOption] = useListKeyboardNavigation(menuOpen && showLocationSearchOptions && data ? data.length : null);

    const setSelectedLocation = (location: Location) => {
        dispatch(setCurrentLocation(location));
        store.dispatch(locationsSlice.actions.setRecentLocation(location))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeOption < 0 || !showLocationSearchOptions) {
            setLastRunSearchText(searchText);
            resetActiveOption();
            console.log('run search');
        }
        else if (data) {
            resetState();
            setSelectedLocation(data[activeOption]);

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            console.log('form submitted');
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

                {!isFetching && menuOpen &&
                    <div className='menu'>
                        {error
                            ? <ErrorSearchMenu/>
                            : <>
                                {searchText
                                    ? (
                                        <>
                                            {showLocationSearchOptions && data && <LocationSearchItemsList
                                                locations={data}
                                                activeOption={activeOption}
                                                onLocationSelected={handleLocationSelect} />}
                                        </>
                                    )
                                    : (
                                        <FavoriteLocationOptions
                                            activeOption={activeOption}
                                            onLocationSelected={handleLocationSelect} 
                                            favoriteLocations={favoriteLocations}
                                            recentLocations={recentLocationsWithoutFavorites}
                                            />
                                    )
                                }
                            </>
                        }
                    </div>
                }
            </Form>
        </>
    )
}

export default LocationSearch