import React, { useEffect, useRef } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import store from '@/store';
import { locationsSlice } from '@/features/locations/locationSlice';

interface InputProps {
    location: Location;
    isActive: boolean;
    isInFavorite: boolean;
    onLocationSelected: (location: Location) => void;
}

const LocationSavedItem = ({ location, isActive, isInFavorite, onLocationSelected }: InputProps) => {
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (isActive) {
            ref.current?.scrollIntoView({ block: "nearest" });
        }
    }, [isActive]);

    const handleOnClick = (e: React.FormEvent) => {
        e.preventDefault();
        onLocationSelected(location);
    }

    const handleFavoriteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!isInFavorite) {
            store.dispatch(locationsSlice.actions.setFavoriteLocation(location))
        } else {
            store.dispatch(locationsSlice.actions.deleteFavoriteLocation(location))
        }
    };

    return (
        <ListGroup.Item
            className='list-item-saved'
            ref={ref}
            active={isActive}
        >
            <Row>
                <Col xs="auto" className='p-0'>
                    <button className='list-favorite-button p-0' onClick={handleFavoriteButtonClick}>
                        <img src={isInFavorite ? "/src/assets/icons/star.svg" : "/src/assets/icons/star-gray.svg"} alt="favorite" />
                    </button>
                </Col>
                <Col onClick={handleOnClick}>
                    {location.Country.EnglishName}, {location.AdministrativeArea.EnglishName}, {location.EnglishName}
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default LocationSavedItem