import FavoriteStarImg from '@/components/common/FavoriteStarImg';
import { deleteFavoriteLocation, setFavoriteLocation } from '@/features/locations/locationSlice';
import { IRootState } from '@/config/store';
import React from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFavoriteLocation } from '@/hooks/useIsFavoriteLocation';

type A = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<A, 'loading'> {
    isLoading: Boolean;
    isMenuOpen: Boolean;
}

const LocationSearchInput = (props: InputProps) => {
    const dispatch = useDispatch();

    const { isLoading, isMenuOpen, style, className, onClick, type, placeholder, id, ...rest } = props;
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const isSelectedLocationFavorite = useIsFavoriteLocation(selectedLocation);

    const showFavoriteButton = selectedLocation && !isMenuOpen;
    const inputPlaceHolder = showFavoriteButton ? `${selectedLocation.Country.EnglishName} ${selectedLocation.EnglishName}` : "Let's find a city";

    const handleFavoriteButtonClick = () => {
        if (!selectedLocation) return;

        if (!isSelectedLocationFavorite) {
            dispatch(setFavoriteLocation(selectedLocation));
        } else {
            dispatch(deleteFavoriteLocation(selectedLocation));
        }
    }

    return (
        <Form.Group className="search">
            {selectedLocation && !isMenuOpen &&
                <button className='favorite-button' type='button' onClick={handleFavoriteButtonClick}>
                    <FavoriteStarImg isActive={isSelectedLocationFavorite}/>
                </button>
            }
            <div onClick={onClick}>
                <input
                    id='search-input'
                    className={showFavoriteButton ? 'form-control search-input location-selected' : ' form-control search-input'}
                    placeholder = {inputPlaceHolder}
                    type="search"
                    {...rest}
                />
                <div className='search-buttons'>
                    {isLoading
                        ? <Spinner className='search-spiner' animation="border" variant="primary" size="sm" />
                        : <button className='search-button' type="submit">
                            <img src="/src/assets/icons/searchx32.svg" alt="search" />
                        </button>
                    }
                </div>
            </div>
        </Form.Group>
    )
}

export default LocationSearchInput;