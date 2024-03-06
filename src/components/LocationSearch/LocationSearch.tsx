import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap';

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationSearchItemsList from '@/components/LocationSearch/LocationSearchItemsList';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useListKeyboardNavigation } from '@/components/LocationSearch/useListKeyboardNavigation';

interface LocationSearchProps {
    selectedLocation: Location | null;
    onLocationSelected: (location: Location) => void;
}

const LocationSearch = ({ onLocationSelected, selectedLocation }: LocationSearchProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [lastRunSearchText, setLastRunSearchText] = useState('');

    const showLocationSearchOptions = searchText && searchText == lastRunSearchText;
    const { data, error, isFetching } = useGetLocationsQuery(lastRunSearchText, { skip: !showLocationSearchOptions })

    const resetState = () => {
        setMenuOpen(false);
        setSearchText('');
        setLastRunSearchText('');
        resetActiveOption();
    }

    const handleOutsideClick = () => {
        resetState();
    }

    const searchElementRef = useOutsideClick(handleOutsideClick);
    const inputPlaceHolder = selectedLocation && !menuOpen ? `${selectedLocation.Country.EnglishName} ${selectedLocation.EnglishName}` : "Let's find a city";
    const [onKeyDown, activeOption, resetActiveOption] = useListKeyboardNavigation(menuOpen && showLocationSearchOptions && data ? data.length : null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeOption < 0 || !showLocationSearchOptions) {
            setLastRunSearchText(searchText);
            resetActiveOption();
            console.log('run search');
        }
        else if (data) {
            resetState();
            onLocationSelected(data[activeOption]);

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            console.log('form submitted');
        }
    }

    const handleLocationSelect = (location: Location) => {
        resetState();
        onLocationSelected(location);
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
                    placeholder={inputPlaceHolder}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={() => setMenuOpen(true)}
                />

                {!isFetching && menuOpen &&
                    <div className='menu'>
                        {error
                            ? <ListGroup>
                                <ListGroup.Item variant='danger'>
                                    Something went wrong.
                                </ListGroup.Item>
                            </ListGroup>
                            : <>
                                {showLocationSearchOptions && data &&
                                    <LocationSearchItemsList
                                        locations={data}
                                        activeOption={activeOption}
                                        onLocationSelected={handleLocationSelect}
                                    />
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