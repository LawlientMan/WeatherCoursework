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

    const [activeOption, setActiveOption] = useState(-1);
    const [open, setOpen] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [runSearchText, setRunSearchText] = useState('');

    const data: Location[] = jsonData;
    const error: string = '12121';
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOutside = () => {
        setOpen(false);
    };

    const ref = useOutsideClick(handleClickOutside);


    const getData = searchText === runSearchText ? data : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeOption < 0) {
            setRunSearchText(searchText);
            // setShowOptions(true);
            setActiveOption(-1);
            console.log('run search');
        }
        else {
            // setShowOptions(false);
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

    return (
        <>
            <Form ref={ref}
                onSubmit={handleSubmit}
                className="location-search">
                <LocationSearchInput
                    onClick={() => setOpen(true)}
                    isLoading={isLoading}
                    placeholder="Let's find a city"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={onKeyDown}
                />

                {!isLoading && open &&
                    <div className='menu'>
                        {error
                            ? <ListGroup>
                                <ListGroup.Item variant='danger'>
                                    Something went wrong.
                                </ListGroup.Item>
                            </ListGroup>
                            : <LocationOptions locations={getData} activeOption={activeOption} />
                        }
                    </div>
                }
            </Form>
        </>
    )
}

export default LocationSearch