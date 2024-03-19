import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import { deleteFavoriteLocation, setFavoriteLocation } from '@/features/locations/locationSlice';
import FavoriteStarImg from '@/components/common/FavoriteStarImg';
import { useDispatch } from 'react-redux';
import { useScrollToElementIfActive } from '@/components/LocationSearch/hooks/useScrollToElementIfActive';

interface InputProps {
    location: Location;
    isActive: boolean;
    isInFavorite: boolean;
    onLocationSelected: (location: Location) => void;
}

const LocationSavedItem = ({ location, isActive, isInFavorite, onLocationSelected }: InputProps) => {
    const dispatch = useDispatch();
    const ref = useScrollToElementIfActive(isActive);
    
    const handleOnClick = (e: React.FormEvent) => {
        e.preventDefault();
        onLocationSelected(location);
    }

    const handleFavoriteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!isInFavorite) {
            dispatch(setFavoriteLocation(location));
        } else {
            dispatch(deleteFavoriteLocation(location));
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
                        <FavoriteStarImg isActive={isInFavorite}/>
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