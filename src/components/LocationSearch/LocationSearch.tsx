import { useGetLocationsQuery } from '@/features/locations/locationsApi'
import { Location } from '@/shared/types/Location';
import React, { useState, FocusEvent } from 'react'
import { Button, Form, ListGroup, Stack } from 'react-bootstrap';
import jsonData from "@/components/LocationSearch/TempLocationsResult.json";

import "@/components/LocationSearch/LocationSearch.css";

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
    const isLoading: Boolean = false;

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
                <Form.Group className="search">
                    <Form.Control
                        className='search-input'
                        type="search"
                        placeholder="Let's find a city"
                        value={searchText}
                        onChange={(e) => handleInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        onFocus={handleFocusEvent}
                        onBlur={handleOnBlurEvent}
                    />
                    <button className='search-button' type="submit">
                        <img src="/src/assets/icons/searchx32.svg" alt="search" />
                    </button>
                </Form.Group>

                {isLoading &&
                    <div>
                        Loading....
                    </div>
                }

                {!isLoading && !error && getData && showOptions &&
                    <div>
                        {getData.length > 0
                            ? <div>
                                <ListGroup>
                                    {getData.map((location, index) => {
                                        return (<ListGroup.Item
                                            action
                                            key={location.Key}
                                            active={index == activeOption}>
                                            {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
                                        </ListGroup.Item>)
                                    })}
                                </ListGroup>
                            </div>
                            : <div>
                                <ListGroup>
                                    <ListGroup.Item>
                                        Nothing where found.
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        }
                    </div>
                }
            </Form>
        </>
    )
}

export default LocationSearch