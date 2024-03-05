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
    onLocationSelected: (location: Location) => void;
}

const LocationSearch = ({ onLocationSelected }: LocationSearchProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const searchElementRef = useOutsideClick(() => setMenuOpen(false));

    const [searchText, setSearchText] = useState('');
    const [lastRunSearchText, setLastRunSearchText] = useState('');

    const showLocationSearchOptions = searchText && searchText == lastRunSearchText;
    const { data, error, isFetching } = useGetLocationsQuery(lastRunSearchText, { skip: !showLocationSearchOptions })

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
        else if(data) {
            onLocationSelected(data[activeOption]);
            setMenuOpen(false);
            setActiveOption(-1);
            console.log('form submitted');
        }
    }

    const handleLocationSelect = (location: Location) => {
        setMenuOpen(false);
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
                    placeholder="Let's find a city"
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