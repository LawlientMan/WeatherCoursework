import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { useState, FocusEvent } from 'react'
import { Button, Form, ListGroup, Spinner, Stack } from 'react-bootstrap';
import jsonData from "@/components/LocationSearch/TempLocationsResult.json";

import "@/components/LocationSearch/LocationSearch.css";
import LocationSearchInput from '@/components/LocationSearch/LocationSearchInput';
import LocationOptions from '@/components/LocationSearch/LocationOptions';

interface LocationSearchProps {
    onLocationSelected: (location: Location) => void;
}

const LocationSearch = ({ onLocationSelected }: LocationSearchProps) => {
    const [activeOption, setActiveOption] = useState(-1);
    const [showOptions, setShowOptions] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [runSearchText, setRunSearchText] = useState('');

    const shouldRunSearch = runSearchText !== '';


    // const { data, error, isLoading } = useGetLocationsQuery(runSearchText, { skip: !shouldRunSearch })

    const data: Location[] = jsonData;
    const error: string = '';
    const [isLoading, setIsLoading] = useState(false);

    const getData = searchText === runSearchText ? data : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeOption < 0) {
            setRunSearchText(searchText);
            setShowOptions(true);
            setActiveOption(-1);
            console.log('run search');
        }
        else {
            setShowOptions(false);
            onLocationSelected(data[activeOption]);
            setActiveOption(-1);
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            console.log('form submitted');
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }

        if (!data) return;

        if (e.key === 'ArrowUp') {
            if (activeOption === 0)
                return;
            setActiveOption(activeOption - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeOption - 1 === data.length)
                return;
            setActiveOption(activeOption + 1);
        }
    };

    const handleInput = (value: string) => {
        setSearchText(value);
        setShowOptions(false);
    }

    const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
        if (data && data.length > 0) {
            setShowOptions(true);
        }
    }

    const handleOnBlurEvent = (e: FocusEvent<HTMLInputElement>) => {
        console.log('OnBlur');
        setShowOptions(false);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <LocationSearchInput
                    isLoading={isLoading}
                    placeholder="Let's find a city"
                    value={searchText}
                    onChange={(e) => handleInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={handleFocusEvent}
                    onBlur={handleOnBlurEvent}
                />

                {!isLoading && showOptions &&
                    <div>
                        {error
                            ? <>error</>
                            : <LocationOptions locations={getData} activeOption={activeOption} />
                        }
                    </div>
                }
            </Form>
        </>
    )
}

export default LocationSearch