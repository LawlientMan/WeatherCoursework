import React, { useEffect, useRef } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import LocationOption from '@/components/LocationSearch/LocationOption';

interface InputProps {
    locations: Location[] | null;
    activeOption: number;
    onLocationSelected: (location: Location) => void;
}

const LocationOptions = ({ locations, activeOption, onLocationSelected }: InputProps) => {
    return (
        <>
            {locations && locations.length > 0
                ? <ListGroup>
                    {locations.map((location, index) => {
                        return (
                            <LocationOption
                                key={location.Key}
                                location={location}
                                isActive={index === activeOption}
                                onLocationSelected={onLocationSelected}
                            />
                        )
                    })}
                </ListGroup>
                : <ListGroup>
                    <ListGroup.Item>
                        Nothing where found.
                    </ListGroup.Item>
                </ListGroup>
            }
        </>
    )
}

export default LocationOptions