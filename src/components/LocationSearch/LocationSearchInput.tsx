import { locationsSlice } from '@/features/locations/locationSlice';
import store, { IRootState } from '@/store';
import React from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';

type A = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<A, 'loading'> {
    isLoading: Boolean;
    isMenuOpen: Boolean;
}

const LocationSearchInput = (props: InputProps) => {
    const { isLoading, isMenuOpen, style, className, onClick, type, placeholder, ...rest } = props;
    const selectedLocation = useSelector((state: IRootState) => state.locations.selectedLocation);
    const favoriteLocations = useSelector((state: IRootState) => state.locations.favoriteLocations);

    const showFavoriteButton = selectedLocation && !isMenuOpen;
    const isSelectedLocationFavorite = selectedLocation && favoriteLocations.some(el => el.Key === selectedLocation.Key);
    
    const inputPlaceHolder = showFavoriteButton ? `${selectedLocation.Country.EnglishName} ${selectedLocation.EnglishName}` : "Let's find a city";

    const handleFavoriteButtonClick = () => {
        if (!selectedLocation) return;

        if (!isSelectedLocationFavorite) {
            store.dispatch(locationsSlice.actions.setFavoriteLocation(selectedLocation))
        } else {
            store.dispatch(locationsSlice.actions.deleteFavoriteLocation(selectedLocation))
        }
    }

    return (
        <Form.Group className="search">
            {selectedLocation && !isMenuOpen &&
                <button className='favorite-button' type='button' onClick={handleFavoriteButtonClick}>
                    <img src={isSelectedLocationFavorite ? "/src/assets/icons/star.svg" : "/src/assets/icons/star-gray.svg"} alt="favorite" />
                </button>
            }
            <div onClick={onClick}>
                <input
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