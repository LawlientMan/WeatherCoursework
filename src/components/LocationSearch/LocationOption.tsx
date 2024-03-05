import React, { useEffect, useRef } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';

interface InputProps {
    location: Location;
    isActive: boolean;
    onLocationSelected: (location: Location) => void;
}

const LocationOption = ({ location, isActive, onLocationSelected }: InputProps) => {
    const ref = useRef<HTMLElement>();

    useEffect(() => {
        if (isActive) {
            ref.current?.scrollIntoView({ block: "nearest" });
        }
    }, [isActive]);

    return (
        <ListGroup.Item
            ref={ref}
            action
            active={isActive}
            onClick={() => onLocationSelected(location)}
        >
            {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
        </ListGroup.Item>
    )
}

export default LocationOption