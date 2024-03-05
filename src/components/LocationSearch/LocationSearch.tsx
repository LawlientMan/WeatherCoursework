import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { useState, FocusEvent } from 'react'
import { Button, Form, ListGroup, Spinner, Stack } from 'react-bootstrap';
import jsonData from "@/components/LocationSearch/TempLocationsResult.json";

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationOptions from '@/components/LocationSearch/LocationOptions';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface LocationSearchProps {
    onLocationSelected: (location: Location) => void;
}

const LocationSearch = ({ onLocationSelected }: LocationSearchProps) => {
    // const { data, error, isLoading } = useGetLocationsQuery(runSearchText, { skip: !shouldRunSearch })
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeOption, setActiveOption] = useState(-1);

    const [searchText, setSearchText] = useState('');
    const [lastRunSearchText, setLastRunSearchText] = useState('');

    const ref = useOutsideClick(() => setMenuOpen(false));

    const showLocationSearchOptions = searchText && searchText == lastRunSearchText;

    const data: Location[] = jsonData;
    const error: string = '';
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeOption < 0 || !showLocationSearchOptions) {
            setLastRunSearchText(searchText);
            setActiveOption(-1);
            console.log('run search');
        }
        else {
            onLocationSelected(data[activeOption]);
            setActiveOption(-1);
            console.log('form submitted');
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!showLocationSearchOptions && data) return;

        console.log( " data.length" + data.length)
        if (e.key === 'ArrowUp') {
            console.log( " ArrowUp" + activeOption)

            e.preventDefault();
            if (activeOption === 0)
                return;
            setActiveOption(activeOption - 1);

            console.log( " ArrowUp2" + activeOption)


        } else if (e.key === 'ArrowDown') {
            console.log( " ArrowDown" + activeOption)

            e.preventDefault();
            if (activeOption === data.length - 1)
                return;
            setActiveOption(activeOption + 1);

            console.log( " ArrowDown2" + activeOption)
        } else if (e.key === "Tab" && e.shiftKey) {

            if (activeOption === 0){
                setActiveOption(data.length - 1);
            }
            else{
                setActiveOption(activeOption - 1);
            }
        
            console.log( " Tab and shift" + activeOption)

            e.preventDefault();
        }else if (e.key === "Tab") {

            if (activeOption === data.length - 1){
                setActiveOption(0);
            }
            else{
                setActiveOption(activeOption + 1);
            }
        
            console.log( " Tab" + activeOption)

            e.preventDefault();
        } 
    };

    return (
        <>
            <Form
                ref={ref}
                onSubmit={handleSubmit}
                className="location-search"
                onKeyDown={onKeyDown}
            >
                <LocationSearchInput
                    onClick={() => setMenuOpen(true)}
                    isLoading={isLoading}
                    placeholder="Let's find a city"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}

                />

                {!isLoading && menuOpen &&
                    <div className='menu'>
                        {error
                            ? <ListGroup>
                                <ListGroup.Item variant='danger'>
                                    Something went wrong.
                                </ListGroup.Item>
                            </ListGroup>
                            : <>
                                {showLocationSearchOptions &&
                                    <LocationOptions
                                        locations={data}
                                        activeOption={activeOption}
                                        onLocationSelected={onLocationSelected}
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