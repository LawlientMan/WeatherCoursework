import { Button, ListGroup, Stack } from 'react-bootstrap';
import { Location } from '@/shared/types/Location';
import LocationSavedItem from '@/components/LocationSearch/SavedSearchMenu/SavedLocationOptionItem';
import { useDispatch } from 'react-redux';
import { clearAllRecentLocations } from '@/features/locations/locationSlice';

interface InputProps {
    activeOption: number;
    onLocationSelected: (location: Location) => void;
    favoriteLocations: Location[];
    recentLocations: Location[];
}

const FavoriteLocationOptions = (
    { activeOption, onLocationSelected, favoriteLocations, recentLocations }: InputProps) => {

    const dispatch = useDispatch();

    function handleClearButtonClick() {
        dispatch(clearAllRecentLocations());
    }

    return (
        <div className='menu'>
            <ListGroup>
                <ListGroup.Item variant="info">Favorites: {favoriteLocations.length == 0 && " empty"}</ListGroup.Item>
                {favoriteLocations.map((location, index) => {
                    return (
                        <LocationSavedItem
                            key={location.Key}
                            location={location}
                            isActive={index === activeOption}
                            isInFavorite={true}
                            onLocationSelected={onLocationSelected}
                        />
                    )
                })}

                {recentLocations.length > 0 &&
                    <>
                        <ListGroup.Item variant="info">
                            <Stack direction='horizontal'>
                                <div>Recent:</div>
                                <Button
                                    className="ms-auto p-0"
                                    id='clear-recent-btn'
                                    variant="link"
                                    onClick={handleClearButtonClick}>
                                    Clear all
                                </Button>
                            </Stack>
                        </ListGroup.Item>
                        {recentLocations.map((location, index) => {
                            return (
                                <LocationSavedItem
                                    key={location.Key}
                                    location={location}
                                    isActive={(favoriteLocations.length + index) === activeOption}
                                    isInFavorite={false}
                                    onLocationSelected={onLocationSelected}
                                />
                            )
                        })}
                    </>
                }

            </ListGroup>
        </div>
    )
}

export default FavoriteLocationOptions

