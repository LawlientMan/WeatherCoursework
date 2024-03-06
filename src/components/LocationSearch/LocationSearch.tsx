import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { useState, FocusEvent } from 'react'
import { Button, Form, ListGroup, Spinner, Stack } from 'react-bootstrap';
import jsonData from "@/components/LocationSearch/TempLocationsResult.json";

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationOptions from '@/components/LocationSearch/LocationOptions';
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

    const handleOutsideClick = () => {
        setSearchText('');
        setMenuOpen(false);
        setActiveOption(-1);
        setLastRunSearchText('');
    }

    const searchElementRef = useOutsideClick(handleOutsideClick);
    const inputPlaceHolder = selectedLocation && !menuOpen ? `${selectedLocation.Country.EnglishName} ${selectedLocation.EnglishName}` : "Let's find a city";

    // const data: Location[] = jsonData;
    // const error: string = '';
    // const [isLoading, setIsLoading] = useState(false);

    const [onKeyDown, activeOption, setActiveOption] = useListKeyboardNavigation(menuOpen && showLocationSearchOptions && data ? data.length : null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit');

        if (activeOption < 0 || !showLocationSearchOptions) {
            setLastRunSearchText(searchText);
            setActiveOption(-1);
            console.log('run search');
        }
        else if (data) {
            setSearchText('');
            setMenuOpen(false);
            setActiveOption(-1);
            setLastRunSearchText('');

            onLocationSelected(data[activeOption]);

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            console.log('form submitted');
        }
    }

    const handleLocationSelect = (location: Location) => {
        setSearchText('');
        setLastRunSearchText('');
        setMenuOpen(false);
        setActiveOption(-1);

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
                                    <LocationOptions
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