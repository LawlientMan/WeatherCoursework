import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import { useScrollToElementIfActive } from '@/components/LocationSearch/hooks/useScrollToElementIfActive';

interface InputProps {
    location: Location;
    isActive: boolean;
    onLocationSelected: (location: Location) => void;
}

const LocationSearchItem = ({ location, isActive, onLocationSelected }: InputProps) => {
    const ref = useScrollToElementIfActive(isActive);

    const handleOnClick = (e: React.FormEvent) => {
        e.preventDefault();
        onLocationSelected(location);
    }

    return (
        <ListGroup.Item
            ref={ref}
            action
            active={isActive}
            onClick={handleOnClick}
        >
            {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
        </ListGroup.Item>
    )
}

export default LocationSearchItem